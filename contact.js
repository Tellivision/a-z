// Contact Page JavaScript

class ContactController {
    constructor() {
        this.form = null;
        this.chatWidget = null;
        this.isFormSubmitting = false;
        this.chatMessages = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupFormValidation();
        this.setupChatWidget();
        this.setupFAQ();
        this.observeElements();
    }

    setupEventListeners() {
        // Form submission
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Real-time form validation
        document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
            field.addEventListener('blur', (e) => this.validateField(e.target));
            field.addEventListener('input', (e) => this.clearFieldError(e.target));
        });

        // Chat widget triggers
        document.querySelectorAll('.chat-trigger').forEach(trigger => {
            trigger.addEventListener('click', () => this.openChat());
        });

        // Chat widget controls
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');

        if (chatClose) chatClose.addEventListener('click', () => this.closeChat());
        if (chatSend) chatSend.addEventListener('click', () => this.sendChatMessage());
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendChatMessage();
            });
        }

        // FAQ toggles
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', (e) => this.toggleFAQ(e));
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });
    }

    initializeAnimations() {
        // Floating elements animation
        this.animateFloatingElements();
        
        // Hero text animation
        this.animateHeroText();
        
        // Stagger method cards animation
        this.animateMethodCards();
    }

    animateFloatingElements() {
        const elements = document.querySelectorAll('.contact-hero .element');
        
        elements.forEach((element, index) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 6 + Math.random() * 4;
            
            element.style.animationDelay = `${randomDelay}s`;
            element.style.animationDuration = `${randomDuration}s`;
            
            // Add random movement
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 15;
                const randomY = (Math.random() - 0.5) * 15;
                element.style.transform += ` translate(${randomX}px, ${randomY}px)`;
            }, 4000 + index * 1000);
        });
    }

    animateHeroText() {
        const titleLines = document.querySelectorAll('.contact-hero .title-line');
        const subtitle = document.querySelector('.contact-hero .hero-subtitle');
        const features = document.querySelector('.hero-features');
        
        // Stagger animation for title lines
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Animate subtitle and features
        setTimeout(() => {
            if (subtitle) {
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }
        }, 400);
        
        setTimeout(() => {
            if (features) {
                features.style.opacity = '1';
                features.style.transform = 'translateY(0)';
            }
        }, 600);
    }

    animateMethodCards() {
        const cards = document.querySelectorAll('.method-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        });
    }

    setupFormValidation() {
        this.validationRules = {
            firstName: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Please enter a valid first name (letters only, minimum 2 characters)'
            },
            lastName: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Please enter a valid last name (letters only, minimum 2 characters)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            company: {
                required: true,
                minLength: 2,
                message: 'Please enter your company name'
            },
            phone: {
                required: false,
                pattern: /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/,
                message: 'Please enter a valid phone number'
            },
            projectType: {
                required: true,
                message: 'Please select a project type'
            },
            message: {
                required: true,
                minLength: 20,
                message: 'Please provide a detailed project description (minimum 20 characters)'
            },
            privacy: {
                required: true,
                message: 'You must agree to the Privacy Policy and Terms of Service'
            }
        };
    }

    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[fieldName];
        
        if (!rules) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
        }
        
        // Checkbox validation
        if (field.type === 'checkbox' && rules.required && !field.checked) {
            isValid = false;
            errorMessage = rules.message;
        }
        
        // Length validation
        if (isValid && rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = rules.message;
        }
        
        // Pattern validation
        if (isValid && rules.pattern && value && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }
        
        this.showFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }

    validateForm() {
        let isFormValid = true;
        
        // Validate all fields
        Object.keys(this.validationRules).forEach(fieldName => {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (field) {
                const isFieldValid = this.validateField(field);
                if (!isFieldValid) isFormValid = false;
            }
        });
        
        return isFormValid;
    }

    showFieldError(field, message) {
        const errorElement = field.parentNode.querySelector('.form-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.toggle('visible', !!message);
        }
        
        // Add/remove error styling
        field.classList.toggle('error', !!message);
    }

    clearFieldError(field) {
        this.showFieldError(field, '');
    }

    getFieldLabel(fieldName) {
        const labelMap = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email Address',
            company: 'Company Name',
            phone: 'Phone Number',
            projectType: 'Project Type',
            message: 'Project Description',
            privacy: 'Privacy Agreement'
        };
        return labelMap[fieldName] || fieldName;
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        if (this.isFormSubmitting) return;
        
        // Validate form
        if (!this.validateForm()) {
            this.showFormMessage('Please correct the errors above.', 'error');
            return;
        }
        
        this.isFormSubmitting = true;
        const submitBtn = this.form.querySelector('.submit-btn');
        submitBtn.classList.add('loading');
        
        try {
            // Collect form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call
            await this.submitFormData(data);
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            this.form.reset();
            
            // Track conversion
            this.trackConversion('form_submission', data);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormMessage('There was an error sending your message. Please try again.', 'error');
        } finally {
            this.isFormSubmitting = false;
            submitBtn.classList.remove('loading');
        }
    }

    async submitFormData(data) {
        // In a real application, this would send data to your backend
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data submitted:', data);
                resolve({ success: true });
            }, 2000);
        });
    }

    showSuccessMessage() {
        const successElement = document.getElementById('formSuccess');
        if (successElement) {
            successElement.classList.add('visible');
            
            // Hide form
            this.form.style.display = 'none';
            
            // Scroll to success message
            successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    showFormMessage(message, type = 'info') {
        // Create or update message element
        let messageEl = this.form.querySelector('.form-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            this.form.insertBefore(messageEl, this.form.firstChild);
        }
        
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }

    setupChatWidget() {
        this.chatWidget = document.getElementById('chatWidget');
        this.chatMessages = [
            {
                type: 'bot',
                message: "Hi! I'm here to help you learn more about our AI solutions. What can I assist you with today?"
            }
        ];
        
        // Predefined responses
        this.chatResponses = {
            'pricing': "Our pricing varies based on project complexity and requirements. I'd recommend scheduling a free consultation to get a personalized quote. Would you like me to help you book a call?",
            'services': "We offer a wide range of AI services including Machine Learning, Computer Vision, Natural Language Processing, Predictive Analytics, and Process Automation. Which area interests you most?",
            'timeline': "Project timelines typically range from 3-6 months depending on complexity. During our consultation, we'll provide a detailed timeline for your specific project.",
            'consultation': "Great! Our free consultation includes project assessment, feasibility analysis, technology recommendations, and a preliminary roadmap. You can book a call using the form on this page.",
            'experience': "We have over 10 years of AI expertise and have successfully delivered projects for Fortune 500 companies across healthcare, finance, retail, and manufacturing sectors.",
            'support': "Yes, we provide comprehensive support including maintenance, updates, monitoring, and continuous optimization to ensure your AI solution performs optimally."
        };
    }

    openChat() {
        if (this.chatWidget) {
            this.chatWidget.classList.add('active');
            const chatInput = document.getElementById('chatInput');
            if (chatInput) chatInput.focus();
        }
    }

    closeChat() {
        if (this.chatWidget) {
            this.chatWidget.classList.remove('active');
        }
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addChatMessage('user', message);
        chatInput.value = '';
        
        // Generate bot response
        setTimeout(() => {
            const response = this.generateBotResponse(message);
            this.addChatMessage('bot', response);
        }, 1000);
    }

    addChatMessage(type, message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'bot' ? '🤖' : '👤';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = `<p>${message}</p>`;
        
        messageEl.appendChild(avatar);
        messageEl.appendChild(content);
        chatMessages.appendChild(messageEl);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add to messages array
        this.chatMessages.push({ type, message });
    }

    generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for keywords and return appropriate response
        for (const [keyword, response] of Object.entries(this.chatResponses)) {
            if (message.includes(keyword)) {
                return response;
            }
        }
        
        // Default responses based on common patterns
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! I'm here to help you with any questions about our AI services. What would you like to know?";
        }
        
        if (message.includes('help')) {
            return "I can help you with information about our services, pricing, timelines, and more. What specific area would you like to know about?";
        }
        
        if (message.includes('contact') || message.includes('call')) {
            return "You can reach us by filling out the contact form on this page, calling +1 (555) 123-4567, or booking a free consultation. What works best for you?";
        }
        
        // Generic response
        return "That's a great question! For detailed information about that topic, I'd recommend speaking with one of our AI specialists. Would you like to schedule a free consultation?";
    }

    setupFAQ() {
        // Initialize FAQ state
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    toggleFAQ(e) {
        const faqItem = e.currentTarget.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }

    handleSmoothScroll(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
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
                    
                    // Special handling for different sections
                    if (entry.target.classList.contains('contact-methods')) {
                        this.animateMethodCards();
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections for animation
        document.querySelectorAll('.contact-methods, .contact-form-section, .faq-section, .cta-section').forEach(el => {
            observer.observe(el);
        });
    }

    trackConversion(event, data) {
        // Track conversion events (integrate with your analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                event_category: 'contact',
                event_label: data.projectType || 'unknown',
                value: 1
            });
        }
        
        console.log('Conversion tracked:', event, data);
    }
}

// Performance optimizations
class ContactPerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.setupLazyLoading();
        this.preloadCriticalResources();
        this.setupServiceWorker();
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
            { href: 'contact.css', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        // Register service worker for caching (if available)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }
}

// Custom CSS animations
const customAnimations = `
    @keyframes slideInFromBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes bounceIn {
        0% {
            opacity: 0;
            transform: scale(0.3);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(0, 212, 255, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(0, 212, 255, 0);
        }
    }
    
    .animate-in {
        animation: slideInFromBottom 0.6s ease-out forwards;
    }
    
    .bounce-in {
        animation: bounceIn 0.6s ease-out forwards;
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .form-message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-weight: 500;
    }
    
    .form-message.error {
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #ef4444;
    }
    
    .form-message.success {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #10b981;
    }
`;

// Inject custom animations
const styleSheet = document.createElement('style');
styleSheet.textContent = customAnimations;
document.head.appendChild(styleSheet);

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
    new ContactController();
    new ContactPerformanceOptimizer();
    handleLoadingState();
    
    console.log('Contact page initialized successfully');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactController, ContactPerformanceOptimizer };
}