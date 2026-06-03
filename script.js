// ===========================
// PERFORMANCE UTILITY FUNCTIONS
// ===========================

// Throttle function to limit event firing frequency
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

// ===========================
// ANIMATION ON SCROLL FOR ALL SECTIONS
// ===========================

document.addEventListener("DOMContentLoaded", function () {
    const animatedMap = [
        { selector: '.section-title', anim: 'animate-slide-up' },
        { selector: '.animate-slide-left', anim: 'animate-slide-left' },
        { selector: '.animate-slide-right', anim: 'animate-slide-right' },
        { selector: '.broker-card', anim: 'animate-slide-up' },
        { selector: '.partner-card', anim: 'animate-slide-up' },
        { selector: '.global-highlight', anim: 'animate-slide-left' },
        { selector: '.logistics-column', anim: 'animate-slide-right' },
        { selector: '.contact-grid', anim: 'animate-slide-up' },
        { selector: '.section-text', anim: 'animate-slide-left' },
        { selector: '.hero-content', anim: 'animate-slide-up' },
        { selector: '.catalog-section ul', anim: 'animate-slide-up' },
        { selector: '.info-item', anim: 'animate-slide-up' }
    ];

    const animatedEls = [];

    // Add animation classes
    animatedMap.forEach(item => {
        document.querySelectorAll(item.selector).forEach(el => {
            if (!el.classList.contains(item.anim)) {
                el.classList.add(item.anim);
            }
            animatedEls.push(el);
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    animatedEls.forEach(el => observer.observe(el));

    // ===========================
    // ACTIVE NAV HIGHLIGHTING
    // ===========================
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNavLink() {
        let currentSectionId = "";
        let maxVisibleHeight = 0;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Вычисляем видимую высоту секции в окне
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

            // Если секция видна хотя бы немного
            if (visibleHeight > 0) {
                // Если эта секция видна больше, чем предыдущая найденная - считаем её активной
                if (visibleHeight > maxVisibleHeight) {
                    maxVisibleHeight = visibleHeight;
                    currentSectionId = section.getAttribute("id");
                }
            }
        });

        // Corner case: если мы в самом низу страницы, подсветим последний пункт (Контакты)
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) currentSectionId = lastSection.getAttribute("id");
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            const onclickAttr = link.getAttribute("onclick");
            // Ищем точное совпадение ID в вызове функции scrollToSection('ID')
            if (onclickAttr && currentSectionId && onclickAttr.includes(`scrollToSection('${currentSectionId}')`)) {
                link.classList.add("active");
            }
        });
    }

    // Use throttled version for better performance
    const throttledUpdateNav = throttle(updateActiveNavLink, 100);
    window.addEventListener("scroll", throttledUpdateNav, { passive: true });
    updateActiveNavLink(); // Run on load

    // ===========================
    // WHATSAPP DROPDOWN TOGGLE
    // ===========================
    document.addEventListener('click', function(e) {
        const dropdown = document.querySelector('.whatsapp-dropdown');
        if (!dropdown) return;
        
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const isTrigger = trigger && trigger.contains(e.target);
        const isContent = dropdown.querySelector('.whatsapp-dropdown-content').contains(e.target);
        
        if (isTrigger) {
            dropdown.classList.toggle('active');
        } else if (!isContent) {
            dropdown.classList.remove('active');
        }
    });

    // Header scroll effect - stretches when reaching 'About' section
    const header = document.querySelector(".header");
    const aboutSection = document.getElementById("about");
    
    window.addEventListener("scroll", function() {
        if (aboutSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            // Trigger stretch when About section starts coming into view
            if (aboutRect.top <= 100) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        } else if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }, { passive: true });
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================

function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const isExpanded = mobileMenu.classList.contains("active");

    mobileMenu.classList.toggle("active");
    menuBtn.classList.toggle("active");

    // Update ARIA attribute for accessibility
    menuBtn.setAttribute("aria-expanded", !isExpanded);
}

document.addEventListener("click", function (event) {
    const header = document.querySelector(".header");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const langDropdown = document.querySelector(".lang-dropdown");
    const isLangTrigger = event.target.closest(".lang-dropdown-trigger");

    // Close mobile menu if clicking outside
    if (!header.contains(event.target) && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
    }

    // Toggle language dropdown
    if (isLangTrigger) {
        langDropdown.classList.toggle("active");
    } else if (langDropdown && !langDropdown.contains(event.target)) {
        langDropdown.classList.remove("active");
    }
});

// ===========================
// SMOOTH SCROLLING
// ===========================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        const mobileMenu = document.getElementById("mobileMenu");
        const menuBtn = document.querySelector(".mobile-menu-btn");
        mobileMenu.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
    }
}

// UI and interactions logic. Language features are now handled in lang.js.
