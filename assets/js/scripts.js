// ===================================
// Modern Portfolio JavaScript
// Version 2.0
// ===================================

// Note: ERR_BLOCKED_BY_CLIENT errors in console are from ad blockers/privacy extensions
// blocking YouTube tracking/analytics. This is normal and doesn't affect functionality.

(function() {
    'use strict';

    // ===================================
    // Theme Toggle (Dark/Light Mode)
    // ===================================
    
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to system preference
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // Set theme
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };
    
    // Initialize theme
    setTheme(getPreferredTheme());
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty anchors
            if (href === '#' || href === '#home-content') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Navbar Scroll Effect
    // ===================================
    
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 10) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // ===================================
    // Scroll to Top Button
    // ===================================
    
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // Scroll Reveal Animation
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollReveal = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(scrollReveal, observerOptions);
    
    // Observe elements for scroll reveal
    const revealElements = document.querySelectorAll(
        '.section-header, .hero-content, .about-content, .skill-category, ' +
        '.timeline-item, .experience-card, .project-card, .blog-card, ' +
        '.contact-card, .video-card'
    );
    
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // ===================================
    // Active Navigation Link
    // ===================================
    
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const highlightNavigation = () => {
        const scrollPosition = window.pageYOffset + 100;
        
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
    };
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Run on load

    // ===================================
    // Form Submission
    // ===================================
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let Formspree handle the submission
            // You can add custom validation or loading state here if needed
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Re-enable after 3 seconds (form will submit via Formspree)
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // ===================================
    // Typing Effect for Hero Title
    // ===================================
    
    const typingElement = document.querySelector('.gradient-text');
    
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let charIndex = 0;
        
        const typeChar = () => {
            if (charIndex < text.length) {
                typingElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeChar, 500);
    }

    // ===================================
    // Lazy Loading Images
    // ===================================
    
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ===================================
    // Number Counter Animation
    // ===================================
    
    const counters = document.querySelectorAll('.stat-value');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ===================================
    // Preloader (Optional)
    // ===================================
    
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Remove any preloader if exists
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // ===================================
    // Prevent Default Behavior for Empty Links
    // ===================================
    
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // ===================================
    // Console Welcome Message
    // ===================================
    
    console.log(
        '%c👨‍💻 Welcome to Jainish Shah\'s Portfolio! %c\n\n' +
        'Interested in the code? Check it out on GitHub:\n' +
        'https://github.com/jainishshah17',
        'font-size: 16px; font-weight: bold; color: #6366f1;',
        'font-size: 12px; color: #6c757d;'
    );

    // ===================================
    // Performance Monitoring (Development)
    // ===================================
    
    if (window.performance && console.table) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;
        
        console.log('⚡ Performance Metrics:');
        console.table({
            'Page Load Time': `${pageLoadTime}ms`,
            'Connect Time': `${connectTime}ms`,
            'Render Time': `${renderTime}ms`
        });
    }

})();
