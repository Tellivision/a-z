// Particle Animation System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        this.particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(0, 212, 255, ',
            'rgba(139, 92, 246, ',
            'rgba(16, 185, 129, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color + '0.5)';
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });

        this.drawConnections();
    }

    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
}

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.nav-dot');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAutoPlay();
    }

    setupEventListeners() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
}

// Animated Counter
class AnimatedCounter {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (this.target - start) * easeOutQuart);
            
            this.element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target;
                this.hasAnimated = true;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.counters = [];
        this.init();
    }

    init() {
        this.setupCounters();
        this.setupScrollListener();
        this.checkElements();
    }

    setupCounters() {
        const counterElements = document.querySelectorAll('.stat-number');
        counterElements.forEach(element => {
            const target = parseInt(element.dataset.target);
            this.counters.push(new AnimatedCounter(element, target));
        });
    }

    setupScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.checkElements();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    checkElements() {
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        this.elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            if (scrollTop + windowHeight > elementTop + elementHeight * 0.1) {
                const delay = element.dataset.aosDelay || 0;
                
                setTimeout(() => {
                    element.classList.add('fade-in', 'visible');
                }, delay);
            }
        });

        // Check counters
        this.counters.forEach(counter => {
            const rect = counter.element.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                counter.animate();
            }
        });
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
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
    }
}

// Header Scroll Effect
class HeaderScrollEffect {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset > 50;
            
            if (scrolled) {
                this.header.style.background = 'rgba(10, 10, 10, 0.98)';
                this.header.style.backdropFilter = 'blur(20px)';
            } else {
                this.header.style.background = 'rgba(10, 10, 10, 0.95)';
                this.header.style.backdropFilter = 'blur(20px)';
            }
        });
    }
}

// Mobile Menu
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.menu = document.querySelector('.nav-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => {
                this.toggleMenu();
            });
        }
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.menu.classList.add('active');
            this.toggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            this.menu.classList.remove('active');
            this.toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Chart Animation (for case study section)
class ChartAnimation {
    constructor() {
        this.canvas = document.getElementById('efficiency-chart');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
            this.init();
        }
    }

    init() {
        this.resizeCanvas();
        this.drawChart();
        
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.drawChart();
        });
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }

    drawChart() {
        const width = this.canvas.width / window.devicePixelRatio;
        const height = this.canvas.height / window.devicePixelRatio;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw grid
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = (height / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
        
        // Draw efficiency line
        const data = [20, 25, 40, 60, 85, 100];
        const points = data.map((value, index) => ({
            x: (width / (data.length - 1)) * index,
            y: height - (height * value / 100)
        }));
        
        // Draw line
        this.ctx.strokeStyle = '#00d4ff';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);
        
        points.forEach((point, index) => {
            if (index > 0) {
                this.ctx.lineTo(point.x, point.y);
            }
        });
        
        this.ctx.stroke();
        
        // Draw points
        points.forEach(point => {
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = '#00d4ff';
            this.ctx.fill();
            
            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#00d4ff';
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.forms = document.querySelectorAll('form');
        this.init();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit(form);
            });
        });
    }

    handleSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        console.log('Form submitted:', data);
        
        // Show success message
        this.showMessage('Thank you! We\'ll get back to you soon.', 'success');
        form.reset();
    }

    showMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
    
    // Initialize other components
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    if (testimonialSlides.length > 0) {
        new TestimonialSlider();
    }
    new ScrollAnimations();
    new SmoothScroll();
    new HeaderScrollEffect();
    new MobileMenu();
    new ChartAnimation();
    new FormHandler();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Add CSS for slide in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload images and other assets
        const preloadImages = [];
        // Add any image URLs here if needed
    });
}

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js');
    });
}