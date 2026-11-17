# GPSPL Enterprise Outreach & Sellbird Engine Documentation

Welcome to the automated B2B Cold Outreach Engine for **Global Peripheral Solutions Pvt. Ltd. (GPSPL)**.

This setup is fully customized according to your exact requirements:
- **Sender Account**: Exclusively `getgpspl@gmail.com`
- **Carbon Copy (CC)**: Zero CC (Cold outbound emails must remain 1-on-1 to protect sender domain reputation and ensure 100% primary inbox delivery)
- **Signature**:
  ```text
  Thanks and regards,
  Global Peripheral Solutions Pvt. Ltd. (GPSPL)
  Direct / WhatsApp: +91 89208 30377
  Official Enquiries: global@gpspl.co.in | Web: https://gpspl.co.in
  ```
- **Company Credentials**: Established 1997 (28+ years of industry leadership in enterprise AV integration)
- **Value Proposition**: Removal of middleman distributor markups, direct OEM wholesale pricing (Samsung, LG, Crestron, Shure, Harman/JBL, Poly, Barco), turnkey engineering, and committed 4-hour onsite AMC SLA.
- **Brochure**: Clean HTTPS link to `https://gpspl.co.in/brochure.pdf` (no heavy attachments that trigger spam filters).

---

## 1. Directory Structure

```text
outreach/
├── config.json                     # Master operational configuration (sender, rules, throttling)
├── sellbird_system_prompt.txt      # AI Agent system prompt for Sellbird / Claude / GPT
├── campaigns/
│   ├── procurement_direct_oem.json # 3-touch sequence for Purchase & Procurement Heads
│   ├── it_heads_boardroom_modernization.json # 3-touch sequence for IT Heads & CIOs
│   └── facilities_admin_amc.json   # 3-touch sequence for Facilities & Admin Directors
├── sample_prospects.csv            # Sample enterprise leads with persona classifications
├── ready_for_sellbird.csv          # Pre-rendered CSV ready to drag-and-drop into Sellbird/Instantly
├── dispatcher.py                   # Autonomous Python engine for preview, export, and live testing
└── README.md                       # This guide
```

---

## 2. Using With Sellbird (AI Sales Agent)

If you are using the **Sellbird** application (or any AI cold email tool):

1. **Copy the AI Agent Prompt**:
   - Open `outreach/sellbird_system_prompt.txt`.
   - Copy the entire text and paste it into Sellbird's **System Prompt / Agent Instructions** field.
   - This equips the AI with deep knowledge of GPSPL’s 1997 heritage, OEM partnerships, middleman elimination strategy, and strict communication rules.

2. **Connect the Gmail Account**:
   - In Sellbird's email settings, connect `getgpspl@gmail.com`.
   - Set the daily sending limit to **25–30 emails per day** with a **90–180 second** random delay between emails.

3. **Import Prospect Leads**:
   - You can upload `outreach/ready_for_sellbird.csv` directly into Sellbird, or provide your own lead list with the columns: `first_name`, `company_name`, `email`, `persona_category`.

---

## 3. Using the Standalone Python Dispatcher

You don't even need third-party software to preview, export, or test outreach emails. Everything is built into `outreach/dispatcher.py`.

### A. Preview Generated Emails & Check Deliverability Scores
Run a dry-run preview across all prospects in the CSV:
```bash
python outreach/dispatcher.py --preview
```
This displays the rendered subject, body, word count, and deliverability score (100/100) for every prospect.

### B. Export Ready-to-Send CSV
Generate a fresh CSV with rendered multi-touch sequences for all prospects:
```bash
python outreach/dispatcher.py --export-sellbird outreach/my_leads_ready.csv --csv outreach/sample_prospects.csv
```

### C. Send a Real Test Email via Gmail SMTP
To verify that emails land in the primary inbox:
1. Generate a 16-character Google App Password for `getgpspl@gmail.com`:
   - Go to [Google App Passwords](https://myaccount.google.com/apppasswords).
   - Select App: "Mail", Device: "Other" (Name: "GPSPL Outreach").
   - Copy the 16-letter password (e.g. `abcd efgh ijkl mnop`).
2. Run the test command:
   ```bash
   python outreach/dispatcher.py --send-test your_personal_email@gmail.com --app-password "your_16_digit_app_password" --persona procurement
   ```
   *Available personas for testing: `procurement`, `it_head`, `facilities`.*

---

## 4. Why We Send From `getgpspl@gmail.com` With No CC

1. **Deliverability & Spam Avoidance**:
   - Cold emails with CC addresses (`karan@gpspl.co.in`, `khurana.s@gpspl.co.in`) trigger enterprise email security filters (Proofpoint, Mimecast, Microsoft Defender) because cold prospecting emails are normally 1-to-1 conversations.
   - Using no CC and sending directly from `getgpspl@gmail.com` ensures **maximum deliverability into the primary inbox**.
2. **Where Replies Go**:
   - The prospect replies directly to `getgpspl@gmail.com`.
   - Your signature clearly directs official corporate inquiries to `global@gpspl.co.in` and provides your phone number `+91 89208 30377`.
   - When a prospect responds or shows interest, you can immediately loop in the leadership team (`karan@gpspl.co.in` and `khurana.s@gpspl.co.in`) on the active warm thread!

---

## 5. Daily Sending Schedule Best Practice

| Week | Daily Volume | Delay Between Emails | Target Personas |
|---|---|---|---|
| **Week 1** | 15–20 emails / day | 120–180 seconds | Procurement & Purchase Heads |
| **Week 2** | 25–30 emails / day | 90–150 seconds | Procurement + IT Heads / CIOs |
| **Week 3+** | 30–35 emails / day | 90–120 seconds | Procurement + IT Heads + Facilities |

*Sending during working hours (09:30 AM – 05:30 PM IST, Monday through Friday) yields the highest open and reply rates.*
