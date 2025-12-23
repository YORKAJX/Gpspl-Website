document.addEventListener("DOMContentLoaded", () => {
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger-btn');
        const navLinks = document.getElementById('navLinks');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }
    function initStatsAnimation() {
        const statsSection = document.getElementById('statsSection');
        const counters = document.querySelectorAll('.counter');
        let hasStarted = false;

        if (!statsSection) return; // Exit if section not found

        const startCounting = () => {
            console.log("Stats Animation Started!"); 

            counters.forEach(counter => {
                // Force start at 0
                counter.innerText = '0'; 

                const target = +counter.getAttribute('data-target');
                const speed = 100; // Lower number = Faster animation
                
                const updateCount = () => {
                    // Get current value (clean string)
                    const count = +counter.innerText.replace('+', '');
                    
                    // Calculate increment
                    const inc = target / speed;

                    if (count < target) {
                        // Add increment & repeat
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        // Finish: Clean up the number formatting
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

    
    setTimeout(initStatsAnimation, 500); 

});