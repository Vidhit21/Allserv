document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeBookingActions();
    initializeReviewSystem();
});

function initializeFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    const serviceFilter = document.getElementById('serviceFilter');

    // Set minimum date for date filter
    const today = new Date().toISOString().split('T')[0];
    dateFilter.min = today;

    // Add event listeners for filters
    statusFilter.addEventListener('change', filterBookings);
    dateFilter.addEventListener('change', filterBookings);
    serviceFilter.addEventListener('change', filterBookings);
}

function filterBookings() {
    const status = document.getElementById('statusFilter').value;
    const date = document.getElementById('dateFilter').value;
    const service = document.getElementById('serviceFilter').value;

    const bookingItems = document.querySelectorAll('.booking-item');
    let visibleCount = 0;

    bookingItems.forEach(item => {
        let showItem = true;

        // Status filter
        if (status && !item.querySelector('.booking-status').classList.contains(`status-${status}`)) {
            showItem = false;
        }

        // Service filter
        if (service) {
            const serviceText = item.querySelector('.booking-service').textContent.toLowerCase();
            if (!serviceText.includes(service.toLowerCase())) {
                showItem = false;
            }
        }

        // Date filter
        if (date) {
            const bookingDate = item.querySelector('.booking-details').textContent;
            // In a real application, we would parse and compare dates properly
            // This is just a simple example
            if (!bookingDate.includes(date)) {
                showItem = false;
            }
        }

        item.style.display = showItem ? 'grid' : 'none';
        if (showItem) visibleCount++;
    });

    // Show/hide empty state
    const emptyState = document.querySelector('.empty-state');
    const bookingList = document.querySelector('.booking-list');
    
    if (visibleCount === 0) {
        emptyState.style.display = 'block';
        bookingList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        bookingList.style.display = 'block';
    }
}

function initializeBookingActions() {
    // Cancel booking
    document.querySelectorAll('.btn-cancel').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel this booking?')) {
                const bookingItem = this.closest('.booking-item');
                const bookingId = bookingItem.querySelector('.booking-id').textContent.split(': ')[1];
                cancelBooking(bookingId, bookingItem);
            }
        });
    });

    // Reschedule booking
    document.querySelectorAll('.btn-reschedule').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.closest('.booking-item')
                .querySelector('.booking-id').textContent.split(': ')[1];
            rescheduleBooking(bookingId);
        });
    });

    // Write review
    document.querySelectorAll('.btn-review').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.closest('.booking-item')
                .querySelector('.booking-id').textContent.split(': ')[1];
            openReviewModal(bookingId);
        });
    });
}

function cancelBooking(bookingId, bookingItem) {
    // In a real application, this would make an API call
    console.log(`Cancelling booking ${bookingId}`);
    
    // Update booking status
    const statusDiv = bookingItem.querySelector('.booking-status');
    statusDiv.className = 'booking-status status-cancelled';
    statusDiv.textContent = 'Cancelled';
    
    // Update actions
    const actionsDiv = bookingItem.querySelector('.booking-actions');
    actionsDiv.innerHTML = '<button class="btn-reschedule">Book Again</button>';
    
    showToast('Booking cancelled successfully');
}

function rescheduleBooking(bookingId) {
    // In a real application, this would redirect to a rescheduling page
    console.log(`Rescheduling booking ${bookingId}`);
    window.location.href = `booking.html?reschedule=${bookingId}`;
}

function initializeReviewSystem() {
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            highlightStars(rating);
        });

        star.addEventListener('mouseout', function() {
            highlightStars(selectedRating);
        });

        star.addEventListener('click', function() {
            selectedRating = this.dataset.rating;
            highlightStars(selectedRating);
        });
    });

    const reviewForm = document.querySelector('.review-form');
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (selectedRating === 0) {
            showToast('Please select a rating');
            return;
        }
        submitReview(selectedRating, this.querySelector('textarea').value);
    });
}

function highlightStars(rating) {
    document.querySelectorAll('.star').forEach(star => {
        const starRating = star.dataset.rating;
        star.classList.toggle('active', starRating <= rating);
    });
}

function openReviewModal(bookingId) {
    document.getElementById('modalOverlay').classList.add('show');
    document.getElementById('reviewModal').classList.add('show');
    // Store booking ID for submission
    document.getElementById('reviewModal').dataset.bookingId = bookingId;
}

function closeReviewModal() {
    document.getElementById('modalOverlay').classList.remove('show');
    document.getElementById('reviewModal').classList.remove('show');
    // Reset form
    document.querySelector('.review-form').reset();
    document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
}

function submitReview(rating, comment) {
    const bookingId = document.getElementById('reviewModal').dataset.bookingId;
    
    // In a real application, this would make an API call
    console.log(`Submitting review for booking ${bookingId}:`, {
        rating,
        comment
    });
    
    closeReviewModal();
    showToast('Thank you for your review!');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
