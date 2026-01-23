document.addEventListener("DOMContentLoaded", () => {

  function loadModule(moduleId, filePath) {
    fetch(filePath)
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(html => {
        const el = document.getElementById(moduleId);
        if (el) el.innerHTML = html;
      })
      .catch(() => {});
  }

  loadModule("header-container", "/modules/header.html");
  loadModule("footer-container", "/modules/footer.html");

  document.addEventListener('click', function(e) {
    const hamburgerBtn = e.target.closest('#hamburger-btn');
    const navLinks = document.getElementById('navLinks');

    if (hamburgerBtn && navLinks) {
      navLinks.classList.toggle('active');
    }

    if (e.target.tagName === 'A' && e.target.closest('.nav-links')) {
      if (navLinks) navLinks.classList.remove('active');
    }

    const card = e.target.closest('.work-item');
    if (card && card.dataset.video) {
      openVideo(card.dataset.video);
    }

    if (e.target.closest('.video-close') || e.target.closest('.video-backdrop')) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVideo();
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement.classList.contains('work-item')) {
      openVideo(document.activeElement.dataset.video);
    }
  });

  function initStatsAnimation() {
    const statsSection = document.getElementById('statsSection');
    const counters = document.querySelectorAll('.counter');
    let started = false;

    if (!statsSection) return;

    const start = () => {
      counters.forEach(c => {
        c.innerText = '0';
        const target = +c.dataset.target;
        const step = target / 200;

        const tick = () => {
          let val = +c.innerText.replace('+','');
          if (val < target) {
            c.innerText = Math.ceil(val + step);
            setTimeout(tick, 20);
          } else {
            c.innerText = target === 1997 ? target : target + '+';
          }
        };
        tick();
      });
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !started) {
          started = true;
          start();
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove('active');
      i = (i + 1) % slides.length;
      slides[i].classList.add('active');
    }, 5000);
  }

  const modal = document.getElementById('videoModal');
  const frame = document.getElementById('videoFrame');

    function openVideo(id) {
    const modal = document.getElementById('videoModal');
    const frame = document.getElementById('videoFrame');

    if (!modal || !frame) {
        console.error("Video modal elements not found");
        return;
    }

    frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    }

    function closeVideo() {
    const modal = document.getElementById('videoModal');
    const frame = document.getElementById('videoFrame');

    if (!modal || !frame) return;

    frame.src = '';
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    }


  initHeroSlider();
  setTimeout(initStatsAnimation, 500);
});
