(function () {
  "use strict";

  const disposableDomains = [
    "mailinator.com",
    "10minutemail.com",
    "tempmail.com",
    "guerrillamail.com",
    "yopmail.com",
    "sharklasers.com",
    "throwawaymail.com",
    "burnermail.io"
  ];

  const spamWords = ["casino", "crypto", "loan offer", "viagra", "betting", "telegram promo"];

  function track(name, payload) {
    if (typeof window.gpsplTrack === "function") {
      window.gpsplTrack(name, payload || {});
    }
  }

  function visibleFields(form) {
    return Array.from(form.querySelectorAll("input, select, textarea")).filter((field) => {
      return field.type !== "hidden" && field.type !== "submit" && field.type !== "button" && !field.disabled && field.offsetParent !== null;
    });
  }

  function statusBox(form) {
    let box = form.querySelector(".form-submit-status");
    if (!box) {
      box = document.createElement("div");
      box.className = "form-submit-status";
      box.setAttribute("role", "status");
      form.appendChild(box);
    }
    return box;
  }

  function setFieldError(field, message) {
    field.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    let error = field.parentElement && field.parentElement.querySelector(".form-field-error[data-for=\"" + field.name + "\"]");
    if (!error && field.parentElement) {
      error = document.createElement("small");
      error.className = "form-field-error";
      error.dataset.for = field.name || "";
      field.parentElement.appendChild(error);
    }
    if (error) error.textContent = message;
  }

  function clearErrors(form) {
    form.querySelectorAll(".has-error").forEach((field) => {
      field.classList.remove("has-error");
      field.removeAttribute("aria-invalid");
    });
    form.querySelectorAll(".form-field-error").forEach((node) => node.remove());
    const box = form.querySelector(".form-submit-status");
    if (box) {
      box.textContent = "";
      box.className = "form-submit-status";
    }
  }

  window.__gpspl_page_load_time = Date.now();

  const dummyPhones = [
    "1234567890", "0123456789", "9876543210", "8765432109",
    "9898989898", "9090909090", "1212121212", "9000000000",
    "9999900000", "9876500000", "1122334455", "9988776655"
  ];

  function getDomain(email) {
    return String(email || "").split("@").pop().toLowerCase().trim();
  }

  function validate(form) {
    const errors = [];
    const fields = visibleFields(form);
    const email = form.querySelector("input[type='email'], input[name*='email' i]");
    const phone = form.querySelector("input[type='tel'], input[name*='phone' i], input[name*='mobile' i]");
    const message = form.querySelector("textarea, input[name*='message' i], input[name*='detail' i]");
    const honeypot = form.querySelector("input[name='bot-field']");
    const honeypot2 = form.querySelector("input[name='website_url_hp']");

    if ((honeypot && honeypot.value.trim()) || (honeypot2 && honeypot2.value.trim())) {
      errors.push({ field: honeypot || honeypot2, message: "Spam submission blocked." });
    }

    fields.forEach((field) => {
      if (field.required && !String(field.value || "").trim()) {
        errors.push({ field, message: "This field is required." });
      }
    });

    if (email && email.value.trim()) {
      const value = email.value.trim();
      const domain = getDomain(value);
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
      if (!validEmail) {
        errors.push({ field: email, message: "Please enter a valid email address." });
      } else if (disposableDomains.includes(domain)) {
        errors.push({ field: email, message: "Please use a genuine business email address." });
      }
    }

    if (phone && phone.value.trim()) {
      const normalized = phone.value.replace(/\D/g, "").slice(-10);
      const validPhone = /^[6-9]\d{9}$/.test(normalized) && !/^(.)\1{9}$/.test(normalized) && !dummyPhones.includes(normalized);
      if (!validPhone) {
        errors.push({ field: phone, message: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9." });
      }
    }

    if (message && message.value.trim()) {
      const value = message.value.trim().toLowerCase();
      const urlCount = (value.match(/https?:\/\//g) || []).length;
      if (urlCount > 2 || spamWords.some((word) => value.includes(word))) {
        errors.push({ field: message, message: "Please share only genuine project or enquiry details." });
      }
    }

    return errors;
  }

  function enrichHiddenFields(form) {
    const pageUrl = form.querySelector("input[name='page_url']");
    const submittedAt = form.querySelector("input[name='submitted_at']");
    if (pageUrl) pageUrl.value = window.location.href;
    if (submittedAt) submittedAt.value = new Date().toISOString();

    let timeToken = form.querySelector("input[name='form_time_token']");
    if (!timeToken) {
      timeToken = document.createElement("input");
      timeToken.type = "hidden";
      timeToken.name = "form_time_token";
      form.appendChild(timeToken);
    }
    try {
      const loadTime = window.__gpspl_page_load_time || (Date.now() - 3500);
      timeToken.value = btoa(JSON.stringify({ t: loadTime, r: Math.random().toString(36).slice(2, 8) }));
    } catch (e) {}
  }

  function initFormValidation() {
    document.querySelectorAll("form").forEach((form) => {
      // Skip custom-handled forms (Room configurator proposal & Distribution desk)
      if (form.id === "consultantProposalForm" || form.id === "distributionSupplyForm" || form.dataset.customHandler === "true") {
        return;
      }

      if (form.dataset.validationBound === "true") return;
      form.dataset.validationBound = "true";
      form.setAttribute("novalidate", "novalidate");

      form.addEventListener("submit", (event) => {
        clearErrors(form);
        enrichHiddenFields(form);
        const errors = validate(form);
        const label = form.dataset.leadForm || form.getAttribute("name") || "website_form";

        if (errors.length) {
          event.preventDefault();
          errors.forEach((error) => {
            if (error.field && error.field.type !== "hidden") setFieldError(error.field, error.message);
          });
          const box = statusBox(form);
          box.className = "form-submit-status is-error";
          box.textContent = "Please correct the highlighted fields before submitting.";
          track("lead_form_validation_failed", { form_name: label, error_count: errors.length, page_url: window.location.href });
          const firstVisibleError = errors.find((error) => error.field && error.field.type !== "hidden");
          if (firstVisibleError) firstVisibleError.field.focus({ preventScroll: false });
          return;
        }

        // Form is valid - process submission
        event.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          if (submitBtn.tagName === "INPUT") submitBtn.value = "Sending...";
          else submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Enquiry...';
        }

        const box = statusBox(form);
        box.className = "form-submit-status is-success";
        box.textContent = "Submitting your enquiry securely...";
        track("lead_form_validated", { form_name: label, page_url: window.location.href });

        const formData = new FormData(form);
        const leadData = {
          category: form.getAttribute("name") && form.getAttribute("name").includes("career") ? "CAREER APPLICATION" : "CONTACT INQUIRY",
          name: formData.get("name") || formData.get("full_name") || "Website Inquirer",
          email: formData.get("email") || "",
          phone: formData.get("phone") || "",
          company: formData.get("company") || formData.get("current_city") || "Not Specified",
          source: label,
          details: Array.from(formData.entries()).filter(([k]) => !k.startsWith("bot-") && k !== "page_url" && k !== "submitted_at").map(([k, v]) => k + ": " + v).join(" | "),
          page: window.location.pathname
        };

        // 1. Dispatch to hardened serverless handler
        const serverlessPromise = fetch("/.netlify/functions/submit-enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadData.name,
            email: leadData.email,
            phone: leadData.phone,
            company: formData.get("company") || leadData.company,
            location: formData.get("location") || "",
            requirement: formData.get("requirement") || leadData.category,
            message: formData.get("message") || leadData.details,
            lead_source: label,
            form_time_token: formData.get("form_time_token") || "",
            "cf-turnstile-response": formData.get("cf-turnstile-response") || ""
          })
        }).then(async (res) => {
          const data = await res.json().catch(() => ({}));
          return { ok: res.ok, status: res.status, data };
        }).catch(() => ({ ok: true }));

        // 2. Netlify static form post
        const netlifyPromise = fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        }).catch(() => null);

        // 3. Fast guarantee: Process response within maximum 2.0s
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 2000));

        Promise.race([
          Promise.allSettled([serverlessPromise, netlifyPromise]),
          timeoutPromise
        ]).then((results) => {
          const serverlessResult = results && results[0] && results[0].value;
          if (serverlessResult && !serverlessResult.ok && serverlessResult.data && serverlessResult.data.error) {
            box.className = "form-submit-status is-error";
            box.textContent = serverlessResult.data.error;
            if (submitBtn) {
              submitBtn.disabled = false;
              if (submitBtn.tagName === "INPUT") submitBtn.value = "Submit Again";
              else submitBtn.innerHTML = submitBtn.dataset.submitLabel || "Send Project Enquiry";
            }
            return;
          }
          const action = form.getAttribute("action") || "/thank-you";
          window.location.href = action;
        });
      });
    });
  }

  window.gpsplInitFormValidation = initFormValidation;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFormValidation);
  } else {
    initFormValidation();
  }

  document.addEventListener("gpspl:module-loaded", initFormValidation);
})();
