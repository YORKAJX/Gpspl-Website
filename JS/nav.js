function initNav() {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (!burger || !navLinks) return;

  const closeMenu = () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    document.body.classList.remove('nav-open');
  };

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });

  // Touch-friendly close on link tap
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu, { passive: true });
  });

  // Close menu on orientation change (mobile)
  window.addEventListener('orientationchange', closeMenu);
}
