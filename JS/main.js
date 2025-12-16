async function load(id, file) {
  const res = await fetch(`partials/${file}`);
  document.getElementById(id).innerHTML = await res.text();
}

(async () => {
  await load('topbar', 'topbar.html');
  await load('navbar', 'navbar.html');
  await load('hero', 'hero.html');
  await load('solutions', 'solutions.html');
  await load('industries', 'industries.html');
  await load('partners', 'partners.html');
  await load('about', 'about.html');
  await load('contact', 'contact.html');
  await load('footer', 'footer.html');

  document.getElementById('year').textContent = new Date().getFullYear();
})();
