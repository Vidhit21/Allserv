document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const requestCards = document.querySelectorAll('.request-card');

        requestCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const shouldShow = cardText.includes(searchTerm);
            card.style.display = shouldShow ? 'flex' : 'none';
        });
    });

    // Request action buttons
    const actionButtons = {
        accept: document.querySelectorAll('.btn-primary:not(.dropdown-toggle)'),
        decline: document.querySelectorAll('.btn-outline-danger'),
        start: document.querySelectorAll('.btn-success'),
        complete: document.querySelectorAll('.btn-success:contains("Complete")'),
        contact: document.querySelectorAll('.btn-outline-primary:contains("Contact")'),
        report: document.querySelectorAll('.btn-outline-warning'),
        update: document.querySelectorAll('.btn-outline-primary:contains("Update")')
    };

    // Accept Request
    actionButtons.accept.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            const badge = card.querySelector('.badge');
            
            // Update badge
            badge.className = 'badge bg-success';
            badge.textContent = 'Accepted';
            
            // Update actions
            const actions = card.querySelector('.request-actions');
            actions.innerHTML = `
                <button class="btn btn-success">Start Service</button>
                <button class="btn btn-outline-primary">Contact Customer</button>
                <button class="btn btn-outline-secondary">
                    <i class="fas fa-map-marked-alt"></i> Get Directions
                </button>
            `;
            
            // Move card to accepted tab
            const acceptedTab = document.querySelector('#acceptedRequests .request-cards');
            acceptedTab.appendChild(card);
        });
    });

    // Decline Request
    actionButtons.decline.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            if (confirm('Are you sure you want to decline this request?')) {
                card.remove();
            }
        });
    });

    // Start Service
    actionButtons.start.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            const badge = card.querySelector('.badge');
            
            // Update badge
            badge.className = 'badge bg-warning';
            badge.textContent = 'In Progress';
            
            // Update actions
            const actions = card.querySelector('.request-actions');
            actions.innerHTML = `
                <button class="btn btn-success">Complete Service</button>
                <button class="btn btn-outline-warning">Report Issue</button>
                <button class="btn btn-outline-primary">Update Status</button>
            `;
            
            // Move card to in progress tab
            const inProgressTab = document.querySelector('#inProgress .request-cards');
            inProgressTab.appendChild(card);
        });
    });

    // Filter dropdown functionality
    const filterDropdown = document.querySelector('#filterDropdown');
    filterDropdown?.addEventListener('click', function(e) {
        const filterType = e.target.textContent.trim();
        const requestCards = document.querySelectorAll('.request-card');

        requestCards.forEach(card => {
            const status = card.querySelector('.badge').textContent.trim();
            if (filterType === 'All Requests' || status === filterType) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Tab change animation
    const tabButtons = document.querySelectorAll('.nav-tabs .nav-link');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetId);
            
            // Remove show class from all panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show');
            });
            
            // Add show class to target pane
            setTimeout(() => {
                targetPane.classList.add('show');
            }, 150);
        });
    });
});
