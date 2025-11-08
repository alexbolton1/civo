// ============================================
// Smooth Scroll for Navigation Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Contact Form Handler
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Пожалуйста, введите корректный email');
            return;
        }
        
        // Here you would typically send the form data to a server
        console.log('Form Data:', {
            name: name,
            email: email,
            message: message
        });
        
        // Show success message
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
}

// ============================================
// Add Animation on Scroll
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and testimonial cards
document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// Mobile Menu Toggle (if added in future)
// ============================================

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}

// ============================================
// Pricing Toggle (Monthly/Annual)
// ============================================

function updatePricing() {
    // This function can be used to toggle between monthly and annual pricing
    // Placeholder for future implementation
}

// ============================================
// CTA Button Click Handlers
// ============================================

document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// Add scroll effect to header
// ============================================

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// Counter Animation for Benefits Section
// ============================================

function animateCounters() {
    const counters = document.querySelectorAll('.benefit-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '%';
            }
        }, 20);
    });
}

// Trigger animation when benefits section is visible
const benefitsSection = document.querySelector('.benefits');
if (benefitsSection) {
    const benefitsObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            animateCounters();
            benefitsObserver.unobserve(benefitsSection);
        }
    }, { threshold: 0.5 });
    
    benefitsObserver.observe(benefitsSection);
}

// ============================================
// Initialize on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('TicketHub Landing Page Loaded');
    
    // Add active state to navigation links based on current scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = 'var(--dark-color)';
            }
        });
    });
});
