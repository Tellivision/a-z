// Services Page JavaScript

// Service Card Animations Controller
class ServiceAnimations {
    constructor() {
        this.serviceCards = document.querySelectorAll('.service-card');
        this.processSteps = document.querySelectorAll('.process-step');
        this.industryCards = document.querySelectorAll('.industry-card');
        this.init();
    }

    init() {
        this.setupScrollObserver();
        this.setupServiceCardInteractions();
        this.setupIconAnimations();
    }

    setupScrollObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        this.animateElement(entry.target);
                    }, index * 150);
                }
            });
        }, options);

        // Observe all animated elements
        [...this.serviceCards, ...this.processSteps, ...this.industryCards].forEach(element => {
            observer.observe(element);
        });
    }

    setupServiceCardInteractions() {
        this.serviceCards.forEach(card => {
            const icon = card.querySelector('.animated-icon');
            const serviceLink = card.querySelector('.service-link');
            
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, icon);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetCardHover(card, icon);
            });
            
            // Add click animation for service links
            if (serviceLink) {
                serviceLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.animateServiceLinkClick(serviceLink);
                });
            }
        });
    }

    setupIconAnimations() {
        // Trigger icon animations when cards become visible
        const iconObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const icon = entry.target.querySelector('.animated-icon');
                    if (icon) {
                        this.triggerIconAnimation(icon);
                    }
                }
            });
        }, { threshold: 0.5 });

        this.serviceCards.forEach(card => {
            iconObserver.observe(card);
        });
    }

    animateElement(element) {
        if (element.classList.contains('service-card')) {
            this.animateServiceCard(element);
        } else if (element.classList.contains('process-step')) {
            this.animateProcessStep(element);
        } else if (element.classList.contains('industry-card')) {
            this.animateIndustryCard(element);
        }
    }

    animateServiceCard(card) {
        const icon = card.querySelector('.service-icon');
        const title = card.querySelector('.service-title');
        const features = card.querySelectorAll('.service-features li');
        
        // Animate icon
        icon.style.animation = 'fadeInUp 0.6s ease-out';
        
        // Animate title
        setTimeout(() => {
            title.style.animation = 'fadeInUp 0.6s ease-out';
        }, 200);
        
        // Animate features with stagger
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '0';
                feature.style.transform = 'translateX(-20px)';
                feature.style.animation = 'slideInFromLeft 0.4s ease-out forwards';
            }, 400 + index * 100);
        });
    }

    animateProcessStep(step) {
        const number = step.querySelector('.step-number');
        const content = step.querySelector('.step-content');
        
        // Animate step number with pulse effect
        number.style.animation = 'pulseGlow 0.8s ease-out';
        
        // Animate content
        setTimeout(() => {
            content.style.animation = 'fadeInUp 0.6s ease-out';
        }, 300);
    }

    animateIndustryCard(card) {
        const icon = card.querySelector('.industry-icon');
        
        // Animate industry icon
        icon.style.animation = 'bounceIn 0.6s ease-out';
    }

    animateCardHover(card, icon) {
        // Enhanced hover effects
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
        
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.filter = 'drop-shadow(0 0 25px rgba(0, 212, 255, 0.8))';
        }
        
        // Add subtle glow to card
        card.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.2), 0 0 0 1px rgba(0, 212, 255, 0.1)';
    }

    resetCardHover(card, icon) {
        card.style.transform = 'translateY(-10px)';
        
        if (icon) {
            icon.style.transform = 'scale(1)';
            icon.style.filter = 'none';
        }
    }

    animateServiceLinkClick(link) {
        link.style.transform = 'scale(1.05)';
        link.style.color = '#ffffff';
        
        setTimeout(() => {
            link.style.transform = 'scale(1)';
            link.style.color = '#00d4ff';
        }, 150);
    }

    triggerIconAnimation(icon) {
        // Restart SVG path animations
        const paths = icon.querySelectorAll('path, circle, rect, line');
        paths.forEach(path => {
            path.style.animation = 'none';
            path.offsetHeight; // Trigger reflow
            path.style.animation = null;
        });
    }
}

// Floating Elements Controller
class FloatingElementsController {
    constructor() {
        this.elements = document.querySelectorAll('.services-hero .element');
        this.heroSection = document.querySelector('.services-hero');
        this.init();
    }

    init() {
        this.setupMouseInteraction();
        this.setupParallaxEffect();
    }

    setupMouseInteraction() {
        if (!this.heroSection) return;
        
        this.heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPercent = (clientX / innerWidth) * 100;
            const yPercent = (clientY / innerHeight) * 100;
            
            this.elements.forEach((element, index) => {
                const speed = 0.3 + index * 0.1;
                const x = (xPercent - 50) * speed;
                const y = (yPercent - 50) * speed;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
        
        this.heroSection.addEventListener('mouseleave', () => {
            this.elements.forEach(element => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            this.elements.forEach((element, index) => {
                const speed = 0.1 + index * 0.05;
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
}

// Process Timeline Animation
class ProcessTimelineController {
    constructor() {
        this.timeline = document.querySelector('.process-timeline');
        this.steps = document.querySelectorAll('.process-step');
        this.init();
    }

    init() {
        this.setupTimelineAnimation();
        this.setupStepInteractions();
    }

    setupTimelineAnimation() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateTimelineLine();
                }
            });
        }, options);

        if (this.timeline) {
            observer.observe(this.timeline);
        }
    }

    setupStepInteractions() {
        this.steps.forEach(step => {
            const stepNumber = step.querySelector('.step-number');
            
            step.addEventListener('mouseenter', () => {
                stepNumber.style.transform = 'scale(1.1)';
                stepNumber.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.6)';
            });
            
            step.addEventListener('mouseleave', () => {
                stepNumber.style.transform = 'scale(1)';
                stepNumber.style.boxShadow = 'none';
            });
        });
    }

    animateTimelineLine() {
        const timelineLine = this.timeline.querySelector('::before');
        // Timeline line animation is handled via CSS
    }
}

// Industries Section Controller
class IndustriesController {
    constructor() {
        this.industryCards = document.querySelectorAll('.industry-card');
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
    }

    setupHoverEffects() {
        this.industryCards.forEach(card => {
            const icon = card.querySelector('.industry-icon');
            
            card.addEventListener('mouseenter', () => {
                this.animateCardEntry(card, icon);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardExit(card, icon);
            });
        });
    }

    setupClickEffects() {
        this.industryCards.forEach(card => {
            card.addEventListener('click', () => {
                this.animateCardClick(card);
            });
        });
    }

    animateCardEntry(card, icon) {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.filter = 'brightness(1.2)';
    }

    animateCardExit(card, icon) {
        card.style.transform = 'translateY(0) scale(1)';
        icon.style.transform = 'scale(1) rotate(0deg)';
        icon.style.filter = 'brightness(1)';
    }

    animateCardClick(card) {
        card.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.ticking = false;
        this.init();
    }

    init() {
        this.optimizeScrollEvents();
        this.preloadAssets();
    }

    optimizeScrollEvents() {
        let ticking = false;
        
        const updateAnimations = () => {
            // Update scroll-based animations here
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    preloadAssets() {
        // Preload critical animations
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                console.log('Services page assets preloaded');
            });
        }
    }
}

// Add custom CSS animations
const servicesStyles = document.createElement('style');
servicesStyles.textContent = `
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulseGlow {
        0%, 100% {
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
        }
        50% {
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.8);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.1) rotate(5deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
    
    @keyframes iconPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .service-card:hover .service-icon {
        animation: iconPulse 2s ease-in-out infinite;
    }
    
    .process-step .step-number {
        transition: all 0.3s ease;
    }
    
    .industry-card .industry-icon {
        transition: all 0.4s ease;
    }
`;
document.head.appendChild(servicesStyles);

// Initialize all controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ServiceAnimations();
    new FloatingElementsController();
    new ProcessTimelineController();
    new IndustriesController();
    new PerformanceOptimizer();
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading state management
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Service card reveal animation on scroll
const revealServiceCards = () => {
    const cards = document.querySelectorAll('.service-card:not(.visible)');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = cardTop < window.innerHeight - 100;
        
        if (cardVisible) {
            card.classList.add('visible');
        }
    });
};

// Throttled scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(revealServiceCards, 10);
}, { passive: true });

// Initial reveal check
revealServiceCards();

// Add intersection observer for better performance
if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.service-card, .process-step, .industry-card').forEach(card => {
        cardObserver.observe(card);
    });
}