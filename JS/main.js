document.addEventListener("DOMContentLoaded", () => {

    function loadModule(moduleId, filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Error loading ${filePath}`);
                return response.text();
            })
            .then(data => {
                const element = document.getElementById(moduleId);
                if (element) {
                    element.innerHTML = data;
                }
            })
            .catch(error => console.error(error));
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
                const speed = 200; 
                
                const updateCount = () => {
                    const count = +counter.innerText.replace('+', '');
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        if (target === 1997) {
                             counter.innerText = target;
                        } else {
                             counter.innerText = target + "+";
                        }
                    }
                };
                updateCount();
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

    initHeroSlider();
    setTimeout(initStatsAnimation, 500); 
});