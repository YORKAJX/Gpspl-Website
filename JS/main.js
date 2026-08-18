document.addEventListener("DOMContentLoaded", () => {
    // Instant fallback: show all reveal elements immediately
    // This fixes VS Code Simple Browser / file:// protocol viewing
    const revealAll = () => {
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
            el.classList.add('is-visible');
        });
    };
    revealAll();
    setTimeout(revealAll, 80);
    setTimeout(revealAll, 300);


    function loadModule(moduleId, filePath) {
        const element = document.getElementById(moduleId);
        // If content is already inline (like on index.html), skip fetch
        // to work without a server (file:// protocol / VS Code Simple Browser)
        if (element && element.children.length > 0) {
            // Content already present - just init state
            if (moduleId === "header-container") initHeaderState();
            if (moduleId === "footer-container") {
                initFooterState();
                initLeadForms();
                initConversionTrackingHooks();
            }
            document.dispatchEvent(new CustomEvent('gpspl:module-loaded', {
                detail: { moduleId, filePath }
            }));
            return;
        }
        // Otherwise fetch from server
        fetch(filePath, { cache: "force-cache" })
            .then(response => {
                if (!response.ok) throw new Error(`Error loading ${filePath}`);
                return response.text();
            })
            .then(data => {
                if (element) {
                    element.innerHTML = data;
                    if (moduleId === "header-container") initHeaderState();
                    if (moduleId === "footer-container") {
                        initFooterState();
                        initLeadForms();
                        initConversionTrackingHooks();
                    }
                    document.dispatchEvent(new CustomEvent('gpspl:module-loaded', {
                        detail: { moduleId, filePath }
                    }));
                }
            })
            .catch(error => console.warn('Module load skipped (file:// mode):', moduleId));
    }

    loadModule("header-container", "/modules/header.html?v=20260818");
    loadModule("footer-container", "/modules/footer.html?v=20260818");
    ensureFormValidation();

    function ensureFormValidation() {
        if (window.gpsplInitFormValidation || window.gpsplFormValidationLoading) return;
        window.gpsplFormValidationLoading = true;
        const existingScript = document.querySelector('script[src*="form-validation.js"]');
        if (existingScript) {
            window.gpsplFormValidationLoading = false;
            if (typeof window.gpsplInitFormValidation === 'function') window.gpsplInitFormValidation();
            return;
        }

        const script = document.createElement('script');
        script.src = "JS/form-validation.js?v=20260727-enterprise-ux";
        script.defer = true;
        script.onload = () => {
            window.gpsplFormValidationLoading = false;
            if (typeof window.gpsplInitFormValidation === 'function') window.gpsplInitFormValidation();
        };
        script.onerror = () => {
            window.gpsplFormValidationLoading = false;
        };
        document.head.appendChild(script);
    }

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

    function initProductDetailHeroStack() {
        const page = document.querySelector('.product-detail-page');
        const hero = page?.querySelector('.solution-page-hero');
        const heroContainer = hero?.querySelector(':scope > .container');
        if (!page || !hero || !heroContainer || hero.dataset.brandStackReady === 'true') return;

        hero.dataset.brandStackReady = 'true';
        hero.classList.add('solution-page-hero-premium');

        const pageTitle = hero.querySelector('h1')?.textContent?.trim() || document.title.replace(/\s*\|\s*GPSPL.*/i, '').trim();
        const category = page.dataset.cmsCollection === 'products' ? 'Solutions' : 'Services';
        const breadcrumb = document.createElement('nav');
        breadcrumb.className = 'product-hero-breadcrumbs';
        breadcrumb.setAttribute('aria-label', 'Breadcrumb');
        breadcrumb.innerHTML = `<a href="/index.html">Home</a><span>/</span><span>${category}</span><span>/</span><span>${pageTitle}</span>`;

        const eyebrow = hero.querySelector('.sub-headline');
        if (eyebrow && !hero.querySelector('.product-hero-breadcrumbs')) {
            heroContainer.insertBefore(breadcrumb, eyebrow);
        }

        const brandCloud = page.querySelector('.product-brand-cloud');
        const brandItems = [...(brandCloud?.querySelectorAll('span') || [])].slice(0, 4);
        const panel = document.createElement('aside');
        panel.className = 'product-hero-brand-panel';
        panel.setAttribute('aria-label', `${pageTitle} brand stack`);

        const brandCards = brandItems.length ? brandItems.map(item => {
            const img = item.querySelector('img');
            const name = item.querySelector('b')?.textContent?.trim() || img?.alt?.replace(/\s+logo$/i, '').trim() || 'Partner';
            const brandKey = getBrandKey(name);
            const imageMarkup = img
                ? `<img src="${img.getAttribute('src')}" alt="${img.getAttribute('alt') || `${name} logo`}" loading="lazy" decoding="async">`
                : `<strong>${name}</strong>`;
            return `
                <article data-brand="${brandKey}">
                    <div class="product-hero-logo">${imageMarkup}</div>
                    <h2>${name}</h2>
                    <p>${getBrandSupportLine(name, pageTitle)}</p>
                </article>
            `;
        }).join('') : getFallbackHeroStack(pageTitle);

        const panelLabel = /amc|maintenance|service support|installation/i.test(pageTitle) ? 'Support Scope' : 'Brand Stack';
        panel.innerHTML = `
            <p class="product-hero-panel-label">${panelLabel}</p>
            <div class="product-hero-brand-grid">${brandCards}</div>
        `;

        hero.appendChild(panel);
    }

    function getBrandSupportLine(name, pageTitle) {
        const key = name.toLowerCase();
        const title = (pageTitle || '').toLowerCase();
        if (key.includes('maxhub')) return title.includes('classroom') ? 'Interactive classroom panels' : 'Collaboration displays';
        if (key.includes('newline')) return title.includes('classroom') ? 'Teaching displays' : 'Interactive displays';
        if (key.includes('epson')) return title.includes('classroom') ? 'Classroom projection' : 'Projection systems';
        if (key.includes('sennheiser')) return 'Speech microphones';
        if (key.includes('harman') || key.includes('jbl')) return 'Audio systems';
        if (key.includes('poly') || key.includes('lumens')) return 'Collaboration devices';
        if (key.includes('absen')) return 'LED wall systems';
        if (key.includes('sony')) return 'AV imaging';
        if (key.includes('samsung') || key.includes('lg') || key.includes('benq')) return 'Display systems';
        if (key.includes('crestron') || key.includes('amx') || key.includes('aten')) return 'Control systems';
        if (key.includes('luminous')) return 'Power backup';
        if (key.includes('hp') || key.includes('dell') || key.includes('lenovo') || key.includes('acer')) return 'Enterprise IT';
        if (key.includes('multi-brand')) return 'Eligible multi-OEM support';
        if (key.includes('oem')) return 'Warranty coordination';
        if (key.includes('existing')) return 'Installed-base assessment';
        return 'Supply and support';
    }

    function getFallbackHeroStack(pageTitle) {
        return ['Consult', 'Supply', 'Integrate', 'Support'].map((title, index) => `
            <article data-brand="gpspl-step">
                <div class="product-hero-logo product-hero-step">${String(index + 1).padStart(2, '0')}</div>
                <h2>${title}</h2>
                <p>${pageTitle} planning, delivery and lifecycle ownership</p>
            </article>
        `).join('');
    }

    function getBrandKey(name = '') {
        return String(name)
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
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
        function buildLeadPayload(form, formName, source) {
            const formData = new FormData(form);
            const payload = {
                name: formData.get('name') || '',
                email: formData.get('email') || '',
                phone: formData.get('phone') || '',
                company: formData.get('company') || '',
                requirement: formData.get('requirement') || source || 'Website enquiry',
                location: formData.get('location') || '',
                message: formData.get('message') || '',
                source: source || formName,
                pageUrl: formData.get('page_url') || window.location.href,
                botField: formData.get('bot-field') || '',
                consent: true
            };

            const params = new URLSearchParams(window.location.search);
            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
                if (!params.has(key)) return;
                const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
                payload[camelKey] = params.get(key);
            });

            return payload;
        }

        async function submitToLeadApi(form, formName, source) {
            const endpoint = window.GPSPL_CONFIG?.leadApiEndpoint;
            if (!endpoint) return false;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildLeadPayload(form, formName, source))
            });

            if (!response.ok) throw new Error('API form submission failed');
            return true;
        }

        async function submitToStaticForm(form) {
            const formData = new FormData(form);
            const body = new URLSearchParams(formData).toString();
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });

            if (!response.ok) throw new Error('Static form submission failed');
        }

        document.querySelectorAll('form[data-lead-form]').forEach(form => {
            if (form.dataset.leadSubmitBound === 'true') return;
            form.dataset.leadSubmitBound = 'true';

            form.addEventListener('submit', async (event) => {
                if (event.defaultPrevented) return;
                event.preventDefault();

                const source = form.getAttribute('data-lead-form') || 'GPSPL website enquiry';
                const formName = form.getAttribute('name') || form.id || 'gpspl-lead-form';
                const sourceInput = form.querySelector('input[name="lead_source"]');
                const pageInput = form.querySelector('input[name="page_url"]');
                const submittedInput = form.querySelector('input[name="submitted_at"]');
                const status = form.querySelector('.form-submit-status');
                const submitButton = form.querySelector('button[type="submit"]');
                const originalButtonText = submitButton?.dataset.submitLabel || submitButton?.textContent || 'Send Enquiry';

                if (sourceInput) sourceInput.value = source;
                if (pageInput) pageInput.value = window.location.href;
                if (submittedInput) submittedInput.value = new Date().toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                    timeZone: 'Asia/Kolkata'
                });

                if (status) {
                    status.textContent = 'Sending your enquiry securely. Please wait...';
                    status.classList.remove('is-success', 'is-error');
                    status.classList.add('is-active');
                }

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.setAttribute('aria-busy', 'true');
                    submitButton.textContent = submitButton.dataset.loadingLabel || 'Sending...';
                }

                window.gpsplTrack?.('contact_form_submit', {
                    form_name: formName,
                    form_source: source
                });

                try {
                    try {
                        const handledByApi = await submitToLeadApi(form, formName, source);
                        if (!handledByApi) await submitToStaticForm(form);
                    } catch (apiError) {
                        if (window.GPSPL_CONFIG?.leadApiEndpoint) await submitToStaticForm(form);
                        else throw apiError;
                    }

                    if (status) {
                        status.textContent = 'Thank you. Your enquiry has been received. GPSPL will contact you shortly.';
                        status.classList.add('is-active', 'is-success');
                    }

                    if (submitButton) {
                        submitButton.textContent = 'Enquiry Sent';
                    }

                    form.reset();
                    document.dispatchEvent(new CustomEvent('gpspl:lead-form-success', {
                        detail: {
                            form_name: formName,
                            form_source: source
                        }
                    }));
                } catch (error) {
                    if (status) {
                        status.textContent = 'The form could not be submitted right now. Please call GPSPL or send your requirement on WhatsApp.';
                        status.classList.add('is-active', 'is-error');
                    }

                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.removeAttribute('aria-busy');
                        submitButton.textContent = originalButtonText;
                    }

                    document.dispatchEvent(new CustomEvent('gpspl:lead-form-error', {
                        detail: {
                            form_name: formName,
                            form_source: source,
                            error_message: error.message || 'Form submission failed'
                        }
                    }));
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
            else if (href.includes('wa.me') || href.includes('whatsapp.com/send') || href.includes('api.whatsapp.com')) element.dataset.track = 'click_whatsapp';
            else if (href.includes('brochure.pdf')) element.dataset.track = 'download_company_profile';
            else if (href.includes('/contact') || text.includes('request quote') || text.includes('consultation')) element.dataset.track = 'click_lead_cta';
            else if (href.includes('/downloads')) element.dataset.track = 'click_downloads';
        });
    }

    function initContextualWhatsApp() {
        const pageTitle = (document.querySelector('h1')?.textContent || document.title).replace(/\s*\|\s*GPSPL.*/i, '').trim();
        const currentPath = window.location.pathname.toLowerCase();
        
        let customMessage = 'Hello GPSPL, I would like to request an AV / IT consultation & quote.';
        if (currentPath.includes('active-led')) {
            customMessage = 'Hello GPSPL, I am looking for Active LED Display Wall pricing, sizing & site survey for our facility.';
        } else if (currentPath.includes('smart-classroom') || currentPath.includes('interactive-display')) {
            customMessage = 'Hello GPSPL, I want to discuss Smart Classroom Interactive Displays & teaching setup for our institution.';
        } else if (currentPath.includes('conference') || currentPath.includes('huddle') || currentPath.includes('video-conferencing')) {
            customMessage = 'Hello GPSPL, I would like to request a BOQ estimate for our Boardroom / Video Conferencing setup.';
        } else if (currentPath.includes('amc') || currentPath.includes('maintenance')) {
            customMessage = 'Hello GPSPL, I would like to inquire about AV AMC & preventive maintenance support for our office.';
        } else if (currentPath.includes('gurgaon')) {
            customMessage = 'Hello GPSPL Gurgaon Team, I would like to request a corporate AV site survey in Gurgaon / Cyber City.';
        } else if (currentPath.includes('noida')) {
            customMessage = 'Hello GPSPL Noida Team, I would like to discuss an Active LED wall requirement in Noida / NCR.';
        } else if (currentPath.includes('/blog/')) {
            customMessage = `Hello GPSPL, I was reading your guide on "${pageTitle}" and would like to speak with an AV specialist.`;
        }

        const encodedMsg = encodeURIComponent(customMessage);
        document.querySelectorAll('.floating-whatsapp, .whatsapp-button, a[href*="wa.me"]').forEach(btn => {
            btn.href = `https://wa.me/919310092963?text=${encodedMsg}`;
        });
    }

    initHeroSlider();
    initProductDetailHeroStack();
    initRevealAnimations();
    initTestimonialCarousel();
    initIndustryExperience();
    initLeadForms();
    initConversionTrackingHooks();
    initContextualWhatsApp();
    setTimeout(initStatsAnimation, 500); 
});

/* ===== Industry Solutions Tab Switcher ===== */
(function() {
    function initIndustryTabs() {
        var section = document.getElementById('industry-solutions');
        if (!section) return;
        var tabs = section.querySelectorAll('.industry-tab');
        var panels = section.querySelectorAll('.industry-panel');
        if (!tabs.length) return;
        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                var target = tab.getAttribute('data-tab');
                if (!target) return;
                tabs.forEach(function(t) {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                panels.forEach(function(p) { p.classList.remove('active'); });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                var panel = section.querySelector('#tab-' + target);
                if (panel) { panel.classList.add('active'); }
            });
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initIndustryTabs);
    } else {
        initIndustryTabs();
    }
})();
