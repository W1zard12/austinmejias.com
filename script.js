// ===== DOM ELEMENTS =====
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const contactForm = document.getElementById('contactForm');

// ===== MOBILE MENU FUNCTIONALITY =====
mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    
    // Update mobile toggle icon
    const icon = mobileToggle.querySelector('i');
    if (sidebar.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('show');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// ===== SMOOTH SCROLLING NAVIGATION =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Close mobile menu after clicking
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('show');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ===== ACTIVE SECTION HIGHLIGHTING =====
function updateActiveSection() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== FADE-IN ANIMATION ON SCROLL =====
function animateOnScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.8) {
            section.classList.add('fade-in');
        }
    });
}

// ===== SCROLL EVENT LISTENER =====
let scrollTimeout;
window.addEventListener('scroll', () => {
    // Throttle scroll events for better performance
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(() => {
        updateActiveSection();
        animateOnScroll();
    }, 10);
});

// ===== CONTACT FORM HANDLING =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // Form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showAlert('Please fill in all fields.', 'danger');
        return;
    }

    if (!isValidEmail(formData.email)) {
        showAlert('Please enter a valid email address.', 'danger');
        return;
    }

    if (formData.message.length < 10) {
        showAlert('Message must be at least 10 characters long.', 'warning');
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// ===== EMAIL VALIDATION =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== ALERT SYSTEM =====
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    const alertId = 'alert-' + Date.now();
    
    const alertHTML = `
        <div id="${alertId}" class="alert alert-${type} alert-dismissible" role="alert">
            <i class="fas fa-${getAlertIcon(type)} me-2"></i>
            ${message}
            <button type="button" class="btn-close" onclick="closeAlert('${alertId}')" aria-label="Close"></button>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alertHTML);
    
    const alertElement = document.getElementById(alertId);
    setTimeout(() => alertElement.classList.add('show'), 100);
    
    // Auto-remove after 5 seconds
    setTimeout(() => closeAlert(alertId), 5000);
}

function getAlertIcon(type) {
    const icons = {
        success: 'check-circle',
        danger: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function closeAlert(alertId) {
    const alertElement = document.getElementById(alertId);
    if (alertElement) {
        alertElement.classList.remove('show');
        setTimeout(() => alertElement.remove(), 300);
    }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Toggle sidebar with Ctrl+M
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        sidebar.classList.toggle('show');
    }
    
    // Close alerts with Escape key
    if (e.key === 'Escape') {
        const alerts = document.querySelectorAll('.alert.show');
        alerts.forEach(alert => {
            closeAlert(alert.id);
        });
    }
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('show');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Intersection Observer for better scroll performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Add initial fade-in class to first section
    if (sections.length > 0) {
        sections[0].classList.add('fade-in');
    }
    
    // Set initial active nav item
    updateActiveSection();
    
    // Initialize intersection observer for sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add loading animation to skill badges
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        setTimeout(() => {
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(20px)';
            badge.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
    
    // Preload images for better performance
    const images = document.querySelectorAll('img[src*="placeholder"]');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus management for keyboard navigation
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// ===== DARK/LIGHT THEME TOGGLE (Optional Enhancement) =====
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.className = 'btn btn-outline-secondary position-fixed';
    themeToggle.style.cssText = 'top: 1rem; right: 1rem; z-index: 1001;';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

// Uncomment to enable theme toggle
// initThemeToggle();