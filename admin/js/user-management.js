// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeTable();
    initializeFilters();
    initializePagination();
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
        });
    });
}

// Initialize table functionality
function initializeTable() {
    // Handle select all checkbox
    const selectAll = document.querySelector('.select-all');
    const userCheckboxes = document.querySelectorAll('.select-user');

    selectAll.addEventListener('change', function() {
        userCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // Handle individual checkboxes
    userCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(userCheckboxes).every(c => c.checked);
            selectAll.checked = allChecked;
        });
    });

    // Handle action buttons
    const actionButtons = document.querySelectorAll('.btn-icon');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('title').toLowerCase();
            const userName = this.closest('tr').querySelector('.user-name').textContent;
            handleUserAction(action, userName);
        });
    });
}

// Initialize filters
function initializeFilters() {
    const filters = document.querySelectorAll('.filter-select');
    filters.forEach(filter => {
        filter.addEventListener('change', function() {
            // Here you would typically make an API call to filter the data
            console.log(`Filter changed: ${this.value}`);
        });
    });
}

// Initialize pagination
function initializePagination() {
    const pageButtons = document.querySelectorAll('.btn-page');
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.disabled) return;

            // Remove active class from all buttons
            pageButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button if it's a number
            if (!this.querySelector('i')) {
                this.classList.add('active');
            }

            // Here you would typically make an API call to get the data for the selected page
            console.log(`Page changed: ${this.textContent.trim()}`);
        });
    });
}

// Handle user actions (Edit, Disable, Delete)
function handleUserAction(action, userName) {
    switch(action) {
        case 'edit':
            // Here you would typically open a modal or navigate to edit page
            console.log(`Editing user: ${userName}`);
            break;
        case 'disable':
            if (confirm(`Are you sure you want to disable ${userName}?`)) {
                console.log(`Disabled user: ${userName}`);
                // Here you would typically make an API call to disable the user
            }
            break;
        case 'delete':
            if (confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
                console.log(`Deleted user: ${userName}`);
                // Here you would typically make an API call to delete the user
            }
            break;
    }
}

// Search functionality
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', debounce(function() {
    // Here you would typically make an API call to search users
    console.log(`Searching for: ${this.value}`);
}, 300));

// Debounce function to prevent too many API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
