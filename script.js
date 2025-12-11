/* ================================================================
   BITE-LINE - Smooth Interactions & Animations
   Elegant, performant, accessible
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ================================================================
       CUSTOM CURSOR - Elegant & subtle
       ================================================================ */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    // Only enable custom cursor on devices with fine pointers (not touch)
    if (window.matchMedia('(pointer: fine)').matches && cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Smooth follow with easing
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            followerX += (mouseX - followerX) * 0.08;
            followerY += (mouseY - followerY) * 0.08;

            cursor.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px)`;
            cursorFollower.style.transform = `translate(${followerX - 3}px, ${followerY - 3}px)`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .feature-card, .gallery-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(1.5)';
                cursor.style.borderColor = 'var(--accent-green)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                cursor.style.borderColor = '';
            });
        });
    }

    /* ================================================================
       MOBILE NAVIGATION TOGGLE
       ================================================================ */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Animate hamburger to X
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });
    }

    /* ================================================================
       SCROLL REVEAL ANIMATIONS
       ================================================================ */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /* ================================================================
       STAT NUMBER COUNT-UP ANIMATION
       ================================================================ */
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.dataset.target);
                const duration = 2000;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function for smooth animation
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentValue = Math.floor(easeOutQuart * endValue);

                    target.textContent = currentValue;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        target.textContent = endValue;
                    }
                }

                requestAnimationFrame(updateCount);
                countObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => countObserver.observe(stat));

    /* ================================================================
       SMOOTH SCROLL FOR ANCHOR LINKS
       ================================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#privacy' || href === '#terms') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ================================================================
       PARALLAX EFFECTS ON SCROLL
       ================================================================ */
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Parallax shapes in hero
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    /* ================================================================
       NAVIGATION BACKGROUND ON SCROLL
       ================================================================ */
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.85)';
            nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        }

        // Hide nav on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 200) {
            nav.style.transform = 'translateX(-50%) translateY(-100%)';
        } else {
            nav.style.transform = 'translateX(-50%) translateY(0)';
        }

        lastScroll = currentScroll;
    });

    /* ================================================================
       FEATURE CARDS HOVER EFFECT
       ================================================================ */
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    /* ================================================================
       GALLERY ITEMS HOVER EFFECT
       ================================================================ */
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.zIndex = '10';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });
    });

    /* ================================================================
       BUTTON HOVER ANIMATIONS
       ================================================================ */
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-white');

    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    /* ================================================================
       PAGE LOAD ANIMATION
       ================================================================ */
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';

        requestAnimationFrame(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        });
    });

    /* ================================================================
       REDUCED MOTION SUPPORT
       ================================================================ */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('active');
        });

        document.querySelectorAll('.shape').forEach(shape => {
            shape.style.animation = 'none';
        });

        document.querySelectorAll('.hero-title .word').forEach(word => {
            word.style.animation = 'none';
            word.style.opacity = '1';
            word.style.transform = 'none';
        });
    }

    /* ================================================================
       CONSOLE BRANDING
       ================================================================ */
    console.log('%cBite-Line', 'font-size: 2rem; font-weight: bold; color: #6B7F5E; font-family: Georgia, serif;');
    console.log('%cWhere Food Meets Community', 'font-size: 1rem; color: #4A5568;');
    console.log('%cJoin our beta: https://docs.google.com/forms/d/e/1FAIpQLSdFt9DzUQH-IMZ2vFpjjsUTnQshqBb-3lMuQLCZ7vmFsRwnIA/viewform', 'font-size: 0.85rem; color: #7D8B75;');

});
