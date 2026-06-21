// Активная ссылка в навигации
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Массив цитат
const quotes = [
    { text: "Лучшая стрижка — та, после которой тебе не нужно смотреть в зеркало. Ты и так знаешь, что ты в порядке.", author: "Старый брадобрей" },
    { text: "Борода не делает тебя мужчиной. Но мужчина может сделать бороду своим оружием.", author: "Мастер Холл" },
    { text: "Отрастил бороду — отбрось сомнения. Мужчина с волей на лице не имеет права на неуверенность.", author: "Б. Акунин" },
    { text: "Ухоженный мужчина не просит прощения за свой успех.", author: "Правила клуба" },
    { text: "Опасная бритва не прощает суеты. Как и жизнь.", author: "Надпись на зеркале" },
    { text: "Не жди выходного, чтобы выглядеть так, будто ты уже добился всего.", author: "Понедельник" },
    { text: "Усы — это просто. Характер — штучный товар. У нас есть и то, и другое.", author: "Барбершоп №1" },
    { text: "Запах виски и кожи. Твой дед знал, что такое стиль.", author: "Олдскул" },
    { text: "Когда ты свеж, мир отвечает тебе взаимностью.", author: "Истина" },
    { text: "Это не просто волосы. Это твое намерение.", author: "Мастер" },
    { text: "Будь мужчиной, а не мальчиком: запишись, приди, стань лучше.", author: "Мотивация" },
    { text: "Стрижка — как перезагрузка системы. Завис — постригись.", author: "АйТи-мастер" },
    { text: "Настоящий воин ухаживает за своим оружием. Твое лицо — твой главный клинок.", author: "Самурай" },
    { text: "Никто не пишет книг о мужчинах с неухоженными висками.", author: "Исторический факт" },
    { text: "Порядок на голове — порядок в делах.", author: "Капитан Очевидность" },
    { text: "Виски с колой — компромисс. Стрижка — нет.", author: "Бармен-брадобрей" },
    { text: "Делай что должен, и будь что будет. Только стрижку не пропускай.", author: "Рыцарь" },
    { text: "Мужской grooming — это не про \"красоту\". Это про уважение к себе.", author: "Глоссарий" },
    { text: "Здесь нет места обсуждению футбола. Только джентльменское молчание и звук ножниц.", author: "Правила" },
    { text: "За каждой стильной бородой стоит час работы мастера, который не спал ночь, но выпил кофе.", author: "Закулисье" },
    { text: "Ты либо король, который носит корону, либо тот, кто забыл причесаться. Выбор за тобой.", author: "Прямо сейчас" },
    { text: "В этом кресле ты становишься тем, кого уважают за рукопожатие и внешний вид.", author: "Welcome" },
    { text: "Слабоумие и отвага — это не про нас. Про нас — точность и бритва.", author: "Техника безопасности" },
    { text: "Мужская красота — в деталях. Детали — в нашей работе.", author: "Слоган" },
    { text: "Не откладывай на завтра стрижку, которую можно сделать сегодня вечером.", author: "Мотивация" },
    { text: "Будь смелее, чем твоя прическа.", author: "Вызов" },
    { text: "Здесь рождаются легенды. И стильные затылки.", author: "Локальный пафос" },
    { text: "Если уж прятаться от мира, то только за стильной челкой.", author: "Интроверт" },
    { text: "Никакой суеты: вошел парнем, вышел лидером.", author: "Трансформация" },
    { text: "Настоящее мужество — это не отсутствие страха, а аккуратная борода.", author: "Измененный классик" }
];

// Виджет на главной (если есть элементы)
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');

if (quoteText && quoteAuthor && newQuoteBtn) {
    function getRandomQuote() {
        const i = Math.floor(Math.random() * quotes.length);
        return quotes[i];
    }
    function setQuote(quote) {
        quoteText.style.opacity = '0';
        quoteAuthor.style.opacity = '0';
        setTimeout(() => {
            quoteText.textContent = `«${quote.text}»`;
            quoteAuthor.textContent = quote.author;
            quoteText.style.opacity = '1';
            quoteAuthor.style.opacity = '1';
        }, 150);
    }
    setQuote(getRandomQuote());
    newQuoteBtn.addEventListener('click', () => {
        setQuote(getRandomQuote());
        newQuoteBtn.textContent = '...ВОТ...';
        setTimeout(() => { newQuoteBtn.textContent = 'ЕЩЁ МУДРОСТЬ'; }, 400);
    });
}

// Страница quotes.html – рендер всех цитат
const quotesGrid = document.getElementById('quotesGrid');
if (quotesGrid) {
    quotes.forEach(q => {
        const card = document.createElement('div');
        card.className = 'quote-card';
        card.innerHTML = `«${q.text}»<div class="author">— ${q.author}</div>`;
        quotesGrid.appendChild(card);
    });
}

// Лайтбокс для галереи
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const galleryImages = document.querySelectorAll('.gallery-img');

if (lightbox && lightboxImg && lightboxClose) {
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
        });
    });
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });
}