document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Creative Custom Cursor
    const cursor = document.getElementById('cursor');
    const links = document.querySelectorAll('a, .project-card-v2, .next-link');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('expand');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('expand');
        });
    });

    // 2. Smooth Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.project-card-v2, .section-header, .gallery-item, .metric-card');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // 3. Image Parallax for Project Cards
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const images = document.querySelectorAll('.placeholder-bg');
        
        images.forEach(img => {
            const speed = 0.05;
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.style.transform = `scale(1.1) translateY(${(rect.top * speed)}px)`;
            }
        });
    });

    // 4. Smooth Page Transition Effect
    window.addEventListener('beforeunload', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s';
    });

    // 5. Header Hide/Show on Scroll
    let lastScroll = 0;
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.background = 'rgba(8, 8, 8, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }
        lastScroll = currentScroll;
    });

    console.log('THE MONOLITH v2.0 Architecture initialized.');
});