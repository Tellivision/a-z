// Case Studies Page JavaScript

class CaseStudiesController {
    constructor() {
        this.currentFilter = 'all';
        this.testimonialIndex = 0;
        this.testimonials = [];
        this.caseStudies = [];
        this.modal = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupFilterSystem();
        this.setupModal();
        this.setupTestimonialSlider();
        this.animateCounters();
        this.observeElements();
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });

        // Case study cards
        document.querySelectorAll('.case-study-card').forEach(card => {
            card.addEventListener('click', (e) => this.openCaseModal(e));
        });

        // Modal close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || 
                e.target.classList.contains('case-modal')) {
                this.closeCaseModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
                this.closeCaseModal();
            }
        });

        // Testimonial controls
        document.querySelector('.prev-btn')?.addEventListener('click', () => this.prevTestimonial());
        document.querySelector('.next-btn')?.addEventListener('click', () => this.nextTestimonial());
        
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToTestimonial(index));
        });
    }

    initializeAnimations() {
        // Floating elements animation
        this.animateFloatingElements();
        
        // Hero text animation
        this.animateHeroText();
        
        // Stats animation on scroll
        this.setupScrollAnimations();
    }

    animateFloatingElements() {
        const elements = document.querySelectorAll('.case-studies-hero .element');
        
        elements.forEach((element, index) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 6 + Math.random() * 4;
            
            element.style.animationDelay = `${randomDelay}s`;
            element.style.animationDuration = `${randomDuration}s`;
            
            // Add random movement
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                element.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 1000);
        });
    }

    animateHeroText() {
        const titleLines = document.querySelectorAll('.case-studies-hero .title-line');
        const subtitle = document.querySelector('.case-studies-hero .hero-subtitle');
        const stats = document.querySelector('.hero-stats');
        
        // Stagger animation for title lines
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Animate subtitle and stats
        setTimeout(() => {
            if (subtitle) {
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }
        }, 400);
        
        setTimeout(() => {
            if (stats) {
                stats.style.opacity = '1';
                stats.style.transform = 'translateY(0)';
            }
        }, 600);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate case study cards with stagger
                    if (entry.target.classList.contains('case-studies-grid')) {
                        this.animateCaseCards();
                    }
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.case-studies-grid, .testimonials').forEach(el => {
            observer.observe(el);
        });
    }

    animateCaseCards() {
        const cards = document.querySelectorAll('.case-study-card');
        
        cards.forEach((card, index) => {
            if (this.isCardVisible(card)) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            }
        });
    }

    setupFilterSystem() {
        this.caseStudies = Array.from(document.querySelectorAll('.case-study-card'));
        
        // Set initial filter
        this.filterCases('all');
    }

    handleFilter(e) {
        const filterValue = e.target.dataset.filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Filter cases
        this.filterCases(filterValue);
    }

    filterCases(filter) {
        this.currentFilter = filter;
        
        this.caseStudies.forEach((card, index) => {
            const category = card.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                card.classList.remove('filtered-out');
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 50);
            } else {
                card.classList.add('filtered-out');
                card.classList.remove('visible');
            }
        });
    }

    isCardVisible(card) {
        return this.currentFilter === 'all' || card.dataset.category === this.currentFilter;
    }

    setupModal() {
        this.modal = document.querySelector('.case-modal');
        
        if (!this.modal) {
            console.warn('Case modal not found');
            return;
        }
    }

    openCaseModal(e) {
        const card = e.currentTarget;
        const caseId = card.dataset.caseId;
        
        if (!caseId || !this.modal) return;
        
        // Get case data
        const caseData = this.getCaseData(caseId);
        
        if (caseData) {
            this.populateModal(caseData);
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management for accessibility
            const closeBtn = this.modal.querySelector('.modal-close');
            if (closeBtn) closeBtn.focus();
        }
    }

    closeCaseModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    getCaseData(caseId) {
        // In a real application, this would fetch from an API
        const caseDatabase = {
            'healthcare-ai': {
                category: 'Healthcare',
                title: 'AI-Powered Diagnostic System',
                subtitle: 'Revolutionizing medical diagnosis with machine learning',
                challenge: 'A leading hospital network needed to reduce diagnostic errors and improve patient outcomes while managing increasing patient volumes.',
                solution: 'We developed an AI-powered diagnostic system that analyzes medical images, patient history, and symptoms to provide accurate diagnostic recommendations.',
                features: [
                    'Deep learning image analysis for X-rays, MRIs, and CT scans',
                    'Natural language processing for patient history analysis',
                    'Real-time diagnostic recommendations',
                    'Integration with existing hospital management systems',
                    'Continuous learning from new cases'
                ],
                results: {
                    'Diagnostic Accuracy': '94%',
                    'Time Reduction': '60%',
                    'Patient Satisfaction': '89%',
                    'Cost Savings': '$2.3M'
                },
                technologies: ['TensorFlow', 'PyTorch', 'OpenCV', 'FHIR', 'React', 'Node.js']
            },
            'finance-fraud': {
                category: 'Finance',
                title: 'Real-time Fraud Detection',
                subtitle: 'Advanced ML algorithms protecting financial transactions',
                challenge: 'A major bank was losing millions to sophisticated fraud schemes that traditional rule-based systems couldn\'t detect.',
                solution: 'We implemented a real-time fraud detection system using ensemble machine learning models and behavioral analysis.',
                features: [
                    'Real-time transaction monitoring',
                    'Behavioral pattern analysis',
                    'Ensemble ML models for high accuracy',
                    'Adaptive learning from new fraud patterns',
                    'Low false positive rates'
                ],
                results: {
                    'Fraud Detection': '99.2%',
                    'False Positives': '0.1%',
                    'Processing Speed': '<100ms',
                    'Annual Savings': '$15M'
                },
                technologies: ['Scikit-learn', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes']
            },
            'retail-personalization': {
                category: 'Retail',
                title: 'Personalized Shopping Experience',
                subtitle: 'AI-driven recommendations increasing customer engagement',
                challenge: 'An e-commerce giant wanted to improve customer experience and increase sales through personalized product recommendations.',
                solution: 'We built a comprehensive personalization engine that analyzes customer behavior, preferences, and market trends.',
                features: [
                    'Real-time recommendation engine',
                    'Customer behavior analysis',
                    'Dynamic pricing optimization',
                    'Inventory management integration',
                    'A/B testing framework'
                ],
                results: {
                    'Conversion Rate': '+35%',
                    'Average Order Value': '+28%',
                    'Customer Retention': '+42%',
                    'Revenue Increase': '$50M'
                },
                technologies: ['Apache Spark', 'MLflow', 'AWS SageMaker', 'React Native', 'GraphQL']
            }
        };
        
        return caseDatabase[caseId] || null;
    }

    populateModal(caseData) {
        if (!this.modal) return;
        
        // Update modal content
        const categoryEl = this.modal.querySelector('.modal-category');
        const titleEl = this.modal.querySelector('.modal-title');
        const subtitleEl = this.modal.querySelector('.modal-subtitle');
        
        if (categoryEl) categoryEl.textContent = caseData.category;
        if (titleEl) titleEl.textContent = caseData.title;
        if (subtitleEl) subtitleEl.textContent = caseData.subtitle;
        
        // Update challenge, solution, results sections
        this.updateModalSection('challenge', caseData.challenge);
        this.updateModalSection('solution', caseData.solution);
        this.updateModalFeatures(caseData.features);
        this.updateModalResults(caseData.results);
        this.updateModalTechnologies(caseData.technologies);
    }

    updateModalSection(sectionId, content) {
        const section = this.modal.querySelector(`[data-section="${sectionId}"]`);
        if (section) {
            section.textContent = content;
        }
    }

    updateModalFeatures(features) {
        const featuresList = this.modal.querySelector('.solution-features');
        if (featuresList && features) {
            featuresList.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');
        }
    }

    updateModalResults(results) {
        const resultsContainer = this.modal.querySelector('.results-metrics');
        if (resultsContainer && results) {
            resultsContainer.innerHTML = Object.entries(results)
                .map(([label, value]) => `
                    <div class="metric">
                        <span class="metric-value">${value}</span>
                        <span class="metric-label">${label}</span>
                    </div>
                `).join('');
        }
    }

    updateModalTechnologies(technologies) {
        const techContainer = this.modal.querySelector('.tech-stack');
        if (techContainer && technologies) {
            techContainer.innerHTML = technologies
                .map(tech => `<span class="tech-tag">${tech}</span>`)
                .join('');
        }
    }

    setupTestimonialSlider() {
        this.testimonials = document.querySelectorAll('.testimonial-slide');
        
        if (this.testimonials.length === 0) return;
        
        // Auto-advance testimonials
        setInterval(() => {
            this.nextTestimonial();
        }, 5000);
        
        // Initialize first testimonial
        this.showTestimonial(0);
    }

    showTestimonial(index) {
        this.testimonials.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        this.testimonialIndex = index;
    }

    nextTestimonial() {
        const nextIndex = (this.testimonialIndex + 1) % this.testimonials.length;
        this.showTestimonial(nextIndex);
    }

    prevTestimonial() {
        const prevIndex = (this.testimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
        this.showTestimonial(prevIndex);
    }

    goToTestimonial(index) {
        this.showTestimonial(index);
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with suffix
            const suffix = element.textContent.replace(/[0-9]/g, '');
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.case-filter, .testimonials').forEach(el => {
            observer.observe(el);
        });
    }
}

// Performance optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.setupLazyLoading();
        this.preloadCriticalResources();
    }

    optimizeImages() {
        // Add loading="lazy" to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadCriticalResources() {
        // Preload critical CSS and fonts
        const criticalResources = [
            { href: 'styles.css', as: 'style' },
            { href: 'case-studies.css', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }
}

// Custom CSS animations
const customAnimations = `
    @keyframes slideInFromLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInFromRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .slide-in-left {
        animation: slideInFromLeft 0.6s ease-out forwards;
    }
    
    .slide-in-right {
        animation: slideInFromRight 0.6s ease-out forwards;
    }
    
    .scale-in {
        animation: scaleIn 0.4s ease-out forwards;
    }
`;

// Inject custom animations
const styleSheet = document.createElement('style');
styleSheet.textContent = customAnimations;
document.head.appendChild(styleSheet);

// Smooth scroll behavior
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Loading state management
function handleLoadingState() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove loading indicators
        document.querySelectorAll('.loading').forEach(el => {
            el.classList.remove('loading');
        });
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CaseStudiesController();
    new PerformanceOptimizer();
    initSmoothScroll();
    handleLoadingState();
    
    console.log('Case Studies page initialized successfully');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CaseStudiesController, PerformanceOptimizer };
}