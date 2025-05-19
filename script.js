document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Animated counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster

    const animateCounters = () => {
        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');
                
                // Calculate increment
                const inc = target / speed;
                
                // Check if target is reached
                if (count < target) {
                    // Round up and set counter value
                    counter.innerText = (count + inc) < target ? 
                                        Math.ceil(count + inc) : 
                                        target.toFixed(target % 1 === 0 ? 0 : 1);
                    // Call function every ms
                    setTimeout(animate, 1);
                }
            };
            
            animate();
        });
    };

    // Intersection Observer for counters
    const observeCounters = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('#stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    };
    
    observeCounters();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade-in animation for sections
    const fadeInElements = () => {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    };
    
    fadeInElements();

    // Add hover effect to command cards
    const commandCards = document.querySelectorAll('#commands .bg-black\\/40');
    commandCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('glow-border');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('glow-border');
        });
    });

    // Add accessibility improvements
    const improveAccessibility = () => {
        // Add aria-labels to icon-only links
        document.querySelectorAll('a').forEach(link => {
            if (link.textContent.trim() === '' && link.querySelector('i')) {
                const iconClass = link.querySelector('i').className;
                if (iconClass.includes('fa-github')) {
                    link.setAttribute('aria-label', 'GitHub Repository');
                } else if (iconClass.includes('fa-discord')) {
                    link.setAttribute('aria-label', 'Discord Server');
                }
            }
        });
        
        // Ensure all interactive elements are keyboard accessible
        document.querySelectorAll('button, a').forEach(element => {
            if (!element.getAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });
    };
    
    improveAccessibility();
});