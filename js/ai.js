// ==================== THEME TOGGLE FUNCTIONALITY ====================
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Update button position based on current theme
updateThemeToggle();

themeBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Add transition class to body for smooth color changes
    document.body.classList.add('theme-transition');

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateThemeToggle();

    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
});

function updateThemeToggle() {
    const currentTheme = html.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        themeBtn.style.backgroundColor = 'var(--primary-dark)';
    } else {
        themeBtn.style.backgroundColor = 'var(--primary)';
    }
}

// ==================== MOBILE MENU FUNCTIONALITY ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');

    // Change icon
    if (navLinks.classList.contains('active')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close menu when clicking overlay or links
navOverlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if it's an anchor link
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// ==================== STATUS INDICATOR ANIMATION ====================
const statusIndicator = document.querySelector('.status-indicator');

window.addEventListener('load', () => {
    statusIndicator.classList.add('active');
    setTimeout(() => {
        statusIndicator.classList.remove('active');
    }, 1000);
});

// ==================== SCROLL ANIMATIONS ====================
function animateOnScroll() {
    const elements = document.querySelectorAll('.hero-content, .hero-image, .about-image, .about-text, .service-card, .portfolio-item, .blog-card, .contact-info, .contact-form, .stat-card, .team-card, .feature-item, .trend-card');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8;

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;

        if (elementPosition < triggerPoint) {
            element.classList.add('animated');
        }
    });
}

// ==================== AI TRENDS CARDS FADE-UP ANIMATION ====================
function animateAITrendsCards() {
    const aiTrendsSection = document.querySelector('.ai-trends');
    const aiTrendsCards = document.querySelectorAll('.trend-card');
    const windowHeight = window.innerHeight;

    // Check if the AI trends section is in view
    const sectionPosition = aiTrendsSection.getBoundingClientRect();

    if (sectionPosition.top < windowHeight && sectionPosition.bottom > 0) {
        aiTrendsSection.classList.add('fade-up-animated');

        // Animate each card with a delay
        aiTrendsCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-up-animated');
            }, index * 150);
        });
    }
}

// Also trigger animations when elements come into view after initial scroll
window.addEventListener('scroll', () => {
    animateOnScroll();
    animateAITrendsCards();
});

// Trigger initial animations for elements already in view
window.addEventListener('load', () => {
    animateOnScroll();
    animateAITrendsCards();
});

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const trendCards = document.querySelectorAll('.trend-card');

    trendCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('in-view');
        }
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initial check for elements in viewport
    handleScrollAnimations();

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);

    // Add resize event listener to handle responsive changes
    window.addEventListener('resize', handleScrollAnimations);

    // Add a slight delay to ensure all elements are properly rendered
    setTimeout(handleScrollAnimations, 300);
});

// Additional animation for trend icons on hover
document.querySelectorAll('.trend-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.trend-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    });

    card.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.trend-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0)';
        }
    });
});

// ==================== BACK TO TOP BUTTON ====================
document.addEventListener('DOMContentLoaded', function () {
    const backToTop = document.getElementById('backToTop');

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Smooth scroll to top when clicked
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');

        const alertBox = document.createElement('div');
        alertBox.style.position = 'fixed';
        alertBox.style.top = '20px';
        alertBox.style.right = '20px';
        alertBox.style.padding = '1rem 1.5rem';
        alertBox.style.backgroundColor = '#10b981';
        alertBox.style.color = 'white';
        alertBox.style.borderRadius = '0.5rem';
        alertBox.style.boxShadow = '0 4px 6px rgba(0, 0, 0,0.1)';
        alertBox.style.zIndex = '10000';
        alertBox.style.animation = 'fadeIn 0.3s ease forwards';
        alertBox.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-check-circle" style="font-size: 1.25rem;"></i>
                <span>Thank you for subscribing with ${emailInput.value}!</span>
            </div>
        `;

        document.body.appendChild(alertBox);

        // Remove alert after 5 seconds
        setTimeout(() => {
            alertBox.style.animation = 'fadeIn 0.3s ease reverse forwards';
            setTimeout(() => {
                alertBox.remove();
            }, 300);
        }, 5000);

        emailInput.value = '';
    });
}

// ==================== CARD INTERACTIONS ====================
const cards = document.querySelectorAll('.trend-card');

cards.forEach(card => {
    // Reset when mouse leaves
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0) rotateX(0)';
    });

    // Add ripple effect to cards when clicked
    card.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

// ==================== COLOR PICKER FUNCTIONALITY ====================
const colorPickerBtn = document.getElementById('colorPickerBtn');
const colorPickerPanel = document.getElementById('colorPickerPanel');
const colorOptions = document.querySelectorAll('.color-option');
const customColorInput = document.getElementById('customColor');

// Toggle color picker panel
if (colorPickerBtn && colorPickerPanel) {
    colorPickerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        colorPickerPanel.classList.toggle('active');
    });

    // Close color picker when clicking outside
    document.addEventListener('click', (e) => {
        if (!colorPickerPanel.contains(e.target) && !colorPickerBtn.contains(e.target)) {
            colorPickerPanel.classList.remove('active');
        }
    });

    // Set theme color from predefined options
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.getAttribute('data-color');
            setThemeColor(color);

            // Update custom color input to match
            customColorInput.value = color;

            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to selected option
            option.classList.add('active');
        });
    });

    // Set theme color from custom color input
    customColorInput.addEventListener('input', () => {
        const color = customColorInput.value;
        setThemeColor(color);

        // Remove active class from all predefined options
        colorOptions.forEach(opt => opt.classList.remove('active'));
    });

    // Function to set theme color
    function setThemeColor(color) {
        // Calculate darker and lighter variants
        const darkerColor = shadeColor(color, -20);
        const lighterColor = shadeColor(color, 20);

        // Set CSS variables
        document.documentElement.style.setProperty('--primary', color);
        document.documentElement.style.setProperty('--primary-dark', darkerColor);
        document.documentElement.style.setProperty('--primary-light', lighterColor);

        // Save to localStorage
        localStorage.setItem('primaryColor', color);
        localStorage.setItem('primaryDarkColor', darkerColor);
        localStorage.setItem('primaryLightColor', lighterColor);

        // Update theme toggle button color
        updateThemeToggle();
    }

    // Helper function to shade colors
    function shadeColor(color, percent) {
        let R = parseInt(color.substring(1, 3), 16);
        let G = parseInt(color.substring(3, 5), 16);
        let B = parseInt(color.substring(5, 7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R < 255) ? R : 255;
        G = (G < 255) ? G : 255;
        B = (B < 255) ? B : 255;

        R = Math.round(R);
        G = Math.round(G);
        B = Math.round(B);

        const RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
        const GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
        const BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

        return "#" + RR + GG + BB;
    }

    // Load saved color theme if exists
    const savedPrimaryColor = localStorage.getItem('primaryColor');
    if (savedPrimaryColor) {
        document.documentElement.style.setProperty('--primary', savedPrimaryColor);
        document.documentElement.style.setProperty('--primary-dark', localStorage.getItem('primaryDarkColor'));
        document.documentElement.style.setProperty('--primary-light', localStorage.getItem('primaryLightColor'));

        // Update custom color input
        customColorInput.value = savedPrimaryColor;

        // Mark active color option if it matches
        colorOptions.forEach(option => {
            if (option.getAttribute('data-color') === savedPrimaryColor) {
                option.classList.add('active');
            }
        });
    }
}

// Add CSS transition class for theme switching
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .theme-transition {
            transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease !important;
        }
        
        .trend-card {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .trend-card.fade-up-animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .ai-trends {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .ai-trends.fade-up-animated {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`);