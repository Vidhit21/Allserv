// Services Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeFilters();
    initializeSearch();
    initializeSorting();
    initializeRatingFilter();
    initializePriceRange();
});

// Filter Functionality
function initializeFilters() {
    const filterInputs = document.querySelectorAll('.filters-card input[type="checkbox"]');
    const applyFiltersBtn = document.querySelector('.filters-card .btn-outline-primary');

    filterInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Update visual state
            this.closest('.form-check').classList.toggle('active');
        });
    });

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const selectedFilters = getSelectedFilters();
            applyFilters(selectedFilters);
        });
    }
}

function getSelectedFilters() {
    const filters = {
        categories: [],
        priceRange: getPriceRange(),
        rating: getSelectedRating(),
        availability: []
    };

    // Get selected categories
    document.querySelectorAll('.filter-group:first-child input[type="checkbox"]:checked').forEach(checkbox => {
        filters.categories.push(checkbox.id);
    });

    // Get availability options
    document.querySelectorAll('.filter-group:last-child input[type="checkbox"]:checked').forEach(checkbox => {
        filters.availability.push(checkbox.id);
    });

    return filters;
}

function applyFilters(filters) {
    console.log('Applying filters:', filters);
    // Here you would typically make an API call to get filtered results
    // For now, we'll just show a loading state
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        showFilteredResults();
    }, 1000);
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const locationInput = document.querySelector('.location-box input');
    const searchButton = document.querySelector('.search-section .btn-primary');

    if (searchInput && locationInput && searchButton) {
        // Debounce search input
        searchInput.addEventListener('input', debounce(function(e) {
            console.log('Searching for:', e.target.value);
        }, 300));

        // Location autocomplete (you would integrate with a location API)
        locationInput.addEventListener('input', debounce(function(e) {
            console.log('Location search:', e.target.value);
        }, 300));

        // Search button click
        searchButton.addEventListener('click', function() {
            const searchQuery = searchInput.value;
            const location = locationInput.value;
            performSearch(searchQuery, location);
        });
    }
}

function performSearch(query, location) {
    console.log('Performing search:', { query, location });
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        showSearchResults();
    }, 1000);
}

// Sorting Functionality
function initializeSorting() {
    const sortSelect = document.querySelector('.sort-options select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            sortServices(sortValue);
        });
    }
}

function sortServices(sortValue) {
    console.log('Sorting by:', sortValue);
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        showSortedResults();
    }, 500);
}

// Rating Filter
function initializeRatingFilter() {
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            const rating = this.id.replace('rating', '');
            filterByRating(rating);
        });
    });
}

function filterByRating(rating) {
    console.log('Filtering by rating:', rating);
    // Implementation would go here
}

// Price Range
function initializePriceRange() {
    const rangeInput = document.getElementById('priceRange');
    const minInput = document.querySelector('.price-inputs input:first-child');
    const maxInput = document.querySelector('.price-inputs input:last-child');

    if (rangeInput && minInput && maxInput) {
        rangeInput.addEventListener('input', function() {
            const value = this.value;
            updatePriceInputs(value);
        });

        minInput.addEventListener('change', function() {
            validatePriceRange(minInput, maxInput);
        });

        maxInput.addEventListener('change', function() {
            validatePriceRange(minInput, maxInput);
        });
    }
}

function getPriceRange() {
    const minInput = document.querySelector('.price-inputs input:first-child');
    const maxInput = document.querySelector('.price-inputs input:last-child');
    return {
        min: minInput ? parseInt(minInput.value) || 0 : 0,
        max: maxInput ? parseInt(maxInput.value) || 1000 : 1000
    };
}

function updatePriceInputs(value) {
    // Implementation would go here
    console.log('Updating price range:', value);
}

function validatePriceRange(minInput, maxInput) {
    let min = parseInt(minInput.value);
    let max = parseInt(maxInput.value);

    if (min > max) {
        [minInput.value, maxInput.value] = [maxInput.value, minInput.value];
    }
}

// UI State Management
function showLoadingState() {
    // Add loading overlay or spinner
    const servicesContainer = document.querySelector('.services-section .row');
    if (servicesContainer) {
        servicesContainer.style.opacity = '0.5';
    }
}

function hideLoadingState() {
    const servicesContainer = document.querySelector('.services-section .row');
    if (servicesContainer) {
        servicesContainer.style.opacity = '1';
    }
}

function showFilteredResults() {
    // Implementation for showing filtered results
    console.log('Showing filtered results');
}

function showSearchResults() {
    // Implementation for showing search results
    console.log('Showing search results');
}

function showSortedResults() {
    // Implementation for showing sorted results
    console.log('Showing sorted results');
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

// Error Handling
function handleError(error) {
    console.error('Error:', error);
    // Show error message to user
    const errorMessage = document.createElement('div');
    errorMessage.className = 'alert alert-danger';
    errorMessage.textContent = 'An error occurred. Please try again.';
    document.querySelector('.services-section').prepend(errorMessage);

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}
