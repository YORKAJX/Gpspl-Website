function initContact() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.textContent = 'Sending…';

    try {
      // Placeholder for Javalin POST
      await new Promise(res => setTimeout(res, 700));
      form.reset();
      status.textContent = 'Thank you. We will contact you shortly.';
    } catch {
      status.textContent = 'Submission failed. Please retry.';
    }
  });
}
