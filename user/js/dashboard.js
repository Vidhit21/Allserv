// Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Sidebar Toggle
    const btnMenu = document.querySelector('.btn-menu');
    const btnCloseSidebar = document.querySelector('.btn-close-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (btnMenu) {
        btnMenu.addEventListener('click', function() {
            sidebar.classList.add('show');
        });
    }
    
    if (btnCloseSidebar) {
        btnCloseSidebar.addEventListener('click', function() {
            sidebar.classList.remove('show');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            if (!sidebar.contains(e.target) && !btnMenu.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });

    // Navigation Active State
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            // Add your search logic here
            console.log('Searching for:', e.target.value);
        }, 300));
    }

    // Notification Dropdown
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            // Add your notification logic here
            console.log('Notifications clicked');
        });
    }

    // Booking Actions
    const bookingActions = document.querySelectorAll('.booking-actions button');
    bookingActions.forEach(button => {
        button.addEventListener('click', function(e) {
            const action = this.textContent.toLowerCase();
            const bookingCard = this.closest('.booking-card');
            const serviceName = bookingCard.querySelector('h4').textContent;
            
            if (action.includes('cancel')) {
                handleCancelBooking(serviceName);
            } else if (action.includes('reschedule')) {
                handleRescheduleBooking(serviceName);
            } else if (action.includes('view details')) {
                handleViewBookingDetails(serviceName);
            }
        });
    });

    // Service Booking
    const bookNowButtons = document.querySelectorAll('.service-card .btn-primary');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceName = serviceCard.querySelector('h4').textContent;
            handleBookService(serviceName);
        });
    });
});

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

// Booking Handlers
function handleCancelBooking(serviceName) {
    if (confirm(`Are you sure you want to cancel your ${serviceName} booking?`)) {
        // Add your cancellation logic here
        console.log('Cancelling booking for:', serviceName);
        // Show success message
        showAlert('Booking cancelled successfully', 'success');
    }
}

function handleRescheduleBooking(serviceName) {
    // Add your rescheduling logic here
    console.log('Rescheduling booking for:', serviceName);
    // This would typically open a modal with a date/time picker
    showAlert('Please select a new date and time', 'info');
}

function handleViewBookingDetails(serviceName) {
    // Add your view details logic here
    console.log('Viewing details for:', serviceName);
    // This would typically open a modal with booking details
}

function handleBookService(serviceName) {
    // Add your booking logic here
    console.log('Booking service:', serviceName);
    // This would typically redirect to the booking page
    showAlert('Redirecting to booking page...', 'info');
}

// Alert System
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.appendChild(alertDiv);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Handle Window Resize
window.addEventListener('resize', debounce(function() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth >= 992) {
        sidebar.classList.remove('show');
    }
}, 250));
