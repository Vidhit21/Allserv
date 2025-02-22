// Dashboard specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard components
    initUserProfile();
    initQuickActions();
    initServiceCards();
});

// User Profile Dropdown
function initUserProfile() {
    const userProfile = document.querySelector('.user-profile');
    const dropdown = document.createElement('div');
    dropdown.className = 'user-dropdown';
    dropdown.style.display = 'none';
    
    dropdown.innerHTML = `
        <div class="dropdown-item"><i class="fas fa-user"></i> My Profile</div>
        <div class="dropdown-item"><i class="fas fa-cog"></i> Settings</div>
        <div class="dropdown-item"><i class="fas fa-question-circle"></i> Help</div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item"><i class="fas fa-sign-out-alt"></i> Sign Out</div>
    `;
    
    userProfile.appendChild(dropdown);
    
    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
    
    document.addEventListener('click', function() {
        dropdown.style.display = 'none';
    });
}

// Quick Actions
function initQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'New Booking':
            // Handle new booking action
            showToast('Redirecting to booking page...', 'info');
            break;
        case 'Contact Concierge':
            // Handle concierge contact
            showToast('Opening concierge chat...', 'info');
            break;
        case 'Schedule Service':
            // Handle service scheduling
            showToast('Opening scheduler...', 'info');
            break;
    }
}

// Service Cards
function initServiceCards() {
    const rescheduleButtons = document.querySelectorAll('.service-actions .btn-secondary');
    const detailButtons = document.querySelectorAll('.service-actions .btn-primary');
    
    rescheduleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Handle reschedule action
            showToast('Opening reschedule dialog...', 'info');
        });
    });
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Handle view details action
            showToast('Loading service details...', 'info');
        });
    });
}

// Update stats periodically
setInterval(function() {
    updateStats();
}, 60000); // Update every minute

function updateStats() {
    // Simulate real-time stats update
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        // Add slight random variations to create a live feel
        const currentValue = parseFloat(stat.textContent);
        const variation = Math.random() * 0.2 - 0.1; // Random variation between -0.1 and 0.1
        stat.textContent = (currentValue + variation).toFixed(1);
    });
}
