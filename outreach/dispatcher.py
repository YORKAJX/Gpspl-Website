#!/usr/bin/env python3
"""
GPSPL B2B Cold Outreach Engine & Sellbird Campaign Dispatcher
Author: GPSPL Engineering Team
Sender: getgpspl@gmail.com
Inbound: global@gpspl.co.in
Phone: +91 89208 30377
"""

import os
import sys
import json
import csv
import argparse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(SCRIPT_DIR, "config.json")
CAMPAIGNS_DIR = os.path.join(SCRIPT_DIR, "campaigns")
DEFAULT_CSV = os.path.join(SCRIPT_DIR, "sample_prospects.csv")

SPAM_WORDS = [
    "100% free", "guaranteed", "act now", "urgent", "no risk",
    "miracle", "winner", "cash bonus", "cheap", "click here", "buy now"
]

def load_config():
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def load_campaigns():
    campaigns = {}
    for filename in os.listdir(CAMPAIGNS_DIR):
        if filename.endswith(".json"):
            filepath = os.path.join(CAMPAIGNS_DIR, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
                campaigns[filename.replace(".json", "")] = data
    return campaigns

def map_persona_to_campaign(persona_category):
    cat = (persona_category or "").strip().lower()
    tokens = set(cat.replace("_", " ").replace("-", " ").split())
    if any(t in tokens or t in cat for t in ["facility", "facilities", "admin", "workplace", "amc", "ops"]):
        return "facilities_admin_amc"
    elif any(t in tokens for t in ["it", "cio", "cto", "tech", "technology", "network", "infrastructure", "av"]):
        return "it_heads_boardroom_modernization"
    else:
        return "procurement_direct_oem"

def render_template(template_str, prospect):
    rendered = template_str
    for key, value in prospect.items():
        placeholder = f"{{{{{key}}}}}"
        rendered = rendered.replace(placeholder, str(value or ""))
    return rendered

def check_spam_score(subject, body):
    score = 100
    warnings = []
    combined = (subject + " " + body).lower()
    for word in SPAM_WORDS:
        if word in combined:
            score -= 15
            warnings.append(f"Spam trigger word detected: '{word}'")
    
    if "http://" in body:
        score -= 20
        warnings.append("Insecure http link detected (use https only)")
    
    if "https://gpspl.co.in/brochure.pdf" not in body:
        score -= 5
        warnings.append("Official brochure link missing from body")
        
    word_count = len(body.split())
    if word_count > 160:
        score -= 10
        warnings.append(f"Email body is too long ({word_count} words). Recommended: 75-125 words.")
    elif word_count < 40:
        score -= 10
        warnings.append(f"Email body is too short ({word_count} words).")
        
    return max(score, 0), warnings

def preview_campaigns(csv_file):
    config = load_config()
    campaigns = load_campaigns()
    
    print("\n=======================================================")
    print("      GPSPL OUTREACH CAMPAIGN PREVIEW ENGINE")
    print("=======================================================")
    print(f"Sender Email  : {config['sender']['email']} (Strictly NO CC)")
    print(f"Direct Phone  : {config['sender']['phone']}")
    print(f"Official Desk : {config['sender']['inbound_official']}")
    print(f"Brochure Link : {config['company_profile']['value_propositions']['brochure_url']}")
    print("=======================================================\n")
    
    if not os.path.exists(csv_file):
        print(f"Error: Prospect CSV file not found at {csv_file}")
        sys.exit(1)
        
    with open(csv_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        count = 0
        for row in reader:
            count += 1
            campaign_key = map_persona_to_campaign(row.get("persona_category", ""))
            campaign = campaigns.get(campaign_key, campaigns.get("procurement_direct_oem"))
            touch1 = campaign["touchpoints"][0]
            
            subject = render_template(touch1["subject"], row)
            body = render_template(touch1["body_template"], row)
            score, warnings = check_spam_score(subject, body)
            
            print(f"[{count}] PROSPECT: {row.get('first_name')} {row.get('last_name')} | {row.get('job_title')} @ {row.get('company_name')}")
            print(f"    Target Email : {row.get('email')}")
            print(f"    Campaign     : {campaign['campaign_name']}")
            print(f"    Subject      : {subject}")
            print(f"    Deliverability Score: {score}/100")
            if warnings:
                for w in warnings:
                    print(f"    [!] Warning: {w}")
            print("    ------------------ Rendered Body Preview ------------------")
            for line in body.split("\n"):
                print(f"    | {line}")
            print("    -----------------------------------------------------------\n")

def export_for_sellbird(csv_file, output_csv):
    config = load_config()
    campaigns = load_campaigns()
    
    if not os.path.exists(csv_file):
        print(f"Error: Prospect CSV file not found at {csv_file}")
        sys.exit(1)
        
    out_rows = []
    with open(csv_file, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            campaign_key = map_persona_to_campaign(row.get("persona_category", ""))
            campaign = campaigns.get(campaign_key, campaigns.get("procurement_direct_oem"))
            
            t1 = campaign["touchpoints"][0]
            t2 = campaign["touchpoints"][1]
            t3 = campaign["touchpoints"][2]
            
            out_rows.append({
                "email": row.get("email"),
                "first_name": row.get("first_name"),
                "last_name": row.get("last_name"),
                "company_name": row.get("company_name"),
                "job_title": row.get("job_title"),
                "persona_category": row.get("persona_category"),
                "city": row.get("city"),
                "sender_account": config["sender"]["email"],
                "subject_touch1": render_template(t1["subject"], row),
                "body_touch1": render_template(t1["body_template"], row),
                "subject_touch2": render_template(t2["subject"], row),
                "body_touch2": render_template(t2["body_template"], row),
                "subject_touch3": render_template(t3["subject"], row),
                "body_touch3": render_template(t3["body_template"], row),
            })
            
    fieldnames = list(out_rows[0].keys())
    with open(output_csv, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(out_rows)
        
    print(f"\n[+] Successfully exported {len(out_rows)} fully rendered multi-touch leads to:")
    print(f"    {output_csv}")
    print("    Ready to drag-and-drop into Sellbird, Instantly, or Smartlead.")

def send_live_test(to_email, app_password, persona="procurement"):
    config = load_config()
    campaigns = load_campaigns()
    
    campaign_key = map_persona_to_campaign(persona)
    campaign = campaigns.get(campaign_key, campaigns.get("procurement_direct_oem"))
    touch1 = campaign["touchpoints"][0]
    
    mock_prospect = {
        "first_name": "Executive",
        "last_name": "Team",
        "company_name": "Your Enterprise",
        "job_title": "Decision Maker"
    }
    
    subject = render_template(touch1["subject"], mock_prospect)
    body = render_template(touch1["body_template"], mock_prospect)
    
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[TEST OUTREACH] {subject}"
    msg["From"] = f"Global Peripheral Solutions <{config['sender']['email']}>"
    msg["To"] = to_email
    msg["Reply-To"] = config['sender']['email']
    
    # Strictly NO CC as instructed
    part = MIMEText(body, "plain", "utf-8")
    msg.attach(part)
    
    sender_user = config["sender"]["email"]
    
    print(f"\n[+] Connecting to smtp.gmail.com:587 via TLS...")
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.login(sender_user, app_password)
        server.sendmail(sender_user, [to_email], msg.as_string())
        server.quit()
        print(f"[SUCCESS] Test outreach email delivered successfully to {to_email}!")
        print("          Sent from: getgpspl@gmail.com (No CC)")
    except Exception as e:
        print(f"[ERROR] Failed to send via Gmail SMTP: {e}")
        print("Note: To send via getgpspl@gmail.com, you need a Google 16-character App Password.")
        print("      Generate one at: https://myaccount.google.com/apppasswords")

def main():
    parser = argparse.ArgumentParser(description="GPSPL B2B Sellbird Outreach Dispatcher")
    parser.add_argument("--preview", action="store_true", help="Preview rendered emails for all prospects in CSV")
    parser.add_argument("--csv", default=DEFAULT_CSV, help="Path to input prospects CSV")
    parser.add_argument("--export-sellbird", help="Output path for rendered Sellbird-ready CSV")
    parser.add_argument("--send-test", help="Send a real test email to specified recipient")
    parser.add_argument("--persona", default="procurement", choices=["procurement", "it_head", "facilities"], help="Persona for test email")
    parser.add_argument("--app-password", default=os.getenv("GMAIL_APP_PASSWORD"), help="Google 16-digit App Password for getgpspl@gmail.com")
    
    args = parser.parse_args()
    
    if args.send_test:
        if not args.app_password:
            print("\nError: Please provide --app-password or set GMAIL_APP_PASSWORD environment variable.")
            sys.exit(1)
        send_live_test(args.send_test, args.app_password, args.persona)
    elif args.export_sellbird:
        export_for_sellbird(args.csv, args.export_sellbird)
    else:
        preview_campaigns(args.csv)

if __name__ == "__main__":
    main()
