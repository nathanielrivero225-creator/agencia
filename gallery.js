document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    const tabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');
    const featuredCards = document.querySelectorAll('.featured-match-card');
    const revealElements = document.querySelectorAll('.reveal');

    let currentGalleryImages = [];
    let currentImageIndex = 0;

    const closeNav = () => {
        navToggle?.classList.remove('active');
        navLinks?.classList.remove('active');
    };

    const openLightbox = (src, images) => {
        currentGalleryImages = images;
        currentImageIndex = images.indexOf(src);
        if (lightboxImg) lightboxImg.src = src;
        if (lightbox) lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    const navigateLightbox = (direction) => {
        if (!currentGalleryImages.length || !lightboxImg) return;
        currentImageIndex = (currentImageIndex + direction + currentGalleryImages.length) % currentGalleryImages.length;
        lightboxImg.src = currentGalleryImages[currentImageIndex];
    };

    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeNav);
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;
            galleryContents.forEach(content => {
                content.classList.toggle('active', content.dataset.category === category);
            });
        });
    });

    featuredCards.forEach(card => {
        card.addEventListener('click', () => {
            const src = card.dataset.src;
            const images = Array.from(featuredCards).map(i => i.dataset.src);
            openLightbox(src, images);
        });
    });

    document.querySelectorAll('.gallery-content').forEach(gallery => {
        gallery.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const src = item.dataset.src;
                const images = Array.from(gallery.querySelectorAll('.gallery-item')).map(i => i.dataset.src);
                openLightbox(src, images);
            });
        });
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext?.addEventListener('click', () => navigateLightbox(1));

    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navLinks?.classList.contains('active')) closeNav();
            if (lightbox?.classList.contains('active')) closeLightbox();
        }

        if (!lightbox?.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    window.addEventListener('scroll', () => {
        nav?.classList.toggle('scrolled', window.scrollY > 100);
        if (navLinks?.classList.contains('active')) closeNav();
    }, { passive: true });

    window.addEventListener('scroll', () => {
        const heroSlide = document.querySelector('.hero-slide');
        if (!heroSlide || window.innerWidth <= 768) return;

        const scrolled = window.pageYOffset;
        heroSlide.style.transform = scrolled < window.innerHeight
            ? `translateY(${scrolled * 0.4}px)`
            : 'translateY(0)';
    }, { passive: true });

    revealElements.forEach(element => {
        const triggerBottom = window.innerHeight * 0.85;
        if (element.getBoundingClientRect().top < triggerBottom) {
            element.classList.add('active');
        }
    });

    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const message = document.getElementById('message')?.value.trim() || '';
        const whatsappMessage = `Hola, soy ${name}. Email: ${email}. ${message}`;
        window.location.href = `https://wa.me/59896574736?text=${encodeURIComponent(whatsappMessage)}`;
    });

    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});