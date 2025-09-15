// About Page Specific JavaScript

// Timeline Animation Controller
class TimelineAnimations {
    constructor() {
        this.timelineItems = document.querySelectorAll('.timeline-item');
        this.init();
    }

    init() {
        this.setupScrollObserver();
    }

    setupScrollObserver() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateTimelineItem(entry.target);
                }
            });
        }, options);

        this.timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    animateTimelineItem(item) {
        const content = item.querySelector('.timeline-content');
        const marker = item.querySelector('.timeline-marker');
        
        // Animate marker
        marker.style.animation = 'markerPop 0.6s ease-out';
        
        // Animate content based on position
        const isOdd = Array.from(this.timelineItems).indexOf(item) % 2 === 0;
        content.style.animation = isOdd ? 'slideInFromLeft 0.6s ease-out' : 'slideInFromRight 0.6s ease-out';
    }
}

// Team Member Interactions
class TeamInteractions {
    constructor() {
        this.teamMembers = document.querySelectorAll('.team-member');
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupClickEffects();
    }

    setupHoverEffects() {
        this.teamMembers.forEach(member => {
            const card = member.querySelector('.member-card');
            const avatar = member.querySelector('.avatar');
            
            member.addEventListener('mouseenter', () => {
                this.animateCardEntry(card, avatar);
            });
            
            member.addEventListener('mouseleave', () => {
                this.animateCardExit(card, avatar);
            });
        });
    }

    setupClickEffects() {
        this.teamMembers.forEach(member => {
            const socialLinks = member.querySelectorAll('.social-link');
            
            socialLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.animateSocialClick(link);
                });
            });
        });
    }

    animateCardEntry(card, avatar) {
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
        avatar.style.transform = 'scale(1.1)';
        
        // Add subtle glow effect
        card.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.2)';
    }

    animateCardExit(card, avatar) {
        card.style.transform = 'translateY(0) rotateX(0deg)';
        avatar.style.transform = 'scale(1)';
        card.style.boxShadow = 'none';
    }

    animateSocialClick(link) {
        link.style.transform = 'scale(1.2)';
        link.style.background = '#00d4ff';
        
        setTimeout(() => {
            link.style.transform = 'scale(1.1)';
            link.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 150);
    }
}

// Floating Elements Animation
class FloatingElements {
    constructor() {
        this.elements = document.querySelectorAll('.element');
        this.init();
    }

    init() {
        this.animateElements();
        this.setupMouseInteraction();
    }

    animateElements() {
        this.elements.forEach((element, index) => {
            const duration = 5 + index * 2; // Different durations for each element
            const delay = index * 0.5; // Staggered start times
            
            element.style.animationDuration = `${duration}s`;
            element.style.animationDelay = `${delay}s`;
        });
    }

    setupMouseInteraction() {
        const heroSection = document.querySelector('.about-hero');
        
        if (heroSection) {
            heroSection.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                const xPercent = (clientX / innerWidth) * 100;
                const yPercent = (clientY / innerHeight) * 100;
                
                this.elements.forEach((element, index) => {
                    const speed = 0.5 + index * 0.2;
                    const x = (xPercent - 50) * speed;
                    const y = (yPercent - 50) * speed;
                    
                    element.style.transform = `translate(${x}px, ${y}px)`;
                });
            });
        }
    }
}

// Values Section Animation
class ValuesAnimation {
    constructor() {
        this.valueCards = document.querySelectorAll('.value-card');
        this.init();
    }

    init() {
        this.setupScrollAnimation();
        this.setupHoverEffects();
    }

    setupScrollAnimation() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in', 'visible');
                        this.animateValueIcon(entry.target);
                    }, index * 200);
                }
            });
        }, options);

        this.valueCards.forEach(card => {
            observer.observe(card);
        });
    }

    setupHoverEffects() {
        this.valueCards.forEach(card => {
            const icon = card.querySelector('.value-icon');
            
            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.filter = 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))';
            });
            
            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))';
            });
        });
    }

    animateValueIcon(card) {
        const icon = card.querySelector('.value-icon');
        icon.style.animation = 'iconBounce 0.6s ease-out';
    }
}

// Mission/Vision Cards Animation
class MissionVisionAnimation {
    constructor() {
        this.missionCard = document.querySelector('.mission-card');
        this.visionCard = document.querySelector('.vision-card');
        this.init();
    }

    init() {
        this.setupScrollAnimation();
        this.setupParallaxEffect();
    }

    setupScrollAnimation() {
        const options = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                    this.animateCard(entry.target);
                }
            });
        }, options);

        if (this.missionCard) observer.observe(this.missionCard);
        if (this.visionCard) observer.observe(this.visionCard);
    }

    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (this.missionCard) {
                this.missionCard.style.transform = `translateY(${rate * 0.1}px)`;
            }
            
            if (this.visionCard) {
                this.visionCard.style.transform = `translateY(${rate * 0.15}px)`;
            }
        });
    }

    animateCard(card) {
        const icon = card.querySelector('.card-icon');
        icon.style.animation = 'iconGlow 1s ease-out';
    }
}

// CTA Section Animation
class CTAAnimation {
    constructor() {
        this.ctaSection = document.querySelector('.cta-section');
        this.ctaButtons = document.querySelectorAll('.cta-section .cta-button');
        this.init();
    }

    init() {
        this.setupScrollAnimation();
        this.setupButtonEffects();
    }

    setupScrollAnimation() {
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCTAEntry();
                }
            });
        }, options);

        if (this.ctaSection) {
            observer.observe(this.ctaSection);
        }
    }

    setupButtonEffects() {
        this.ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    animateCTAEntry() {
        const title = this.ctaSection.querySelector('h2');
        const subtitle = this.ctaSection.querySelector('p');
        
        title.style.animation = 'fadeInUp 0.6s ease-out';
        subtitle.style.animation = 'fadeInUp 0.6s ease-out 0.2s both';
        
        this.ctaButtons.forEach((button, index) => {
            button.style.animation = `fadeInUp 0.6s ease-out ${0.4 + index * 0.1}s both`;
        });
    }
}

// Add custom CSS animations
const aboutStyles = document.createElement('style');
aboutStyles.textContent = `
    @keyframes markerPop {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes iconBounce {
        0%, 100% {
            transform: scale(1) rotate(0deg);
        }
        25% {
            transform: scale(1.1) rotate(-5deg);
        }
        75% {
            transform: scale(1.1) rotate(5deg);
        }
    }
    
    @keyframes iconGlow {
        0%, 100% {
            filter: drop-shadow(0 0 20px rgba(0, 212, 255, 0.5));
        }
        50% {
            filter: drop-shadow(0 0 30px rgba(0, 212, 255, 0.8));
        }
    }
    
    .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .timeline-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .value-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .value-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .mission-card,
    .vision-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
        height: 100%;
    }
    
    .mission-card.visible,
    .vision-card.visible {
        opacity: 1;
        transform: translateY(0);
        height: 100%;
    }
`;
document.head.appendChild(aboutStyles);

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TimelineAnimations();
    new TeamInteractions();
    new FloatingElements();
    new ValuesAnimation();
    new MissionVisionAnimation();
    new CTAAnimation();
    
    // Add smooth scroll behavior for internal links
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
});

// Performance optimization for scroll events
let ticking = false;

function updateAnimations() {
    // Update any scroll-based animations here
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Preload critical animations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload any heavy animations or assets
        console.log('About page animations initialized');
    });
}