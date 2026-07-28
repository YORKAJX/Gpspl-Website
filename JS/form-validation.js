(function () {
  "use strict";

  const disposableDomains = [
    "mailinator.com",
    "10minutemail.com",
    "tempmail.com",
    "guerrillamail.com",
    "yopmail.com",
    "sharklasers.com"
  ];

  const freeDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "proton.me"];
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
    let error = field.parentElement && field.parentElement.querySelector(`.form-field-error[data-for="${field.name}"]`);
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

  function getDomain(email) {
    return String(email || "").split("@").pop().toLowerCase().trim();
  }

  function validate(form) {
    const errors = [];
    const fields = visibleFields(form);
    const email = form.querySelector("input[type='email'], input[name*='email' i]");
    const phone = form.querySelector("input[type='tel'], input[name*='phone' i]");
    const company = form.querySelector("input[name*='company' i], input[name*='organization' i]");
    const message = form.querySelector("textarea, input[name*='message' i], input[name*='detail' i]");
    const honeypot = form.querySelector("input[name='bot-field']");

    if (honeypot && honeypot.value.trim()) {
      errors.push({ field: honeypot, message: "Spam submission blocked." });
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
      } else if (freeDomains.includes(domain) && company && company.value.trim().length < 2) {
        errors.push({ field: company, message: "Please add your company or organization name." });
      }
    }

    if (phone && phone.value.trim()) {
      const normalized = phone.value.replace(/[^\d+]/g, "");
      const validPhone = /^\+?[0-9]{8,15}$/.test(normalized);
      if (!validPhone) {
        errors.push({ field: phone, message: "Please enter a valid phone number with country code if possible." });
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
  }

  function initFormValidation() {
    document.querySelectorAll("form").forEach((form) => {
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
          event.stopImmediatePropagation();
          errors.forEach((error) => {
            if (error.field && error.field.type !== "hidden") setFieldError(error.field, error.message);
          });
          const box = statusBox(form);
          box.className = "form-submit-status is-error";
          box.textContent = "Please correct the highlighted details before submitting.";
          track("lead_form_validation_failed", { form_name: label, error_count: errors.length, page_url: window.location.href });
          form.dispatchEvent(new CustomEvent("gpspl:lead-form-error", { bubbles: true, detail: { errors } }));
          const firstVisibleError = errors.find((error) => error.field && error.field.type !== "hidden");
          if (firstVisibleError) firstVisibleError.field.focus({ preventScroll: false });
          return;
        }

        const box = statusBox(form);
        box.className = "form-submit-status is-success";
        box.textContent = "Submitting your enquiry securely...";
        track("lead_form_validated", { form_name: label, page_url: window.location.href });
        form.dispatchEvent(new CustomEvent("gpspl:lead-form-success", { bubbles: true, detail: { form_name: label } }));
      }, { capture: true });
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
