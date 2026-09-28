// ========== ТОВАРЫ ==========/
const products = [
    {
        id: 1,
        name: 'Мясо кролика',
        price: '950 ₽/кг',
        desc: 'Парная тушка молодого кролика',
        category: 'rabbit',
        tags: ['~2 кг', 'Парное мясо'],
        emoji: '🐰',
        badge: 'Крольчатина'
    },
    {
        id: 2,
        name: 'Филе кролика',
        price: '2000 ₽/кг',
        desc: 'Чистое филе без костей',
        category: 'rabbit',
        tags: ['Без костей', 'Для прикорма'],
        emoji: '🍖',
        badge: 'Деликатес'
    },
    {
        id: 3,
        name: 'Печень кролика',
        price: '1800 ₽/кг',
        desc: 'Свежий парной субпродукт',
        category: 'rabbit',
        tags: ['Богата железом', 'Свежесть'],
        emoji: '🩸',
        badge: 'Крольчатина'
    },
    {
        id: 4,
        name: 'Сардельки кролика',
        price: '2200 ₽/кг',
        desc: 'Натуральные в оболочке',
        category: 'rabbit',
        tags: ['Натуральная оболочка', 'Без сои'],
        emoji: '🌭',
        badge: 'Деликатес'
    },
    {
        id: 5,
        name: 'Курица',
        price: '700 ₽/кг',
        desc: 'Домашняя курица свободного выгула',
        category: 'poultry',
        tags: ['Свободный выгул', 'Наваристый бульон'],
        emoji: '🐔',
        badge: 'Птица'
    },
    {
        id: 6,
        name: 'Перепелка',
        price: '1200 ₽/кг',
        desc: 'Молодая перепелка зернового откорма',
        category: 'poultry',
        tags: ['Для запекания', 'Зерновой откорм'],
        emoji: '🐦',
        badge: 'Птица'
    },
    {
        id: 7,
        name: 'Яйцо перепелиное',
        price: '250 ₽ / 20 шт',
        desc: 'Упаковка из 20 яиц',
        category: 'dairy',
        tags: ['Лоток 20 шт', 'Гипоаллергенно'],
        emoji: '🥚',
        badge: 'Яйца'
    },
    {
        id: 8,
        name: 'Яйцо куриное',
        price: '250 ₽ / 10 шт',
        desc: 'Десяток крупных яиц',
        category: 'dairy',
        tags: ['Яркий желток', '10 шт'],
        emoji: '🥚',
        badge: 'Яйца'
    },
    {
        id: 9,
        name: 'Творог',
        price: '900 ₽/кг',
        desc: 'Домашний рассыпчатый творог',
        category: 'dairy',
        tags: ['Ручной отжим', 'Цельное м��локо'],
        emoji: '🍶',
        badge: 'Молочка'
    }
];

// ========== ОТЗЫВЫ ==========/
const defaultReviews = [
    {
        name: 'Анна Васильева',
        date: '18 мая 2026',
        text: 'Искали проверенного кролика для прикорма дочке. Мясо светлое, пахнет свежестью, бульон прозрачный. Ребенок ест отлично, никакой аллергии.',
        rating: 5,
        product: 'Мясо кролика с разделкой'
    },
    {
        name: 'Сергей Михайлович',
        date: '2 июля 2026',
        text: 'Живем в Вырице. Берем курочку на суп и творог. Курица деревенская, суп янтарный. Сардельки плотные, сочные, без магазинной химии.',
        rating: 5,
        product: 'Сардельки, курица и творог'
    },
    {
        name: 'Ольга Кравцова',
        date: '14 августа 2026',
        text: 'Брали филе на диетическое тушение и печень для паштета. Печень чистая, без жилок. Яйца крупные, желток оранжевый.',
        rating: 5,
        product: 'Филе кролика, печень и яйца'
    }
];

const REVIEWS_KEY = 'artamoshki_reviews';

// ========== ИНИЦИАЛИЗАЦИЯ ==========/
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    renderReviews();
    initFilters();
    initReviewForm();
    initStarRating();
    updateReviewScore();
});

// ========== ТОВАРЫ ==========/
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                ${product.emoji}
                <span class="product-badge">${product.badge}</span>
            </div>
            <div class="product-body">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-price">${product.price}</span>
                </div>
                <p class="product-desc">${product.desc}</p>
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="product-footer">
                    <a href="tel:+79213112271" class="product-btn">
                        <i class="fas fa-phone"></i> Заказать
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });
}

// ========== ОТЗЫВЫ ==========/
function renderReviews() {
    const container = document.getElementById('reviewsList');
    container.innerHTML = '';

    const stored = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || [];
    const allReviews = [...stored, ...defaultReviews];

    allReviews.slice(0, 6).forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        const initials = review.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
        card.innerHTML = `
            <div class="review-header">
                <div class="review-avatar">${initials}</div>
                <div class="review-info">
                    <h4>${review.name}</h4>
                    <p>${review.date}</p>
                </div>
                <div class="review-stars">${'★'.repeat(review.rating)}</div>
            </div>
            <p class="review-text">${review.text}</p>
            ${review.product ? `<div class="tag" style="margin-top: 12px;">📦 ${review.product}</div>` : ''}
        `;
        container.appendChild(card);
    });
}

function initReviewForm() {
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('authorName').value.trim();
        const product = document.getElementById('productName').value.trim();
        const text = document.getElementById('reviewText').value.trim();
        const rating = parseInt(document.querySelector('.stars-input i.active')?.dataset.rating || '5');

        if (!name || !text) {
            alert('Пожалуйста, заполните имя и отзыв');
            return;
        }

        const review = {
            name,
            product,
            text,
            rating,
            date: new Date().toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        let stored = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || [];
        stored.unshift(review);
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(stored));

        form.reset();
        document.querySelectorAll('.stars-input i').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.stars-input i').forEach(s => {
            if (s.dataset.rating <= 5) s.classList.add('active');
        });
        document.getElementById('ratingText').textContent = '5 из 5 ⭐';

        renderReviews();
        updateReviewScore();

        alert('Спасибо! Ваш отзыв опубликован!');
    });
}

function initStarRating() {
    const stars = document.querySelectorAll('.stars-input i');
    const ratingText = document.getElementById('ratingText');
    const labels = ['Плохо', 'Удовлетворительно', 'Нормально', 'Хорошо', 'Отлично! ⭐'];

    stars.forEach((star, i) => {
        if (i < 5) star.classList.add('active');
    });

    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            stars.forEach((s, i) => {
                if (i + 1 <= rating) s.classList.add('active');
                else s.classList.remove('active');
            });
            ratingText.textContent = `${rating} из 5 - ${labels[rating - 1]}`;
        });

        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            stars.forEach((s, i) => {
                if (i + 1 <= rating) s.classList.add('active');
                else s.classList.remove('active');
            });
        });
    });

    document.getElementById('starsInput').addEventListener('mouseleave', () => {
        const active = document.querySelectorAll('.stars-input i.active').length;
        ratingText.textContent = `${active} из 5 - ${labels[active - 1]}`;
    });
}

function updateReviewScore() {
    const stored = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || [];
    let sum = 15; // 3 дефолт отзыва по 5 звезд
    let count = 3;

    stored.forEach(r => {
        sum += r.rating;
        count++;
    });

    const avg = (sum / count).toFixed(1);
    document.getElementById('avgScore').textContent = avg;
}
