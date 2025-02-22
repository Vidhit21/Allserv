// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optimize scroll event handling
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;
const scrollThrottle = throttle(() => {
    if (window.scrollY > 50) {
        if (window.scrollY > lastScrollY) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }
    lastScrollY = window.scrollY;
}, 100);

window.addEventListener('scroll', scrollThrottle, { passive: true });

// Search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
        // Add your search logic here
        console.log('Searching for:', e.target.value);
    }, 300));
}

// Category card hover effect
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Optimize intersection observer
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('animate__animated', entry.target.dataset.animation);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Batch DOM operations
const animatedElements = document.querySelectorAll('[data-animation]');
const fragment = document.createDocumentFragment();
animatedElements.forEach(element => {
    fragment.appendChild(element.cloneNode(true));
    observer.observe(element);
});

// Testimonial carousel autoplay
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showNextTestimonial() {
    testimonials[currentTestimonial].style.opacity = '0';
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    testimonials[currentTestimonial].style.opacity = '1';
}

// Change testimonial every 5 seconds
if (testimonials.length > 0) {
    setInterval(showNextTestimonial, 5000);
}

// Helper function for debouncing
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

// Add throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Service search suggestions
const popularSearches = [
    'AC Repair',
    'House Cleaning',
    'Plumbing',
    'Electrical Repair',
    'Painting',
    'Carpentry'
];

const searchContainer = document.querySelector('.search-container');
if (searchContainer) {
    const suggestionBox = document.createElement('div');
    suggestionBox.className = 'suggestion-box';
    searchContainer.appendChild(suggestionBox);

    searchInput.addEventListener('focus', function() {
        suggestionBox.style.display = 'block';
        updateSuggestions(this.value);
    });

    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            suggestionBox.style.display = 'none';
        }
    });

    // Optimize search suggestions with a trie data structure
    class TrieNode {
        constructor() {
            this.children = {};
            this.isEndOfWord = false;
            this.suggestions = [];
        }
    }

    class Trie {
        constructor() {
            this.root = new TrieNode();
        }

        insert(word) {
            let node = this.root;
            for (let char of word.toLowerCase()) {
                if (!node.children[char]) {
                    node.children[char] = new TrieNode();
                }
                node = node.children[char];
                if (node.suggestions.length < 5) {
                    node.suggestions.push(word);
                }
            }
            node.isEndOfWord = true;
        }

        search(prefix) {
            let node = this.root;
            for (let char of prefix.toLowerCase()) {
                if (!node.children[char]) return [];
                node = node.children[char];
            }
            return node.suggestions;
        }
    }

    // Initialize trie with popular searches
    const searchTrie = new Trie();
    popularSearches.forEach(search => searchTrie.insert(search));

    // Update search suggestions using trie
    function updateSuggestions(query) {
        const suggestions = searchTrie.search(query);
        suggestionBox.innerHTML = suggestions
            .map(suggestion => `<div class="suggestion-item">${suggestion}</div>`)
            .join('');

        const suggestionItems = document.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', function() {
                searchInput.value = this.textContent;
                suggestionBox.style.display = 'none';
            });
        });
    }

    searchInput.addEventListener('input', function() {
        updateSuggestions(this.value);
    });
}

// Add loading animation to service booking
document.querySelectorAll('.btn-register').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Simulate loading
            setTimeout(() => {
                this.classList.remove('loading');
                this.innerHTML = 'Get Started';
            }, 1500);
        }
    });
});
