// Main JavaScript for AllServ Landing Page

document.addEventListener('DOMContentLoaded', function() {
    initializeSearchBehavior();
    initializeNavigation();
    initializeAnimations();
    initializeServiceCards();
});

// Search Functionality
function initializeSearchBehavior() {
    const searchInputs = document.querySelectorAll('.search-box input, .search-bar input');
    
    searchInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('is-focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('is-focused');
        });

        // Add search functionality
        input.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Here you would typically make an API call to get search results
            console.log('Searching for:', searchTerm);
        }, 300));
    });

    // Hero search button
    const heroSearchBtn = document.querySelector('.hero .search-box button');
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', function() {
            const searchInput = this.closest('.search-box').querySelector('input');
            const categorySelect = this.closest('.search-box').querySelector('select');
            
            const searchTerm = searchInput.value;
            const category = categorySelect.value;
            
            // Redirect to services page with search parameters
            window.location.href = `pages/services/list.html?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`;
        });
    }
}

// Navigation Behavior
function initializeNavigation() {
    // Sticky navigation
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Mobile menu behavior
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            document.body.classList.toggle('mobile-menu-open');
        });
    }

    // Dropdown hover effect for desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        if (window.innerWidth > 992) { // Only for desktop
            dropdown.addEventListener('mouseenter', function() {
                this.querySelector('.dropdown-menu').classList.add('show');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                this.querySelector('.dropdown-menu').classList.remove('show');
            });
        }
    });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.category-card, .service-card, .step-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));
}

// Service Cards Interaction
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.classList.add('is-hovered');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('is-hovered');
        });

        // Book Now button click
        const bookBtn = card.querySelector('.btn-primary');
        if (bookBtn) {
            bookBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const serviceTitle = card.querySelector('h3').textContent;
                const servicePrice = card.querySelector('.price .amount').textContent;
                
                // Store selected service details in session storage
                sessionStorage.setItem('selectedService', JSON.stringify({
                    title: serviceTitle,
                    price: servicePrice,
                    timestamp: new Date().getTime()
                }));

                // Redirect to booking page
                window.location.href = this.href;
            });
        }
    });
}

// Popular Searches Click Tracking
document.querySelectorAll('.popular-searches a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = this.textContent;
        
        // Track the search click
        trackSearchClick(searchTerm);
        
        // Redirect to search results
        window.location.href = `pages/services/list.html?search=${encodeURIComponent(searchTerm)}`;
    });
});

// Category Cards Click Tracking
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.querySelector('h3').textContent;
        
        // Track the category click
        trackCategoryClick(category);
        
        // Redirect to category page
        window.location.href = this.href;
    });
});

// Analytics Tracking Functions
function trackSearchClick(searchTerm) {
    // Implement your analytics tracking here
    console.log('Search clicked:', searchTerm);
}

function trackCategoryClick(category) {
    // Implement your analytics tracking here
    console.log('Category clicked:', category);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cart Functionality
function initializeCart() {
    const cartBtn = document.querySelector('.btn-outline-primary[href*="cart.html"]');
    if (cartBtn) {
        // Update cart count
        const cartCount = sessionStorage.getItem('cartCount') || 0;
        const badge = cartBtn.querySelector('.badge');
        if (badge) {
            badge.textContent = cartCount;
        }

        // Cart button click animation
        cartBtn.addEventListener('click', function(e) {
            this.classList.add('btn-bounce');
            setTimeout(() => this.classList.remove('btn-bounce'), 300);
        });
    }
}

// Add to Cart Animation
function addToCartAnimation(button) {
    button.classList.add('adding-to-cart');
    
    setTimeout(() => {
        button.classList.remove('adding-to-cart');
        button.classList.add('added-to-cart');
        
        // Update cart count
        const badge = document.querySelector('.btn-outline-primary .badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent) || 0;
            badge.textContent = currentCount + 1;
        }
        
        setTimeout(() => {
            button.classList.remove('added-to-cart');
        }, 2000);
    }, 1000);
}

// Initialize cart functionality
initializeCart();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .btn-bounce {
        animation: bounce 0.3s ease;
    }

    .adding-to-cart {
        position: relative;
        pointer-events: none;
    }

    .adding-to-cart::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top-color: currentColor;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    .added-to-cart {
        background-color: var(--success) !important;
        border-color: var(--success) !important;
    }

    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    @keyframes spin {
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(style);
