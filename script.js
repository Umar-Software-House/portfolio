/* ==========================================
   MUHAMMAD UMAR - PORTFOLIO SCRIPTS
   Dynamic, Interactive, Professional
   ========================================== */

 // LOADING SCREEN
// ==========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
        initAnimations();
    }, 1500);
});

// ==========================================
// PARTICLE BACKGROUND
// ==========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    drawConnections();
    animationId = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ==========================================
// CURSOR GLOW EFFECT
// ==========================================
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ==========================================
// NAVIGATION
// ==========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Scroll Effects
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Active nav link
    updateActiveNav();

    // Reveal animations
    revealElements();

    // Animate skill bars
    animateSkillBars();

    // Animate stats
    animateStats();
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Active navigation link
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Back to Top
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
const typewriterTexts = [
    'Python AI Engineer',
    'Automation Specialist',
    'n8n Workflow Expert',
    'Backend Developer',
    'Data Pipeline Architect',
    'AI Solutions Builder'
];

let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterDelay = 100;

function typeWriter() {
    const typewriterEl = document.getElementById('typewriter');
    const currentText = typewriterTexts[typewriterIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typewriterDelay = 50;
    } else {
        typewriterEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typewriterDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typewriterDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
        typewriterDelay = 500;
    }

    setTimeout(typeWriter, typewriterDelay);
}

typeWriter();

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
let statsAnimated = false;

function animateStats() {
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar || statsAnimated) return;

    const rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        statsAnimated = true;
        const statItems = document.querySelectorAll('.stat-item');

        statItems.forEach(item => {
            const target = parseInt(item.getAttribute('data-count'));
            const numberEl = item.querySelector('.stat-number');
            const suffix = numberEl.textContent.includes('%') ? '%' : '+';
            let current = 0;
            const increment = target / 60;
            const duration = 2000;
            const step = duration / 60;

            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(counter);
                }
                numberEl.textContent = Math.floor(current) + suffix;
            }, step);
        });
    }
}

// ==========================================
// SKILL BARS ANIMATION
// ==========================================
let skillBarsAnimated = false;

function animateSkillBars() {
    if (skillBarsAnimated) return;

    const skillBars = document.querySelectorAll('.skill-fill');
    const firstBar = skillBars[0];
    if (!firstBar) return;

    const rect = firstBar.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        skillBarsAnimated = true;
        skillBars.forEach((bar, index) => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, index * 100);
        });
    }
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
function revealElements() {
    const elements = document.querySelectorAll('.section-header, .about-card, .soft-skill-card, .tech-skill-group, .project-card, .timeline-item, .testimonial-card, .contact-form, .contact-info-card, .about-text-section');

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('revealed');
        }
    });
}

// Add reveal styles dynamically
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .section-header, .about-card, .soft-skill-card, .tech-skill-group, 
    .project-card, .timeline-item, .contact-form, .contact-info-card, .about-text-section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .about-card:nth-child(1) { transition-delay: 0s; }
    .about-card:nth-child(2) { transition-delay: 0.1s; }
    .about-card:nth-child(3) { transition-delay: 0.2s; }
    .about-card:nth-child(4) { transition-delay: 0.3s; }
    .project-card:nth-child(1) { transition-delay: 0s; }
    .project-card:nth-child(2) { transition-delay: 0.1s; }
    .project-card:nth-child(3) { transition-delay: 0.2s; }
    .project-card:nth-child(4) { transition-delay: 0.3s; }
    .project-card:nth-child(5) { transition-delay: 0.4s; }
    .project-card:nth-child(6) { transition-delay: 0.5s; }
    .timeline-item:nth-child(1) { transition-delay: 0s; }
    .timeline-item:nth-child(2) { transition-delay: 0.15s; }
    .timeline-item:nth-child(3) { transition-delay: 0.3s; }
    .contact-info-card:nth-child(1) { transition-delay: 0s; }
    .contact-info-card:nth-child(2) { transition-delay: 0.1s; }
    .contact-info-card:nth-child(3) { transition-delay: 0.2s; }
`;
document.head.appendChild(revealStyle);

// ==========================================
// PROJECT FILTERS
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('testimonialDots');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentTestimonial = 0;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(index));
    dotsContainer.appendChild(dot);
});

function goToTestimonial(index) {
    currentTestimonial = index;
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;

    // Update dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    goToTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    goToTestimonial(currentTestimonial);
});

// Auto-slide
let autoSlide = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    goToTestimonial(currentTestimonial);
}, 5000);

// Pause on hover
const slider = document.getElementById('testimonialSlider');
slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        goToTestimonial(currentTestimonial);
    }, 5000);
});

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        } else {
            currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        }
        goToTestimonial(currentTestimonial);
    }
}

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Show success message
        contactForm.innerHTML = `
            <div class="form-success show">
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out, ${data.name}. I'll get back to you as soon as possible.</p>
            </div>
        `;
    }, 2000);
});

// ==========================================
// SMOOTH SCROLL FOR NAV LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// INIT ANIMATIONS
// ==========================================
function initAnimations() {
    revealElements();
    animateStats();
    animateSkillBars();
}

// ==========================================
// NAVBAR LINK HOVER EFFECT
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s ease';
    });
});

// ==========================================
// TILT EFFECT ON PROJECT CARDS (Desktop only)
// ==========================================
if (window.innerWidth > 768) {
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ==========================================
// PERFORMANCE: Pause particles when tab not visible
// ==========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(animationId);
    } else {
        animateParticles();
    }
});

console.log('%c Muhammad Umar | Portfolio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c Python AI & Automation Engineer', 'color: #a78bfa; font-size: 14px;');
