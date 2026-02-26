document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 1. Custom Magnetic Cursor
    const cursor = document.querySelector('.custom-cursor');
    const trail = document.querySelector('.cursor-trail');
    
    window.addEventListener('mousemove', e => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
            ease: 'none'
        });
        gsap.to(trail, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    // Cursor interaction with links
    const links = document.querySelectorAll('a, button, .project-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 4, background: 'var(--accent)', duration: 0.3 });
            gsap.to(trail, { scale: 0, duration: 0.3 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, background: 'var(--fg)', duration: 0.3 });
            gsap.to(trail, { scale: 1, duration: 0.3 });
        });
    });

    // 2. Text Splitting & Entrance
    if (typeof SplitType !== 'undefined') {
        const heroText = new SplitType('#hero-text', { types: 'chars' });
        
        gsap.from(heroText.chars, {
            opacity: 0,
            y: 100,
            rotateX: -90,
            stagger: 0.05,
            duration: 1.5,
            ease: 'expo.out'
        });

        // Split manifesto text for scroll reveal
        const manifestoText = new SplitType('#about p', { types: 'words' });
        gsap.from(manifestoText.words, {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            opacity: 0.1,
            stagger: 0.1,
            duration: 1
        });
    }

    // 3. Blob Movement
    const blobs = document.querySelectorAll('.blob');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 100;
        const y = (e.clientY / window.innerHeight - 0.5) * 100;
        
        blobs.forEach((blob, i) => {
            gsap.to(blob, {
                x: x * (i + 1),
                y: y * (i + 1),
                duration: 2,
                ease: 'power2.out'
            });
        });
    });

    // 4. Parallax Scroll for Projects
    gsap.utils.toArray('.project-item').forEach(item => {
        const speed = parseFloat(item.dataset.speed) || 0.1;
        
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: (i, target) => -100 * speed * 5,
            ease: 'none'
        });

        // Hover effect for project images
        const img = item.querySelector('.project-image');
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            gsap.to(img, {
                x: x * 50,
                y: y * 50,
                rotateX: -y * 20,
                rotateY: x * 20,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(img, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    });

    // 5. Section Titles Reveal (Stroked Text)
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -100,
            skewX: 10,
            duration: 1.2,
            ease: 'power4.out'
        });
    });

    // 6. Footer Glitch Effect (Simulated)
    const footerText = document.querySelector('.footer-big-text');
    if (footerText) {
        gsap.from(footerText, {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top bottom',
                scrub: 1
            },
            scale: 0.5,
            opacity: 0,
            y: 100
        });
    }

    // 7. Smooth Internal Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {y: target, offsetY: 100},
                    ease: 'expo.inOut'
                });
            }
        });
    });

    // 8. Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.btn-glitch');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(this, { x: x * 0.5, y: y * 0.5, duration: 0.4, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
        });
    });

    // Initial Load Animation
    window.addEventListener('load', () => {
        gsap.to('body', { opacity: 1, duration: 0.5 });
    });
});
