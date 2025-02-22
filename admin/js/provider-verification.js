// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeProviderCards();
});

// Initialize sidebar navigation
function initializeSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-nav-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation
            const page = this.textContent.trim().toLowerCase();
            if (page === 'dashboard') {
                window.location.href = 'index.html';
            }
        });
    });
}

// Initialize provider cards
function initializeProviderCards() {
    // Add click handlers for view details buttons
    const viewButtons = document.querySelectorAll('.provider-actions .btn-outline');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const providerId = this.getAttribute('onclick').match(/\d+/)[0];
            toggleDetails(providerId);
        });
    });

    // Add click handlers for verification action buttons
    const actionButtons = document.querySelectorAll('.verification-actions .btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            handleVerificationAction(this);
        });
    });
}

// Toggle provider details visibility
function viewDetails(providerId) {
    const detailsSection = document.getElementById(`details-${providerId}`);
    const isActive = detailsSection.classList.contains('active');
    
    // Close all other detail sections
    document.querySelectorAll('.provider-details').forEach(section => {
        section.classList.remove('active');
    });
    
    // Toggle the clicked section
    if (!isActive) {
        detailsSection.classList.add('active');
    }
}

// Handle verification actions (Approve, Reject, Request More Info)
function handleVerificationAction(button) {
    const action = button.textContent.trim().toLowerCase();
    const providerCard = button.closest('.provider-card');
    const providerName = providerCard.querySelector('.provider-info h3').textContent;
    
    // Show confirmation dialog
    if (confirm(`Are you sure you want to ${action} ${providerName}'s application?`)) {
        // Here you would typically make an API call to update the provider's status
        // For now, we'll just show a success message
        alert(`Provider ${providerName} has been ${action}ed successfully`);
        
        // Update the UI
        if (action === 'approve' || action === 'reject') {
            providerCard.remove();
            updateStats(action);
        }
    }
}

// Update verification stats
function updateStats(action) {
    const statsMap = {
        'approve': {
            decrease: 'pending',
            increase: 'approved'
        },
        'reject': {
            decrease: 'pending',
            increase: 'rejected'
        }
    };
    
    if (statsMap[action]) {
        const { decrease, increase } = statsMap[action];
        
        // Update pending count
        const pendingElement = document.querySelector('.stat-icon.pending + .stat-info h3');
        let pendingCount = parseInt(pendingElement.textContent);
        pendingElement.textContent = --pendingCount;
        
        // Update approved/rejected count
        const increaseElement = document.querySelector(`.stat-icon.${increase} + .stat-info h3`);
        let increaseCount = parseInt(increaseElement.textContent);
        increaseElement.textContent = ++increaseCount;
    }
}
