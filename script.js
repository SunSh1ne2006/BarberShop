document.addEventListener('DOMContentLoaded', () => {
    // ----- БУРГЕР-МЕНЮ -----
    const burger = document.getElementById('burger');
    const navList = document.getElementById('nav-list');

    burger.addEventListener('click', () => {
        navList.classList.toggle('open');
    });

    // Закрытие меню при клике на ссылку (для мобильных)
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navList.classList.remove('open');
            }
        });
    });

    // ----- АКТИВНЫЙ ПУНКТ МЕНЮ ПРИ КЛИКЕ -----
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Убираем active у всех
            navLinks.forEach(l => l.classList.remove('active'));
            // Добавляем текущей
            this.classList.add('active');
        });
    });

    // ----- АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК -----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Элементы для наблюдения
    document.querySelectorAll('.price-card, .contact-block').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // CSS-класс для видимости (добавим динамически, чтобы не засорять CSS)
    const style = document.createElement('style');
    style.textContent = `
        .price-card.visible,
        .contact-block.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});