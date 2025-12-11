/* ================================================================
   BITE-LINE - ARTISTIC INTERACTIONS
   Custom cursor, kinetic animations, scroll reveals
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ================================================================
       CUSTOM CURSOR - Artistic touch
       ================================================================ */
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate cursor with delay
    function animateCursor() {
        // Main cursor follows closely
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;

        // Follower has more delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
        cursorFollower.style.transform = `translate(${followerX - 4}px, ${followerY - 4}px)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Expand cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .img-art');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        });
    });

    /* ================================================================
       SCROLL REVEAL ANIMATIONS
       ================================================================ */
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* ================================================================
       NUMBER COUNT-UP ANIMATION
       ================================================================ */
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const observeStat = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const isPercent = text.includes('%');
                    const hasArrow = text.includes('→');

                    if (hasArrow) {
                        // Skip animated numbers with arrows
                        return;
                    }

                    const number = parseInt(text);

                    if (!isNaN(number)) {
                        let current = 0;
                        const increment = number / 60;
                        const duration = 2000;
                        const stepTime = duration / 60;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= number) {
                                current = number;
                                clearInterval(timer);
                            }
                            target.textContent = Math.floor(current) + (isPercent ? '%' : '');
                        }, stepTime);
                    }

                    observeStat.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        observeStat.observe(stat);
    });

    /* ================================================================
       SMOOTH SCROLL for anchor links
       ================================================================ */
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

    /* ================================================================
       PARALLAX EFFECT on scroll
       ================================================================ */
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Parallax shapes in hero
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Parallax big numbers
        const bigNumbers = document.querySelectorAll('.number-statement');
        bigNumbers.forEach(num => {
            num.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    });

    /* ================================================================
       IMAGE HOVER EFFECTS
       ================================================================ */
    const images = document.querySelectorAll('.img-art');
    images.forEach(img => {
        img.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });

    /* ================================================================
       BUTTON HOVER - Arrow animation
       ================================================================ */
    const buttons = document.querySelectorAll('.btn-bold');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    /* ================================================================
       KINETIC TYPOGRAPHY - Hero title animation
       On load, words fly in
       ================================================================ */
    const heroWords = document.querySelectorAll('.hero-title .word');
    heroWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.animation = `wordReveal 0.8s forwards cubic-bezier(0.4, 0, 0.2, 1)`;
        }, index * 200);
    });

    /* ================================================================
       PAGE LOAD ANIMATION
       ================================================================ */
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.6s ease';
            document.body.style.opacity = '1';
        }, 100);
    });

    /* ================================================================
       CONSOLE MESSAGE
       ================================================================ */
    console.log('%c🍽️ BITE-LINE', 'font-size: 3rem; font-weight: bold; color: #CC5803;');
    console.log('%cWhere Food Meets Community', 'font-size: 1.2rem; color: #2F3E21;');

});