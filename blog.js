// Blog Page JavaScript

class BlogController {
    constructor() {
        this.articles = [];
        this.filteredArticles = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.articlesPerPage = 6;
        this.currentPage = 1;
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.loadArticles();
        this.setupIntersectionObserver();
        this.animateCounters();
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.handleSearch(e);
                }
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreArticles());
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
        }

        // Article links
        document.addEventListener('click', (e) => {
            if (e.target.matches('.read-link, .read-more-btn')) {
                e.preventDefault();
                this.handleArticleClick(e.target);
            }
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
        
        // Stagger article cards animation
        this.animateArticleCards();
    }

    animateFloatingElements() {
        const elements = document.querySelectorAll('.blog-hero .element');
        
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
            }, 5000 + index * 1000);
        });
    }

    animateHeroText() {
        const titleLines = document.querySelectorAll('.blog-hero .title-line');
        const subtitle = document.querySelector('.blog-hero .hero-subtitle');
        const stats = document.querySelector('.blog-hero .hero-stats');
        
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

    animateArticleCards() {
        const cards = document.querySelectorAll('.article-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }

    loadArticles() {
        // In a real application, this would fetch from an API
        this.articles = this.getArticleData();
        this.filteredArticles = [...this.articles];
        this.renderArticles();
    }

    getArticleData() {
        // Mock article data - in production, this would come from an API
        return [
            {
                id: 1,
                title: "Deep Learning Architectures: A Comprehensive Guide to Neural Networks",
                excerpt: "Dive deep into the latest neural network architectures and understand how they're reshaping the landscape of artificial intelligence applications.",
                category: "machine-learning",
                author: "Alex Chen",
                readTime: "6 min read",
                publishDate: "Dec 12, 2024",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001122;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23002244;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='url(%23grad2)'/%3E%3Cg stroke='%2300d4ff' stroke-width='1.5' fill='none' opacity='0.4'%3E%3Ccircle cx='100' cy='80' r='20'/%3E%3Ccircle cx='300' cy='170' r='15'/%3E%3Cpath d='M50,125 Q200,50 350,200'/%3E%3C/g%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%2300d4ff' font-family='Arial' font-size='14'%3EML Article%3C/text%3E%3C/svg%3E",
                featured: false
            },
            {
                id: 2,
                title: "RPA vs. Intelligent Automation: Choosing the Right Path for Your Business",
                excerpt: "Compare traditional RPA with AI-powered intelligent automation and discover which approach delivers the best ROI for different business scenarios.",
                category: "automation",
                author: "Sarah Johnson",
                readTime: "5 min read",
                publishDate: "Dec 10, 2024",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001122;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23002244;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='url(%23grad3)'/%3E%3Cg stroke='%2310b981' stroke-width='1.5' fill='none' opacity='0.4'%3E%3Crect x='100' y='80' width='40' height='40'/%3E%3Crect x='260' y='130' width='30' height='30'/%3E%3Cpath d='M80,100 L360,150'/%3E%3C/g%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%2310b981' font-family='Arial' font-size='14'%3EAutomation%3C/text%3E%3C/svg%3E",
                featured: false
            },
            {
                id: 3,
                title: "Healthcare AI: Transforming Patient Care Through Predictive Analytics",
                excerpt: "Explore how AI-powered predictive analytics is revolutionizing healthcare delivery, improving patient outcomes, and reducing operational costs.",
                category: "industry-insights",
                author: "Dr. Michael Brown",
                readTime: "7 min read",
                publishDate: "Dec 8, 2024",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001122;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23002244;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='url(%23grad4)'/%3E%3Cg stroke='%23a855f7' stroke-width='1.5' fill='none' opacity='0.4'%3E%3Cpolygon points='200,60 240,120 160,120'/%3E%3Cpolygon points='200,190 240,130 160,130'/%3E%3C/g%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%23a855f7' font-family='Arial' font-size='14'%3EInsights%3C/text%3E%3C/svg%3E",
                featured: false
            },
            {
                id: 4,
                title: "Quantum Computing Meets AI: The Next Frontier in Computational Power",
                excerpt: "Discover how quantum computing is set to supercharge AI capabilities and what this convergence means for solving previously impossible problems.",
                category: "ai-innovation",
                author: "Dr. Lisa Wang",
                readTime: "9 min read",
                publishDate: "Dec 5, 2024",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001122;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23002244;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='url(%23grad5)'/%3E%3Cg stroke='%2300d4ff' stroke-width='1.5' fill='none' opacity='0.4'%3E%3Ccircle cx='150' cy='100' r='25'/%3E%3Ccircle cx='250' cy='150' r='20'/%3E%3Cpath d='M100,80 Q200,120 300,100'/%3E%3C/g%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%2300d4ff' font-family='Arial' font-size='14'%3EInnovation%3C/text%3E%3C/svg%3E",
                featured: false
            },
            {
                id: 5,
                title: "Building Your First Computer Vision Model: A Step-by-Step Guide",
                excerpt: "Learn how to create a computer vision model from scratch using Python and TensorFlow, complete with code examples and best practices.",
                category: "tutorials",
                author: "David Kim",
                readTime: "12 min read",
                publishDate: "Dec 3, 2024",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001122;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23002244;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='url(%23grad6)'/%3E%3Cg stroke='%23f59e0b' stroke-width='1.5' fill='none' opacity='0.4'%3E%3Crect x='120' y='80' width='50' height='30'/%3E%3Crect x='230' y='140' width='40' height='25'/%3E%3Cpath d='M100,95 L350,155'/%3E%3C/g%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%23f59e0b' font-family='Arial' font-size='14'%3ETutorial%3C/text%3E%3C/svg%3E",
                featured: false
            },
            {
                id: 6,
                title: "How Fortune 500 Company Reduced Costs by 40% with AI-Powered Automation",
                excerpt: "A detailed case study of how we helped a major corporation streamline their operations and achieve significant cost savings through intelligent automation.",
                category: "case-studies",
                author: "Emma Davis",
                readTime: "8 min read",
                publishDate: "Dec 1, 2024",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad7' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23001122;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23002244;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='url(%23grad7)'/%3E%3Cg stroke='%2310b981' stroke-width='1.5' fill='none' opacity='0.4'%3E%3Ccircle cx='130' cy='90' r='15'/%3E%3Ccircle cx='270' cy='160' r='12'/%3E%3Cpath d='M80,105 Q200,80 320,175'/%3E%3C/g%3E%3Ctext x='200' y='130' text-anchor='middle' fill='%2310b981' font-family='Arial' font-size='14'%3ECase Study%3C/text%3E%3C/svg%3E",
                featured: false
            }
        ];
    }

    handleFilterChange(e) {
        const filterBtn = e.target;
        const category = filterBtn.getAttribute('data-category');
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        filterBtn.classList.add('active');
        
        // Update current filter
        this.currentFilter = category;
        this.currentPage = 1;
        
        // Filter and render articles
        this.filterArticles();
        this.renderArticles();
        
        // Track filter usage
        this.trackEvent('filter_used', { category });
    }

    handleSearch(e) {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.currentPage = 1;
        
        // Filter and render articles
        this.filterArticles();
        this.renderArticles();
        
        // Track search usage
        if (this.searchQuery) {
            this.trackEvent('search_used', { query: this.searchQuery });
        }
    }

    filterArticles() {
        this.filteredArticles = this.articles.filter(article => {
            // Category filter
            const categoryMatch = this.currentFilter === 'all' || article.category === this.currentFilter;
            
            // Search filter
            const searchMatch = !this.searchQuery || 
                article.title.toLowerCase().includes(this.searchQuery) ||
                article.excerpt.toLowerCase().includes(this.searchQuery) ||
                article.author.toLowerCase().includes(this.searchQuery) ||
                article.category.toLowerCase().includes(this.searchQuery);
            
            return categoryMatch && searchMatch;
        });
    }

    renderArticles() {
        const articlesGrid = document.getElementById('articlesGrid');
        if (!articlesGrid) return;
        
        // Clear existing articles
        articlesGrid.innerHTML = '';
        
        // Calculate articles to show
        const startIndex = 0;
        const endIndex = this.currentPage * this.articlesPerPage;
        const articlesToShow = this.filteredArticles.slice(startIndex, endIndex);
        
        // Render articles
        articlesToShow.forEach((article, index) => {
            const articleElement = this.createArticleElement(article, index);
            articlesGrid.appendChild(articleElement);
        });
        
        // Update load more button
        this.updateLoadMoreButton();
        
        // Animate new articles
        setTimeout(() => {
            this.animateNewArticles();
        }, 100);
        
        // Show no results message if needed
        if (articlesToShow.length === 0) {
            this.showNoResultsMessage();
        }
    }

    createArticleElement(article, index) {
        const articleEl = document.createElement('article');
        articleEl.className = 'article-card';
        articleEl.setAttribute('data-category', article.category);
        articleEl.style.animationDelay = `${index * 0.1}s`;
        
        const categoryName = this.getCategoryDisplayName(article.category);
        
        articleEl.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <div class="article-category">${categoryName}</div>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="read-time">${article.readTime}</span>
                    <span class="publish-date">${article.publishDate}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-footer">
                    <div class="author-mini">
                        <span class="author-name">${article.author}</span>
                    </div>
                    <a href="#" class="read-link" data-article-id="${article.id}">Read More</a>
                </div>
            </div>
        `;
        
        return articleEl;
    }

    getCategoryDisplayName(category) {
        const categoryMap = {
            'ai-innovation': 'AI Innovation',
            'machine-learning': 'Machine Learning',
            'automation': 'Automation',
            'industry-insights': 'Industry Insights',
            'case-studies': 'Case Studies',
            'tutorials': 'Tutorials'
        };
        return categoryMap[category] || category;
    }

    animateNewArticles() {
        const cards = document.querySelectorAll('.article-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;
        
        const totalArticles = this.filteredArticles.length;
        const shownArticles = this.currentPage * this.articlesPerPage;
        
        if (shownArticles >= totalArticles) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
            const remainingArticles = totalArticles - shownArticles;
            loadMoreBtn.innerHTML = `
                Load More Articles (${remainingArticles} remaining)
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
            `;
        }
    }

    loadMoreArticles() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.currentPage++;
        
        // Show loading state
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = `
                <div class="loading-spinner"></div>
                Loading...
            `;
        }
        
        // Simulate loading delay
        setTimeout(() => {
            this.renderArticles();
            this.isLoading = false;
            
            // Track load more usage
            this.trackEvent('load_more_used', { page: this.currentPage });
        }, 800);
    }

    showNoResultsMessage() {
        const articlesGrid = document.getElementById('articlesGrid');
        if (!articlesGrid) return;
        
        const noResultsEl = document.createElement('div');
        noResultsEl.className = 'no-results';
        noResultsEl.innerHTML = `
            <div class="no-results-content">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                </svg>
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                <button class="clear-filters-btn" onclick="blogController.clearFilters()">Clear All Filters</button>
            </div>
        `;
        
        articlesGrid.appendChild(noResultsEl);
    }

    clearFilters() {
        // Reset filters
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.currentPage = 1;
        
        // Update UI
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-btn[data-category="all"]').classList.add('active');
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Re-render articles
        this.filterArticles();
        this.renderArticles();
    }

    handleArticleClick(link) {
        const articleId = link.getAttribute('data-article-id');
        const article = this.articles.find(a => a.id == articleId);
        
        if (article) {
            // Track article click
            this.trackEvent('article_clicked', {
                articleId: article.id,
                title: article.title,
                category: article.category
            });
            
            // In a real application, this would navigate to the article page
            console.log('Navigate to article:', article.title);
            
            // For demo purposes, show an alert
            alert(`This would navigate to the full article: "${article.title}"`);
        }
    }

    async handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('.subscribe-btn');
        const email = emailInput.value.trim();
        
        if (!email) {
            this.showFormMessage(form, 'Please enter your email address.', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.showFormMessage(form, 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = `
            <div class="loading-spinner"></div>
            Subscribing...
        `;
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await this.subscribeToNewsletter(email);
            
            // Show success message
            this.showFormMessage(form, 'Thank you for subscribing! Check your email for confirmation.', 'success');
            
            // Reset form
            form.reset();
            
            // Track subscription
            this.trackEvent('newsletter_subscribed', { email });
            
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            this.showFormMessage(form, 'There was an error subscribing. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = `
                Subscribe
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            `;
            submitBtn.disabled = false;
        }
    }

    async subscribeToNewsletter(email) {
        // In a real application, this would send data to your backend
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Newsletter subscription:', email);
                resolve({ success: true });
            }, 1500);
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFormMessage(form, message, type = 'info') {
        // Remove existing message
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Insert message
        form.insertBefore(messageEl, form.firstChild);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
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

    setupIntersectionObserver() {
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
        
        // Observe sections for animation
        document.querySelectorAll('.featured-article, .newsletter-section, .cta-section').forEach(el => {
            observer.observe(el);
        });
    }

    trackEvent(event, data) {
        // Track events (integrate with your analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                event_category: 'blog',
                event_label: data.category || data.query || 'unknown',
                value: 1
            });
        }
        
        console.log('Event tracked:', event, data);
    }
}

// Performance optimizations
class BlogPerformanceOptimizer {
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
            { href: 'blog.css', as: 'style' }
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
    
    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 4rem 2rem;
    }
    
    .no-results-content {
        max-width: 400px;
        margin: 0 auto;
    }
    
    .no-results svg {
        color: #666;
        margin-bottom: 1rem;
    }
    
    .no-results h3 {
        color: #ffffff;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
    }
    
    .no-results p {
        color: #888;
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    .clear-filters-btn {
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #00d4ff, #0099cc);
        color: #000;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .clear-filters-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
    }
    
    .form-message {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-weight: 500;
        text-align: center;
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

// Global variable for external access
let blogController;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    blogController = new BlogController();
    new BlogPerformanceOptimizer();
    handleLoadingState();
    
    console.log('Blog page initialized successfully');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BlogController, BlogPerformanceOptimizer };
}