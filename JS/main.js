document.addEventListener("DOMContentLoaded", () => {
    
    // Function to load HTML modules
    function loadModule(moduleId, filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`Error loading ${filePath}`);
                return response.text();
            })
            .then(data => {
                document.getElementById(moduleId).innerHTML = data;
                
                // If we just loaded the header, re-attach event listeners for the mobile menu
                if (moduleId === 'header-container') {
                    initMobileMenu();
                }
            })
            .catch(error => console.error(error));
    }

    // Load the 3 distinct modules
    loadModule("header-container", "modules/header.html");
    loadModule("solutions-container", "modules/solutions.html");
    loadModule("footer-container", "modules/footer.html");

    // Initialize Mobile Menu Logic (called after header loads)
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger-btn');
        const navLinks = document.getElementById('navLinks');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }
});