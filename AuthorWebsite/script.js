/* =====================================================
   Meade Fischer site — interactivity
   ===================================================== */

(function () {
    'use strict';

    // ----- Nav scrolled state -----
    const nav = document.getElementById('nav');
    const onScroll = () => {
        if (window.scrollY > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ----- Mobile nav toggle -----
    const toggle = document.getElementById('navToggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            toggle.classList.toggle('open');
        });
        nav.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => {
                nav.classList.remove('mobile-open');
                toggle.classList.remove('open');
            });
        });
    }

    // ----- Book filter -----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const books = document.querySelectorAll('#booksGrid .book');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            books.forEach(book => {
                const genre = book.dataset.genre;
                const match = filter === 'all' || genre === filter;

                if (match) {
                    book.classList.remove('hidden');
                    book.style.animation = 'none';
                    // restart fade-in
                    requestAnimationFrame(() => {
                        book.style.animation = 'fadeInUp .55s ease forwards';
                    });
                } else {
                    book.classList.add('hidden');
                }
            });
        });
    });

    // ----- Scroll reveal -----
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    // ----- Set year -----
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    // ----- Inject keyframes for filter animation -----
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
})();
