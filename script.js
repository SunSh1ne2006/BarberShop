(function() {
    // Услуги - стрижки и бритьё
    const haircuts = [
        { id: 'h1', name: "Мужская стрижка", category: "Стрижка", price: 2500, icon: "fa-scissors" },
        { id: 'h2', name: "Стрижка машинкой", category: "Стрижка", price: 1500, icon: "fa-cut" },
        { id: 'h3', name: "Детская стрижка", category: "Стрижка", price: 1200, icon: "fa-child" }
    ];
    const shaving = [
        { id: 's1', name: "Королевское бритьё", category: "Бритьё", price: 3000, icon: "fa-hand-sparkles" },
        { id: 's2', name: "Уход за бородой", category: "Борода", price: 2000, icon: "fa-beard" },
        { id: 's3', name: "Оформление усов", category: "Борода", price: 800, icon: "fa-mustache" }
    ];
    const productsData = [
        { id: 'p1', name: "Помада для волос", category: "Уход", price: 1200, icon: "fa-jar" },
        { id: 'p2', name: "Масло для бороды", category: "Уход", price: 1500, icon: "fa-oil-can" },
        { id: 'p3', name: "Шампунь-кондиционер", category: "Уход", price: 900, icon: "fa-pump-soap" }
    ];

    // Команда
    const team = [
        { name: "Алексей", role: "Старший барбер", icon: "fa-user-tie" },
        { name: "Дмитрий", role: "Барбер", icon: "fa-user" },
        { name: "Максим", role: "Барбер", icon: "fa-user" }
    ];

    let cart = []; // Здесь это запись на услуги/товары

    const pageSections = {
        home: document.getElementById('home-section'),
        services: document.getElementById('services-section'),
        products: document.getElementById('products-section'),
        'product-detail': document.getElementById('product-detail-section'),
        cart: document.getElementById('cart-section'),
        team: document.getElementById('team-section'),
        about: document.getElementById('about-section'),
        contact: document.getElementById('contact-section')
    };

    function findProductById(id) {
        return [...haircuts, ...shaving, ...productsData].find(p => p.id === id);
    }

    function addToCart(productId) {
        const product = findProductById(productId);
        if (!product) return;
        const existing = cart.find(item => item.id === productId);
        if (existing) existing.quantity += 1;
        else cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        updateCartUI();
        alert(`✅ ${product.name} добавлен в запись!`);
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartUI();
    }

    function changeQuantity(productId, delta) {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) removeFromCart(productId);
            else updateCartUI();
        }
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-count').textContent = totalItems;
        if (pageSections.cart.classList.contains('active')) renderCartPage();
    }

    function renderCartPage() {
        const container = document.getElementById('cartPageContent');
        if (!container) return;
        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#64748b; padding:40px;">Нет записей</p>';
            return;
        }
        let html = `<table class="cart-table"><thead><tr><th>Услуга/Товар</th><th>Цена</th><th>Кол-во</th><th>Сумма</th><th></th></tr></thead><tbody>`;
        cart.forEach(item => {
            html += `<tr>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()} ₽</td>
                <td><div class="quantity-control"><button class="quantity-btn" data-id="${item.id}" data-delta="-1">−</button><span>${item.quantity}</span><button class="quantity-btn" data-id="${item.id}" data-delta="1">+</button></div></td>
                <td>${(item.price * item.quantity).toLocaleString()} ₽</td>
                <td><button class="remove-btn" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button></td>
            </tr>`;
        });
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        html += `</tbody></table><div class="cart-summary">Итого: ${total.toLocaleString()} ₽</div><button class="checkout-btn">Записаться</button>`;
        container.innerHTML = html;

        container.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', () => changeQuantity(btn.dataset.id, parseInt(btn.dataset.delta)));
        });
        container.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
        });
        const checkoutBtn = container.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                alert('Спасибо за запись! Мы свяжемся с вами для подтверждения.');
                cart = [];
                updateCartUI();
                showPage('home');
            });
        }
    }

    function renderProductCards(container, products) {
        if (!container) return;
        container.innerHTML = products.map(p => `
            <div class="product-card">
                <div class="product-icon"><i class="fas ${p.icon}"></i></div>
                <h3>${p.name}</h3>
                <div class="category">${p.category}</div>
                <div class="price">${p.price.toLocaleString()} ₽</div>
                <button class="detail-btn" data-id="${p.id}"><i class="fas fa-info-circle"></i> Подробнее</button>
                <button class="add-to-cart" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Записаться</button>
            </div>
        `).join('');
        container.querySelectorAll('.detail-btn').forEach(btn => btn.addEventListener('click', () => showProductDetail(btn.dataset.id)));
        container.querySelectorAll('.add-to-cart').forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.id)));
    }

    function showProductDetail(productId) {
        const product = findProductById(productId);
        if (!product) return;
        const container = document.getElementById('productDetailContainer');
        const specs = { "Длительность": "45 мин", "Мастер": "Любой барбер", "Включено": "Массаж головы, горячее полотенце", "Скидка": "20% для новых клиентов" };
        let stars = '';
        for (let i = 0; i < 5; i++) stars += '<i class="fas fa-star"></i>';

        container.innerHTML = `
            <button class="back-btn" id="backFromDetail"><i class="fas fa-arrow-left"></i> Назад</button>
            <div class="product-detail">
                <div class="product-gallery">
                    <div class="main-icon"><i class="fas ${product.icon}"></i></div>
                    <div class="thumbnail-list">
                        <div class="thumbnail active"><i class="fas ${product.icon}"></i></div>
                        <div class="thumbnail"><i class="fas ${product.icon}"></i></div>
                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="category">${product.category}</div>
                    <div class="rating">${stars} 4.9 (57 отзывов)</div>
                    <div class="price">${product.price.toLocaleString()} ₽</div>
                    <p class="description">Профессиональное исполнение, внимание к деталям и премиальные средства ухода.</p>
                    <table class="specs-table">${Object.entries(specs).map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</table>
                    <button class="add-to-cart" data-id="${product.id}"><i class="fas fa-cart-plus"></i> Записаться</button>
                </div>
            </div>
        `;
        document.getElementById('backFromDetail').addEventListener('click', () => showPage('home'));
        container.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product.id));
        showPage('product-detail');
    }

    function renderTeam() {
        const container = document.getElementById('teamContainer');
        if (!container) return;
        container.innerHTML = team.map(m => `
            <div class="team-card">
                <div class="team-avatar"><i class="fas ${m.icon}"></i></div>
                <h3>${m.name}</h3>
                <p class="category">${m.role}</p>
            </div>
        `).join('');
    }

    function showPage(pageId) {
        Object.values(pageSections).forEach(sec => sec.classList.remove('active'));
        if (pageSections[pageId]) pageSections[pageId].classList.add('active');
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active-page', link.dataset.page === pageId);
        });
        if (pageId === 'cart') renderCartPage();
        window.scrollTo({ top: 200, behavior: 'smooth' });
    }

    document.querySelectorAll('[data-page]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(el.dataset.page);
        });
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        document.getElementById('navLinks').classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) document.getElementById('navLinks').classList.remove('active');
        });
    });

    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('📩 Спасибо! Мы свяжемся с вами.');
        e.target.reset();
    });

    // Заполнение контейнеров
    renderProductCards(document.getElementById('homeHaircutsContainer'), haircuts);
    renderProductCards(document.getElementById('homeShavingContainer'), shaving);
    renderProductCards(document.getElementById('homeProductsContainer'), productsData);
    renderProductCards(document.getElementById('servicesContainer'), [...haircuts, ...shaving]);
    renderProductCards(document.getElementById('productsContainer'), productsData);
    renderTeam();

    updateCartUI();
    showPage('home');
})();