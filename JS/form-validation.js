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
      }
    }

    if (phone && phone.value.trim()) {
      const normalized = phone.value.replace(/[^\d+]/g, "");
      const validPhone = /^[6-9]\d{9}$/.test(normalized) || /^\+91[6-9]\d{9}$/.test(normalized) || /^\+?[0-9]{10,15}$/.test(normalized);
      if (!validPhone) {
        errors.push({ field: phone, message: "Please enter a valid 10-digit mobile number." });
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

        // 1. Dispatch lead in background
        const dispatchPromise = (window.GPSPL_LeadCapture && typeof window.GPSPL_LeadCapture.dispatchLead === "function")
          ? window.GPSPL_LeadCapture.dispatchLead(leadData)
          : Promise.resolve();

        // 2. Netlify static form post
        const netlifyPromise = fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString()
        }).catch(() => null);

        // 3. Fast guarantee: Redirect to /thank-you within maximum 1.5 seconds regardless of network speed
        const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1500));

        Promise.race([
          Promise.allSettled([dispatchPromise, netlifyPromise]),
          timeoutPromise
        ]).finally(() => {
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
