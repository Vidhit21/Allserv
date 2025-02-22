// Booking History Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeFilters();
    initializeRatingSystem();
    initializeModals();
});

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterBookings(searchTerm);
        }, 300));
    }
}

function filterBookings(searchTerm) {
    const bookingCards = document.querySelectorAll('.booking-card');
    bookingCards.forEach(card => {
        const serviceTitle = card.querySelector('h4').textContent.toLowerCase();
        const providerName = card.querySelector('.provider').textContent.toLowerCase();
        
        if (serviceTitle.includes(searchTerm) || providerName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter Functionality
function initializeFilters() {
    const filterSelect = document.querySelector('.filter-dropdown select');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const timeFrame = this.value;
            filterByTimeFrame(timeFrame);
        });
    }
}

function filterByTimeFrame(timeFrame) {
    console.log('Filtering by time frame:', timeFrame);
    // Implementation would go here - typically would involve API call
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        // Update UI with filtered results
    }, 500);
}

// Rating System
function initializeRatingSystem() {
    const ratingStars = document.querySelectorAll('.rating-input .stars i');
    
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            highlightStars(rating);
        });

        star.addEventListener('mouseout', function() {
            const selectedRating = document.querySelector('.rating-input').dataset.rating;
            highlightStars(selectedRating || 0);
        });

        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            document.querySelector('.rating-input').dataset.rating = rating;
            highlightStars(rating);
        });
    });
}

function highlightStars(rating) {
    const stars = document.querySelectorAll('.rating-input .stars i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Modal Functionality
function initializeModals() {
    // Reschedule Modal
    const rescheduleModal = document.getElementById('rescheduleModal');
    if (rescheduleModal) {
        rescheduleModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const bookingCard = button.closest('.booking-card');
            const serviceTitle = bookingCard.querySelector('h4').textContent;
            
            this.querySelector('.modal-title').textContent = `Reschedule: ${serviceTitle}`;
        });

        const confirmRescheduleBtn = rescheduleModal.querySelector('.btn-primary');
        if (confirmRescheduleBtn) {
            confirmRescheduleBtn.addEventListener('click', function() {
                handleReschedule(rescheduleModal);
            });
        }
    }

    // Cancel Modal
    const cancelModal = document.getElementById('cancelModal');
    if (cancelModal) {
        const confirmCancelBtn = cancelModal.querySelector('.btn-danger');
        if (confirmCancelBtn) {
            confirmCancelBtn.addEventListener('click', function() {
                handleCancellation(cancelModal);
            });
        }
    }

    // Review Modal
    const reviewModal = document.getElementById('reviewModal');
    if (reviewModal) {
        const submitReviewBtn = reviewModal.querySelector('.btn-primary');
        if (submitReviewBtn) {
            submitReviewBtn.addEventListener('click', function() {
                handleReviewSubmission(reviewModal);
            });
        }
    }
}

// Booking Actions
function handleReschedule(modal) {
    const date = modal.querySelector('input[type="date"]').value;
    const time = modal.querySelector('select').value;
    const reason = modal.querySelector('textarea').value;

    if (!date || !time) {
        showError('Please select both date and time');
        return;
    }

    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        bootstrap.Modal.getInstance(modal).hide();
        showSuccess('Booking rescheduled successfully');
        // Update UI to reflect changes
    }, 1000);
}

function handleCancellation(modal) {
    const reason = modal.querySelector('select').value;
    const comments = modal.querySelector('textarea').value;

    if (!reason) {
        showError('Please select a reason for cancellation');
        return;
    }

    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        bootstrap.Modal.getInstance(modal).hide();
        showSuccess('Booking cancelled successfully');
        // Update UI to reflect changes
    }, 1000);
}

function handleReviewSubmission(modal) {
    const rating = modal.querySelector('.rating-input').dataset.rating;
    const review = modal.querySelector('textarea').value;
    const photos = modal.querySelector('input[type="file"]').files;

    if (!rating) {
        showError('Please provide a rating');
        return;
    }

    if (!review) {
        showError('Please write a review');
        return;
    }

    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        bootstrap.Modal.getInstance(modal).hide();
        showSuccess('Review submitted successfully');
        // Update UI to reflect changes
    }, 1000);
}

// UI State Management
function showLoadingState() {
    // Add loading overlay
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    document.body.appendChild(overlay);
}

function hideLoadingState() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function showSuccess(message) {
    showToast(message, 'success');
}

function showError(message) {
    showToast(message, 'danger');
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0 position-fixed top-0 end-0 m-3`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.style.zIndex = '1050';

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;

    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
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
