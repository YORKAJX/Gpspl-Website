document.addEventListener("DOMContentLoaded", () => {

    function loadModule(moduleId, filePath) {
        fetch(filePath, { cache: "no-store" })
            .then(response => {
                if (!response.ok) throw new Error(`Error loading ${filePath}`);
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(moduleId);
                if (element) {
                    element.innerHTML = data;
                    if (moduleId === "header-container") initHeaderState();
                    if (moduleId === "footer-container") initFooterState();
                }
            })
            .catch(error => console.error(error));
    }

    loadModule("header-container", "/modules/header.html?v=20260615");
    loadModule("footer-container", "/modules/footer.html");

    function initHeaderState() {
        const currentPath = window.location.pathname === "/" ? "/index.html" : window.location.pathname;
        document.querySelectorAll('.nav-links a[href]').forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (linkPath === currentPath) link.setAttribute('aria-current', 'page');
        });
    }

    function initFooterState() {
        const currentPath = window.location.pathname === "/" ? "/index.html" : window.location.pathname;
        document.body.classList.toggle("compact-footer", currentPath !== "/index.html");
    }
    
    

    document.addEventListener('click', function(e) {
        const hamburgerBtn = e.target.closest('#hamburger-btn');
        const navLinks = document.getElementById('navLinks');
        const clickedDropdown = e.target.closest('.nav-dropdown');
        const clickedSummary = e.target.closest('.nav-dropdown summary');
        const dropdowns = document.querySelectorAll('.nav-dropdown');

        if (hamburgerBtn && navLinks) {
            navLinks.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        }

        if (clickedSummary && clickedDropdown) {
            dropdowns.forEach(dropdown => {
                if (dropdown !== clickedDropdown) dropdown.removeAttribute('open');
            });
        } else if (!clickedDropdown) {
            dropdowns.forEach(dropdown => dropdown.removeAttribute('open'));
        }

        if (e.target.closest('a') && e.target.closest('.nav-links')) {
            dropdowns.forEach(dropdown => dropdown.removeAttribute('open'));
            if (navLinks) {
                navLinks.classList.remove('active');
                const menuButton = document.getElementById('hamburger-btn');
                if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
            }
        }
    });

    function initStatsAnimation() {
        const statsSection = document.getElementById('statsSection');
        const counters = document.querySelectorAll('.counter');
        let hasStarted = false;

        if (!statsSection) return; 

        const startCounting = () => {
            counters.forEach(counter => {
                counter.innerText = '0';
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') ?? (target === 1997 ? '' : '+');
                const duration = 1400;
                const startedAt = performance.now();
                
                const updateCount = (now) => {
                    const progress = Math.min((now - startedAt) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    counter.innerText = Math.round(target * eased) + (progress === 1 ? suffix : '');
                    if (progress < 1) requestAnimationFrame(updateCount);
                };
                requestAnimationFrame(updateCount);
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasStarted) {
                    startCounting();
                    hasStarted = true;
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 }); 

        observer.observe(statsSection);
    }

    function initHeroSlider() {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        const slideInterval = 5000; 

        if (slides.length === 0) return;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

    function initRevealAnimations() {
        const items = document.querySelectorAll('.reveal');
        if (!items.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        items.forEach(item => observer.observe(item));
    }

    function initTestimonialCarousel() {
        const carousel = document.querySelector('.testimonial-carousel');
        if (!carousel) return;
        if (carousel.dataset.carouselBound === 'true') return;
        carousel.dataset.carouselBound = 'true';

        const track = carousel.querySelector('.testimonial-track');
        const dotsContainer = carousel.querySelector('.testimonial-dots');
        const previous = carousel.querySelector('.testimonial-prev');
        const next = carousel.querySelector('.testimonial-next');
        let current = 0;
        let timer;
        let dots = [];

        function getCards() {
            return [...carousel.querySelectorAll('.testimonial-card')];
        }

        function getVisibleCount() {
            if (window.innerWidth <= 680) return 1;
            if (window.innerWidth <= 1050) return 2;
            return 3;
        }

        function getMaxIndex() {
            return Math.max(0, getCards().length - getVisibleCount());
        }

        function buildDots() {
            dotsContainer.replaceChildren();
            Array.from({ length: getMaxIndex() + 1 }, (_, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.setAttribute('aria-label', `Show testimonial group ${index + 1}`);
                dot.addEventListener('click', () => show(index));
                dotsContainer.appendChild(dot);
            });
            dots = [...dotsContainer.querySelectorAll('button')];
        }

        function show(index) {
            const maxIndex = getMaxIndex();
            current = index < 0 ? maxIndex : index > maxIndex ? 0 : index;
            track.style.transform = `translateX(calc(-${current} * (var(--testimonial-card-width) + var(--testimonial-gap))))`;
            dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === current));
        }

        function start() {
            clearInterval(timer);
            timer = setInterval(() => show(current + 1), 5500);
        }

        previous.addEventListener('click', () => {
            show(current - 1);
            start();
        });
        next.addEventListener('click', () => {
            show(current + 1);
            start();
        });
        carousel.addEventListener('mouseenter', () => clearInterval(timer));
        carousel.addEventListener('mouseleave', start);
        carousel.addEventListener('focusin', () => clearInterval(timer));
        carousel.addEventListener('focusout', start);
        window.addEventListener('resize', () => {
            buildDots();
            show(Math.min(current, getMaxIndex()));
        });
        document.addEventListener('gpspl:reviews-loaded', () => {
            current = 0;
            buildDots();
            show(0);
            start();
        });

        buildDots();
        show(0);
        start();
    }

    function initIndustryExperience() {
        const experience = document.querySelector('.industry-experience');
        if (!experience) return;

        const tabs = [...experience.querySelectorAll('.industry-tab')];
        const panels = [...experience.querySelectorAll('.industry-panel')];
        let activeIndex = 0;
        let timer;

        function showIndustry(index) {
            activeIndex = (index + tabs.length) % tabs.length;
            tabs.forEach((tab, tabIndex) => {
                const active = tabIndex === activeIndex;
                tab.classList.toggle('active', active);
                tab.setAttribute('aria-selected', String(active));
            });
            panels.forEach((panel, panelIndex) => panel.classList.toggle('active', panelIndex === activeIndex));
            experience.classList.remove('industry-cycle');
            void experience.offsetWidth;
            experience.classList.add('industry-cycle');
        }

        function start() {
            clearInterval(timer);
            timer = setInterval(() => showIndustry(activeIndex + 1), 6500);
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                showIndustry(index);
                start();
            });
        });

        experience.addEventListener('mouseenter', () => clearInterval(timer));
        experience.addEventListener('mouseleave', start);
        experience.addEventListener('focusin', () => clearInterval(timer));
        experience.addEventListener('focusout', start);
        showIndustry(0);
        start();
    }

    function initLeadForms() {
        document.querySelectorAll('form[data-lead-form]').forEach(form => {
            form.addEventListener('submit', () => {
                const source = form.getAttribute('data-lead-form') || 'GPSPL website enquiry';
                const sourceInput = form.querySelector('input[name="lead_source"]');
                const pageInput = form.querySelector('input[name="page_url"]');
                const submittedInput = form.querySelector('input[name="submitted_at"]');
                const status = form.querySelector('.form-submit-status');
                const submitButton = form.querySelector('button[type="submit"]');

                if (sourceInput) sourceInput.value = source;
                if (pageInput) pageInput.value = window.location.href;
                if (submittedInput) submittedInput.value = new Date().toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    timeZone: 'Asia/Kolkata'
                });

                if (status) {
                    status.textContent = 'Sending your enquiry securely. Please wait...';
                    status.classList.add('is-active');
                }

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.setAttribute('aria-busy', 'true');
                    submitButton.textContent = submitButton.dataset.loadingLabel || 'Sending...';
                }
            });
        });
    }

    function initConversionTrackingHooks() {
        document.querySelectorAll('a[href], button').forEach(element => {
            const text = (element.textContent || element.getAttribute('aria-label') || '').trim().toLowerCase();
            const href = element.getAttribute('href') || '';

            if (element.dataset.track) return;
            if (href.startsWith('tel:')) element.dataset.track = 'click_call';
            else if (href.includes('wa.me')) element.dataset.track = 'click_whatsapp';
            else if (href.includes('brochure.pdf')) element.dataset.track = 'download_company_profile';
            else if (href.includes('/contact.html') || text.includes('request quote') || text.includes('consultation')) element.dataset.track = 'click_lead_cta';
            else if (href.includes('/downloads.html')) element.dataset.track = 'click_downloads';
        });
    }

    initHeroSlider();
    initRevealAnimations();
    initTestimonialCarousel();
    initIndustryExperience();
    initLeadForms();
    initConversionTrackingHooks();
    setTimeout(initStatsAnimation, 500); 
});
