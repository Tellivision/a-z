// Analytics and Conversion Tracking for A-Z AI Website

class AnalyticsManager {
    constructor() {
        this.config = {
            // Replace with your actual tracking IDs
            googleAnalyticsId: 'GA_MEASUREMENT_ID', // Replace with your GA4 measurement ID
            googleTagManagerId: 'GTM_CONTAINER_ID', // Replace with your GTM container ID
            facebookPixelId: 'FB_PIXEL_ID', // Replace with your Facebook Pixel ID
            linkedInPartnerId: 'LINKEDIN_PARTNER_ID' // Replace with your LinkedIn Partner ID
        };
        
        this.conversionGoals = {
            contactForm: 'contact_form_submission',
            bookCall: 'book_call_clicked',
            newsletterSignup: 'newsletter_signup',
            serviceInquiry: 'service_inquiry',
            caseStudyView: 'case_study_viewed',
            blogRead: 'blog_article_read'
        };
        
        this.init();
    }

    init() {
        this.loadGoogleAnalytics();
        this.loadGoogleTagManager();
        this.setupConversionTracking();
        this.setupPerformanceTracking();
        this.setupUserBehaviorTracking();
        this.setupHeatmapTracking();
        this.trackPageLoad();
    }

    // Google Analytics 4 Setup
    loadGoogleAnalytics() {
        if (this.config.googleAnalyticsId === 'GA_MEASUREMENT_ID') {
            console.log('Google Analytics: Please replace GA_MEASUREMENT_ID with your actual measurement ID');
            return;
        }

        // Load gtag script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalyticsId}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', this.config.googleAnalyticsId, {
            // Enhanced ecommerce and conversion tracking
            send_page_view: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: true,
            // Custom parameters for AI agency tracking
            custom_map: {
                'custom_parameter_1': 'service_type',
                'custom_parameter_2': 'lead_source',
                'custom_parameter_3': 'engagement_level'
            }
        });

        console.log('Google Analytics 4 loaded successfully');
    }

    // Google Tag Manager Setup
    loadGoogleTagManager() {
        if (this.config.googleTagManagerId === 'GTM_CONTAINER_ID') {
            console.log('Google Tag Manager: Please replace GTM_CONTAINER_ID with your actual container ID');
            return;
        }

        // GTM script
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',this.config.googleTagManagerId);

        // GTM noscript fallback
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${this.config.googleTagManagerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);

        console.log('Google Tag Manager loaded successfully');
    }

    // Conversion Tracking Setup
    setupConversionTracking() {
        // Track contact form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'contactForm' || e.target.classList.contains('contact-form')) {
                this.trackConversion(this.conversionGoals.contactForm, {
                    event_category: 'form',
                    event_label: 'contact_form',
                    value: 100 // Assign a value to the conversion
                });
            }
            
            if (e.target.id === 'newsletterForm' || e.target.classList.contains('newsletter-form')) {
                this.trackConversion(this.conversionGoals.newsletterSignup, {
                    event_category: 'engagement',
                    event_label: 'newsletter',
                    value: 25
                });
            }
        });

        // Track CTA button clicks
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // Book a call buttons
            if (target.classList.contains('cta-primary') || 
                target.textContent.toLowerCase().includes('book a call') ||
                target.textContent.toLowerCase().includes('schedule consultation')) {
                this.trackConversion(this.conversionGoals.bookCall, {
                    event_category: 'cta',
                    event_label: 'book_call',
                    value: 200
                });
            }
            
            // Service inquiry buttons
            if (target.classList.contains('service-cta') || 
                target.closest('.service-card')) {
                this.trackConversion(this.conversionGoals.serviceInquiry, {
                    event_category: 'service',
                    event_label: 'service_inquiry',
                    value: 150
                });
            }
            
            // Case study views
            if (target.classList.contains('case-study-link') || 
                target.closest('.case-study-card')) {
                this.trackConversion(this.conversionGoals.caseStudyView, {
                    event_category: 'content',
                    event_label: 'case_study',
                    value: 50
                });
            }
        });
    }

    // Performance Tracking
    setupPerformanceTracking() {
        // Core Web Vitals tracking
        if ('web-vitals' in window) {
            // If you include the web-vitals library
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(this.sendToAnalytics.bind(this));
                getFID(this.sendToAnalytics.bind(this));
                getFCP(this.sendToAnalytics.bind(this));
                getLCP(this.sendToAnalytics.bind(this));
                getTTFB(this.sendToAnalytics.bind(this));
            });
        } else {
            // Manual performance tracking
            this.trackManualPerformance();
        }

        // Track page load time
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    this.trackEvent('page_performance', {
                        event_category: 'performance',
                        page_load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                        dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                        first_paint: this.getFirstPaint()
                    });
                }
            }, 0);
        });
    }

    trackManualPerformance() {
        // Track First Contentful Paint
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    this.trackEvent('core_web_vital', {
                        event_category: 'performance',
                        metric_name: 'FCP',
                        metric_value: Math.round(entry.startTime),
                        metric_rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs_improvement' : 'poor'
                    });
                }
            }
        });
        
        observer.observe({ entryTypes: ['paint'] });
    }

    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? Math.round(firstPaint.startTime) : null;
    }

    // User Behavior Tracking
    setupUserBehaviorTracking() {
        // Scroll depth tracking
        let maxScroll = 0;
        const scrollMilestones = [25, 50, 75, 90, 100];
        const trackedMilestones = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                scrollMilestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
                        trackedMilestones.add(milestone);
                        this.trackEvent('scroll_depth', {
                            event_category: 'engagement',
                            event_label: `${milestone}%`,
                            value: milestone
                        });
                    }
                });
            }
        });

        // Time on page tracking
        let startTime = Date.now();
        let isActive = true;
        
        // Track when user becomes inactive
        ['blur', 'visibilitychange'].forEach(event => {
            document.addEventListener(event, () => {
                if (document.hidden || document.visibilityState === 'hidden') {
                    isActive = false;
                } else {
                    isActive = true;
                    startTime = Date.now(); // Reset timer when user returns
                }
            });
        });

        // Track time milestones
        const timeMilestones = [30, 60, 120, 300]; // seconds
        timeMilestones.forEach(seconds => {
            setTimeout(() => {
                if (isActive) {
                    this.trackEvent('time_on_page', {
                        event_category: 'engagement',
                        event_label: `${seconds}s`,
                        value: seconds
                    });
                }
            }, seconds * 1000);
        });

        // Track exit intent (mouse leaving viewport)
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0) {
                this.trackEvent('exit_intent', {
                    event_category: 'behavior',
                    event_label: 'mouse_exit'
                });
            }
        });
    }

    // Heatmap and Session Recording (Hotjar/Microsoft Clarity)
    setupHeatmapTracking() {
        // Microsoft Clarity (free alternative to Hotjar)
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "CLARITY_PROJECT_ID"); // Replace with your Clarity project ID

        console.log('Heatmap tracking setup (replace CLARITY_PROJECT_ID with actual ID)');
    }

    // Track specific conversion events
    trackConversion(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: parameters.event_category || 'conversion',
                event_label: parameters.event_label || '',
                value: parameters.value || 0,
                currency: 'USD',
                ...parameters
            });
        }

        // Google Tag Manager
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: eventName,
                event_category: parameters.event_category || 'conversion',
                event_label: parameters.event_label || '',
                value: parameters.value || 0,
                ...parameters
            });
        }

        // Facebook Pixel (if loaded)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: eventName,
                value: parameters.value || 0,
                currency: 'USD'
            });
        }

        console.log('Conversion tracked:', eventName, parameters);
    }

    // Track general events
    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }

        // Google Tag Manager
        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: eventName,
                ...parameters
            });
        }

        console.log('Event tracked:', eventName, parameters);
    }

    // Track page views (for SPA navigation)
    trackPageView(pagePath, pageTitle) {
        if (typeof gtag !== 'undefined') {
            gtag('config', this.config.googleAnalyticsId, {
                page_path: pagePath,
                page_title: pageTitle
            });
        }

        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                event: 'page_view',
                page_path: pagePath,
                page_title: pageTitle
            });
        }
    }

    // Send performance data to analytics
    sendToAnalytics(metric) {
        this.trackEvent('core_web_vital', {
            event_category: 'performance',
            metric_name: metric.name,
            metric_value: Math.round(metric.value),
            metric_id: metric.id,
            metric_rating: metric.rating
        });
    }

    // Track initial page load
    trackPageLoad() {
        const pageData = {
            page_path: window.location.pathname,
            page_title: document.title,
            page_referrer: document.referrer,
            user_agent: navigator.userAgent,
            screen_resolution: `${screen.width}x${screen.height}`,
            viewport_size: `${window.innerWidth}x${window.innerHeight}`
        };

        this.trackEvent('page_load', {
            event_category: 'navigation',
            ...pageData
        });
    }

    // A/B Testing Support
    setupABTesting() {
        // Simple A/B testing framework
        const experiments = {
            'hero_cta_text': {
                variants: ['Book a Call', 'Schedule Consultation', 'Get Started'],
                element: '.cta-primary'
            },
            'hero_headline': {
                variants: [
                    'From A to Z, We Build the Future of AI',
                    'Transform Your Business with AI Solutions',
                    'AI-Powered Solutions for Modern Businesses'
                ],
                element: '.hero-title'
            }
        };

        Object.keys(experiments).forEach(experimentName => {
            const experiment = experiments[experimentName];
            const variantIndex = Math.floor(Math.random() * experiment.variants.length);
            const variant = experiment.variants[variantIndex];
            
            // Apply variant
            const element = document.querySelector(experiment.element);
            if (element) {
                element.textContent = variant;
                
                // Track experiment participation
                this.trackEvent('ab_test_view', {
                    event_category: 'experiment',
                    experiment_name: experimentName,
                    variant_name: `variant_${variantIndex}`,
                    variant_text: variant
                });
            }
        });
    }

    // Lead Scoring
    calculateLeadScore() {
        let score = 0;
        const actions = JSON.parse(localStorage.getItem('userActions') || '[]');
        
        actions.forEach(action => {
            switch(action.type) {
                case 'page_view':
                    score += 1;
                    break;
                case 'service_inquiry':
                    score += 10;
                    break;
                case 'contact_form':
                    score += 25;
                    break;
                case 'book_call':
                    score += 50;
                    break;
                case 'case_study_view':
                    score += 5;
                    break;
                default:
                    score += 1;
            }
        });
        
        // Track lead score
        this.trackEvent('lead_score_calculated', {
            event_category: 'lead_scoring',
            lead_score: score,
            actions_count: actions.length
        });
        
        return score;
    }
}

// Enhanced Error Tracking
class ErrorTracker {
    constructor(analyticsManager) {
        this.analytics = analyticsManager;
        this.init();
    }

    init() {
        // JavaScript errors
        window.addEventListener('error', (e) => {
            this.trackError('javascript_error', {
                error_message: e.message,
                error_filename: e.filename,
                error_line: e.lineno,
                error_column: e.colno,
                error_stack: e.error ? e.error.stack : 'No stack trace'
            });
        });

        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            this.trackError('unhandled_promise_rejection', {
                error_message: e.reason.toString(),
                error_stack: e.reason.stack || 'No stack trace'
            });
        });

        // Resource loading errors
        window.addEventListener('error', (e) => {
            if (e.target !== window) {
                this.trackError('resource_error', {
                    resource_type: e.target.tagName,
                    resource_source: e.target.src || e.target.href,
                    error_message: 'Failed to load resource'
                });
            }
        }, true);
    }

    trackError(errorType, errorData) {
        this.analytics.trackEvent('error_occurred', {
            event_category: 'error',
            error_type: errorType,
            ...errorData
        });

        console.error('Error tracked:', errorType, errorData);
    }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.analyticsManager = new AnalyticsManager();
    window.errorTracker = new ErrorTracker(window.analyticsManager);
    
    console.log('Analytics and tracking initialized successfully');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnalyticsManager, ErrorTracker };
}