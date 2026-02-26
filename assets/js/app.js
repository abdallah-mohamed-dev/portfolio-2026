document.addEventListener('DOMContentLoaded', () => {
    
    /*
       INTERACTION RATIONALE: "Soft Entry"
       A fade-in transition on page load prevents a jarring initial paint
       and establishes a refined, high-end agency vibe.
    */
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);

    /*
       INTERACTION RATIONALE: Custom Cursor (The "Digital Ink")
       A custom cursor increases the sense of "handcrafted" design 
       and creates a stronger bond between the user and the page's UI elements.
    */
    const cursor = document.getElementById('cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hover state reinforces interactiveness of key elements
    const links = document.querySelectorAll('a, button, .case-study');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    /*
       INTERACTION RATIONALE: Staggered Reveals
       Using Intersection Observer for reveals instead of heavy GSAP 
       ensures high performance while guiding the user's eye 
       through the strategic content structure.
    */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .case-study, .service-card, .step').forEach(el => {
        el.classList.add('reveal'); 
        observer.observe(el);
    });

    /*
       INTERACTION RATIONALE: Subtle Parallax
       Gentle movement on the intro visual signals depth and complexity 
       without the distraction of "over-animated" common templates.
    */
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const visualBlock = document.querySelector('.visual-block');
        if (visualBlock) {
            visualBlock.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Header blur on scroll: Adds a modern glassy feel as the user explores.
        const header = document.querySelector('.header');
        if (scrolled > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.padding = '1rem 0';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.padding = '2rem 0';
        }
    });

    // 5. Text reveal animation for H1
    const h1 = document.querySelector('.reveal-text');
    if (h1) {
        const text = h1.innerText;
        // This is a simple version, for more complex ones we could split by letters
        h1.style.opacity = '0';
        h1.style.transform = 'translateY(20px)';
        h1.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        
        setTimeout(() => {
            h1.style.opacity = '1';
            h1.style.transform = 'translateY(0)';
        }, 500);
    }

    console.log('Portfolio 2026: Architecture initialized.');
});