const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'outputs/lead-delivery-repair');
fs.mkdirSync(out, { recursive: true });

function repairValidation(text) {
  const start = text.indexOf('        // 1. Dispatch to hardened serverless handler');
  if (start < 0) return text;
  const end = text.indexOf('\n      });', start);
  if (end < 0) throw Error('Cannot locate form submit boundary');
  return text.slice(0, start) + `        // Confirm one authoritative delivery before success or navigation.
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);
        fetch("/.netlify/functions/submit-enquiry", {
          method: "POST",
          keepalive: true,
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadData.name, email: leadData.email, phone: leadData.phone,
            company: leadData.company, location: formData.get("location") || formData.get("city") || "",
            requirement: formData.get("requirement") || leadData.category,
            message: formData.get("message") || leadData.details, lead_source: label,
            timeline: formData.get("timeline") || "", budget: formData.get("budget") || "",
            "bot-field": formData.get("bot-field") || "",
            form_time_token: formData.get("form_time_token") || "",
            "cf-turnstile-response": formData.get("cf-turnstile-response") || ""
          })
        }).then(async response => {
          const data = await response.json().catch(() => ({}));
          if (!response.ok || data.success !== true || data.skipped) {
            throw new Error(data.error || "Your enquiry was not confirmed. Please retry or contact GPSPL directly.");
          }
          clearTimeout(timeout);
          box.className = "form-submit-status is-success";
          box.textContent = "Your enquiry has been accepted by the GPSPL project desk.";
          document.dispatchEvent(new CustomEvent("gpspl:lead-form-success", { detail: { form_name: label, form_source: label } }));
          const action = new URL(form.getAttribute("action") || "/thank-you", window.location.href);
          if (action.origin === window.location.origin && /\\/thank-you(?:\\.html)?\\/?$/.test(action.pathname)) {
            window.location.assign(action.href);
          }
        }).catch(error => {
          clearTimeout(timeout);
          box.className = "form-submit-status is-error";
          box.textContent = error.name === "AbortError"
            ? "Delivery is taking longer than expected and is not confirmed. Please retry, call +91 89208 30377 or use WhatsApp."
            : error.message;
          if (submitBtn) {
            submitBtn.disabled = false;
            if (submitBtn.tagName === "INPUT") submitBtn.value = "Submit Again";
            else submitBtn.textContent = submitBtn.dataset.submitLabel || "Retry Enquiry";
          }
          document.dispatchEvent(new CustomEvent("gpspl:lead-form-error", { detail: { form_name: label, error_message: error.message } }));
        });` + text.slice(end);
}

function repairMain(text) {
  if (text.includes('// form-validation.js owns validation, delivery and confirmed success.')) return text;
  const start = text.indexOf('        document.querySelectorAll(\'form[data-lead-form]\').forEach(form => {');
  const end = text.indexOf('\n    function ', start);
  if (start < 0 || end < 0) throw Error('Cannot locate main form submission owner');
  // The enclosing initLeadForms ends immediately before the next function.
  return text.slice(0, start) + `        // form-validation.js owns validation, delivery and confirmed success.
        ensureFormValidation();
        window.gpsplInitFormValidation?.();
    }
` + text.slice(end);
}

for (const [file, transform, live] of [
  ['JS/form-validation.js', repairValidation, 'tmp/lead-audit-JS-form-validation.js'],
  ['JS/main.js', repairMain, 'tmp/lead-audit-JS-main.js']
]) {
  fs.writeFileSync(path.join(root, file), transform(fs.readFileSync(path.join(root, file), 'utf8')));
  fs.writeFileSync(path.join(out, path.basename(file)), transform(fs.readFileSync(path.join(root, live), 'utf8')));
}
console.log('Repaired local contact handlers; production-based candidates saved separately.');

function repairUniversal(text) {
  const start = text.indexOf('        const promises = [', text.indexOf('async function dispatchUniversalLead'));
  const end = text.indexOf('\n        return newLead;', start);
  if (start >= 0 && end >= 0) text = text.slice(0, start) + `        const response = await fetch('/.netlify/functions/submit-enquiry', {
            method: 'POST', keepalive: true, signal: AbortSignal.timeout(20000),
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newLead.name, email: /^inquiry[-@]/.test(newLead.email) ? '' : newLead.email,
                phone: newLead.phone, company: newLead.company, requirement: newLead.category,
                message: newLead.details, lead_source: newLead.source,
                location: leadData.location || leadData.city || '',
                'cf-turnstile-response': leadData['cf-turnstile-response'] || '', form_time_token: timeToken })
        });
        const receipt = await response.json().catch(() => ({}));
        if (!response.ok || receipt.success !== true || receipt.skipped) throw new Error(receipt.error || 'Enquiry delivery was not confirmed. Please retry or contact GPSPL directly.');
        document.dispatchEvent(new CustomEvent('gpspl:lead-form-success', { detail: { form_name: newLead.source } }));
` + text.slice(end);
  // Standard forms and custom quote forms own their submission. Never dispatch a second request here.
  const globalStart = text.indexOf('    function attachGlobalFormValidation() {');
  const globalEnd = text.indexOf('\n    // -----------------------------------------------------------------', globalStart);
  if (globalStart >= 0 && globalEnd >= 0) text = text.slice(0, globalStart) + '    function attachGlobalFormValidation() {}\n' + text.slice(globalEnd);
  text = text.replace(/(?:async\s+)*function handleModalSubmit\(e\)/, 'async function handleModalSubmit(e)');
  text = text.replace('        dispatchUniversalLead(leadData);', `        try { await dispatchUniversalLead(leadData); }
        catch (error) { btn.style.pointerEvents = 'auto'; btn.textContent = 'Retry Download'; alert(error.message); return; }`);
  text = text.replace('        } catch(err) {}\n\n        // Set pre-filled WhatsApp link', `        } catch(err) {
            submitBtn.disabled = false; submitBtn.textContent = 'Retry Enquiry';
            alert(err.message); return;
        }

        // Set pre-filled WhatsApp link`);
  return text;
}
for (const [input, output] of [['JS/lead-capture.js', 'JS/lead-capture.js'], ['tmp/lead-audit-JS-lead-capture.js', 'outputs/lead-delivery-repair/lead-capture.js']]) {
  fs.writeFileSync(path.join(root, output), repairUniversal(fs.readFileSync(path.join(root, input), 'utf8')));
}

function repairQuotes(text) {
  return text.replace(/    const promises = \[[\s\S]*?await Promise\.race\(\[Promise\.allSettled\(promises\), timeout\]\);\s*\} catch\(err\) \{\}/g, `    try {
      const response = await fetch('/.netlify/functions/submit-enquiry', {
        method: 'POST', keepalive: true, signal: AbortSignal.timeout(20000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadData, email: /^inquiry[-@]/.test(leadData.email || '') ? '' : leadData.email,
          form_time_token: timeToken, 'cf-turnstile-response': new FormData(form).get('cf-turnstile-response') || '' })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.success !== true || data.skipped) throw new Error(data.error || 'Delivery was not confirmed. Please retry or contact GPSPL directly.');
      document.dispatchEvent(new CustomEvent('gpspl:lead-form-success', { detail: { form_name: form.id } }));
    } catch (error) {
      const button = form.querySelector('button[type="submit"]');
      if (button) { button.disabled = false; button.textContent = 'Retry Enquiry'; }
      alert(error.message); return;
    }`);
}
fs.writeFileSync(path.join(root, 'JS/room-configurator.js'), repairQuotes(fs.readFileSync(path.join(root, 'JS/room-configurator.js'), 'utf8')));
if (fs.existsSync(path.join(root, 'tmp/lead-audit-JS-room-configurator.js'))) {
  let room = repairQuotes(fs.readFileSync(path.join(root, 'tmp/lead-audit-JS-room-configurator.js'), 'utf8'));
  room = room.replace(/    if \(window.GPSPL_LeadCapture && typeof window.GPSPL_LeadCapture.dispatchLead === 'function'\) \{\s*await window.GPSPL_LeadCapture.dispatchLead\(leadData\);\s*\}/, `    try {
      if (!window.GPSPL_LeadCapture?.dispatchLead) throw new Error('The enquiry service is unavailable. Please refresh or contact GPSPL directly.');
      await window.GPSPL_LeadCapture.dispatchLead(leadData);
    } catch (error) {
      btn.disabled = false; btn.textContent = 'Retry Project Enquiry';
      alert(error.message); return;
    }`);
  fs.writeFileSync(path.join(out, 'room-configurator.js'), room);
}

// The studio hero only exists in the deployed revision; preserve it in a separate candidate.
let studio = fs.readFileSync(path.join(root, 'tmp/lead-audit-JS-studio-interactive.js'), 'utf8');
studio = studio.replace('window.handleHeroExpressSubmit = function', 'window.handleHeroExpressSubmit = async function');
const heroStart = studio.indexOf('        // 1. Dispatch immediately to Netlify Function');
const heroEnd = studio.indexOf('        // 2. Backup to Local Storage', heroStart);
if (heroStart < 0 || heroEnd < 0) throw Error('Cannot locate production hero dispatch');
studio = studio.slice(0, heroStart) + `        try {
            const response = await fetch('/.netlify/functions/submit-enquiry', {
                method: 'POST', keepalive: true, signal: AbortSignal.timeout(20000),
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...leadPayload, email: '',
                    'cf-turnstile-response': document.querySelector('#heroExpressForm [name="cf-turnstile-response"]')?.value || '' })
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok || data.success !== true || data.skipped) throw new Error(data.error || 'Your enquiry was not confirmed. Please retry, call or WhatsApp GPSPL.');
            document.dispatchEvent(new CustomEvent('gpspl:lead-form-success', { detail: { form_name: 'heroExpressForm' } }));
        } catch (error) {
            if (successMsg) { successMsg.style.display = 'flex'; successMsg.textContent = error.message; }
            return;
        }

` + studio.slice(heroEnd);
// Keep WhatsApp user-initiated: awaiting delivery can cause automatic popups to be blocked.
studio = studio.replace(/        try \{\s*const win = window\.open\(waUrl, '_blank'\);[\s\S]*?\} catch\(e\) \{\}/, '        // The visible WhatsApp button opens only when the visitor chooses it.');
fs.writeFileSync(path.join(out, 'studio-interactive.js'), studio);
function repairBoq(text) {
  text = text.replace("boqForm.addEventListener('submit', function(e)", "boqForm.addEventListener('submit', async function(e)");
  const start = text.indexOf("                fetch('/.netlify/functions/submit-enquiry', {");
  const end = text.indexOf('                try {\n                    var leadHistory', start);
  if (start < 0 || end < 0) return text;
  text = text.slice(0, start) + `                leadPayload['cf-turnstile-response'] = new FormData(boqForm).get('cf-turnstile-response') || '';
                const leadResponse = await fetch('/.netlify/functions/submit-enquiry', {
                    method: 'POST', keepalive: true, signal: AbortSignal.timeout(20000),
                    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leadPayload)
                });
                const receipt = await leadResponse.json().catch(() => ({}));
                if (!leadResponse.ok || receipt.success !== true || receipt.skipped) throw new Error(receipt.error || 'Enquiry delivery was not confirmed. Please retry or contact GPSPL directly.');
                document.dispatchEvent(new CustomEvent('gpspl:lead-form-success', { detail: { form_name: 'enterpriseBoqForm' } }));

` + text.slice(end);
  text = text.replace(/console.warn\('Silent lead capture note:', dispatchErr\);/, `console.warn('BOQ delivery failed:', dispatchErr.message);
                submitBtn.disabled = false; submitBtn.textContent = 'Retry Project Enquiry';
                alert(dispatchErr.message); return;`);
  return text;
}
for (const [input, output] of [['index.html', 'index.html'], ['tmp/lead-audit-live.html', 'outputs/lead-delivery-repair/index.html']]) {
  fs.writeFileSync(path.join(root, output), repairBoq(fs.readFileSync(path.join(root, input), 'utf8').replace(/\r\n/g, '\n')));
}
console.log('Repaired quote, download, BOQ and universal delivery paths; production candidates retained separately.');

function repairAnalytics(text) {
  // Native GA4 owns source attribution; inferred labels use a custom namespace.
  text = text.replace('            ...trafficAttribution,', `            gpspl_traffic_type: trafficAttribution.traffic_type,
            gpspl_referring_domain: trafficAttribution.referring_domain,
            gpspl_utm_source: trafficAttribution.utm_source,
            gpspl_utm_medium: trafficAttribution.utm_medium,
            gpspl_utm_campaign: trafficAttribution.utm_campaign,`);
  text = text.replace('utm_source: utmSource || "organic_direct"', 'utm_source: utmSource || ""');
  text = text.replace('utm_medium: utmMedium || "none"', 'utm_medium: utmMedium || ""');
  text = text.replace('page_referrer: document.referrer || "Direct"', 'page_referrer: document.referrer || ""');
  text = text.replace('event.detail?.error || "Unknown validation/network error"', 'event.detail?.error_message || event.detail?.error || "Unknown validation/network error"');
  return text;
}
for (const [input, output] of [['JS/analytics.js', 'JS/analytics.js'], ['tmp/lead-audit-JS-analytics.js', 'outputs/lead-delivery-repair/analytics.js']]) {
  fs.writeFileSync(path.join(root, output), repairAnalytics(fs.readFileSync(path.join(root, input), 'utf8')));
}
