// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initWishlist();
    initCart();
    initServiceCards();
    initScrollEffects();
    initToastSystem();
});

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const slider = document.querySelector('.hero-slider');
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe right - show previous slide
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            } else {
                // Swipe left - show next slide
                currentSlide = (currentSlide + 1) % slides.length;
            }
            showSlide(currentSlide);
        }
    }
}

// Wishlist functionality
function initWishlist() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    const wishlistCount = document.querySelector('.wishlist-count');
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Update wishlist button states
    function updateWishlistButtons() {
        wishlistBtns.forEach(btn => {
            const serviceCard = btn.closest('.service-card');
            const serviceId = serviceCard.dataset.id;
            if (wishlistItems.includes(serviceId)) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="far fa-heart"></i>';
            }
        });
    }

    // Update wishlist count
    function updateWishlistCount() {
        wishlistCount.textContent = wishlistItems.length;
        wishlistCount.style.display = wishlistItems.length ? 'block' : 'none';
    }

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const serviceCard = this.closest('.service-card');
            const serviceId = serviceCard.dataset.id;
            const serviceName = serviceCard.querySelector('h3').textContent;
            
            if (wishlistItems.includes(serviceId)) {
                wishlistItems = wishlistItems.filter(id => id !== serviceId);
                showToast(`${serviceName} removed from wishlist`);
            } else {
                wishlistItems.push(serviceId);
                showToast(`${serviceName} added to wishlist`);
            }

            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
            updateWishlistButtons();
            updateWishlistCount();
        });
    });

    updateWishlistButtons();
    updateWishlistCount();
}

// Cart functionality
function initCart() {
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems ? 'block' : 'none';
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceCard = this.closest('.service-card');
            const serviceId = serviceCard.dataset.id;
            const serviceName = serviceCard.querySelector('h3').textContent;
            const servicePrice = serviceCard.querySelector('.current-price').textContent;

            const existingItem = cartItems.find(item => item.id === serviceId);

            if (existingItem) {
                existingItem.quantity += 1;
                showToast(`Added another ${serviceName} to cart`);
            } else {
                cartItems.push({
                    id: serviceId,
                    name: serviceName,
                    price: servicePrice,
                    quantity: 1
                });
                showToast(`${serviceName} added to cart`);
            }

            localStorage.setItem('cart', JSON.stringify(cartItems));
            updateCartCount();

            // Add animation to cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.classList.add('bounce');
            setTimeout(() => cartIcon.classList.remove('bounce'), 1000);
        });
    });

    updateCartCount();
}

// Service Cards
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Quick view functionality
        card.addEventListener('click', function() {
            const serviceId = this.dataset.id;
            showQuickView(serviceId);
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Header effect
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScroll = currentScroll;
    });

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.feature-item, .service-card, .offer-card, .step-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Toast notification system
function initToastSystem() {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
}

function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;

    // Add visible class for animation
    toast.classList.add('visible');

    // Remove toast after animation
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Quick view modal
function showQuickView(serviceId) {
    // Implementation for quick view modal
    console.log('Quick view for service:', serviceId);
}

// Category Navigation
function initCategoryNav() {
    const categoryLinks = document.querySelectorAll('.category-list a');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Filter services based on category
            const category = this.textContent.toLowerCase();
            filterServices(category);
        });
    });
}

function filterServices(category) {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const cardCategory = card.querySelector('.service-category').textContent.toLowerCase();
        
        if (category === 'all services' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const category = card.querySelector('.service-category').textContent.toLowerCase();
        
        if (title.includes(query) || category.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
