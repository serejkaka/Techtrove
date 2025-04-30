// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Currency Conversion
const currencySelector = document.getElementById('currency');
currencySelector.addEventListener('change', (e) => {
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

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Sale Timer
const timer = document.getElementById('timer');
if (timer) {
    let timeLeft = 24 * 60 * 60; // 24 hours in seconds
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
        
        // Animation
        const cartIcon = document.getElementById('cart-icon');
        const clone = e.target.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.left = `${e.target.getBoundingClientRect().left}px`;
        clone.style.top = `${e.target.getBoundingClientRect().top}px`;
        document.body.appendChild(clone);
        setTimeout(() => {
            clone.style.transition = 'all 0.5s';
            clone.style.left = `${cartIcon.getBoundingClientRect().left}px`;
            clone.style.top = `${cartIcon.getBoundingClientRect().top}px`;
            clone.style.transform = 'scale(0.5)';
            clone.style.opacity = '0';
        }, 10);
        setTimeout(() => clone.remove(), 500);
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

// Filters
const filterBrand = document.getElementById('filter-brand');
const filterPrice = document.getElementById('filter-price');
const priceValue = document.getElementById('price-value');
const filterStorage = document.getElementById('filter-storage');
const filterScreen = document.getElementById('filter-screen');
const sortBy = document.getElementById('sort-by');

if (filterPrice) {
    filterPrice.addEventListener('input', () => {
        priceValue.textContent = `€${filterPrice.value}`;
    });
}

// Chat Bot
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const chatBody = document.querySelector('.chat-body');

chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
        const message = document.createElement('p');
        message.textContent = `You: ${chatInput.value}`;
        chatBody.appendChild(message);
        
        // Mock responses
        setTimeout(() => {
            const response = document.createElement('p');
            response.textContent = 'Support: Thanks for your message! How can we assist you further?';
            chatBody.appendChild(response);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
        
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;
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

// Compare Products
let compareList = JSON.parse(localStorage.getItem('compare')) || [];
document.querySelectorAll('.compare').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (compareList.length < 3 && !compareList.includes(id)) {
            compareList.push(id);
            localStorage.setItem('compare', JSON.stringify(compareList));
            alert(`Added ${id} to comparison.`);
        } else if (compareList.includes(id)) {
            alert('Product already in comparison.');
        } else {
            alert('You can compare up to 3 products.');
        }
    });
});
