// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Currency Conversion
const currencySelector = document.getElementById('currency');
currencySelector?.addEventListener('change', (e) => {
    const prices = document.querySelectorAll('.sale-price, .original-price');
    prices.forEach(price => {
        const value = parseFloat(price.textContent.replace(/[^0-9.]/g, ''));
        if (e.target.value === 'USD') {
            price.textContent = `$${Math.round(value * 1.1)}`;
        } else if (e.target.value === 'PLN') {
            price.textContent = `${Math.round(value * 4.3)}zł`;
        } else {
            price.textContent = `€${value}`;
        }
    });
});

// Slider
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

prevBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextBtn?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

setInterval(() => {
    if (slides.length) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}, 5000);

// Sale Timer
const timer = document.getElementById('timer');
if (timer) {
    let timeLeft = 24 * 60 * 60;
    setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        timer.textContent = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;
    }, 1000);
}

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cart-count');
function updateCartCount() {
    cartCount.textContent = cart.length;
}
updateCartCount();

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        cart.push(id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    });
});

// Quick View
const quickViewPopup = document.getElementById('quick-view-popup');
const quickViewImage = document.getElementById('quick-view-image');
const quickViewTitle = document.getElementById('quick-view-title');
const quickViewDescription = document.getElementById('quick-view-description');
const quickViewPrice = document.getElementById('quick-view-price');

document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        quickViewImage.src = card.querySelector('img').src;
        quickViewTitle.textContent = card.querySelector('h3').textContent;
        quickViewDescription.textContent = card.querySelector('p').textContent;
        quickViewPrice.innerHTML = card.querySelector('.price').innerHTML;
        quickViewPopup.classList.remove('hidden');
    });
});

document.querySelector('.close-popup').addEventListener('click', () => {
    quickViewPopup.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === quickViewPopup) {
        quickViewPopup.classList.add('hidden');
    }
});

// Form Validation
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }
    alert('Subscribed successfully!');
});
