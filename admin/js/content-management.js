// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeContentSections();
    initializeModal();
    initializeTinyMCE();
    initializeEventListeners();
});

// Initialize sidebar navigation
function initializeSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-nav-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Initialize content sections
function initializeContentSections() {
    const contentTypeSelect = document.querySelector('.content-type-select');
    const sections = document.querySelectorAll('.content-section');

    contentTypeSelect.addEventListener('change', function() {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(this.value).classList.add('active');
        updateModalFields(this.value);
    });
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('contentModal');
    const addNewBtn = document.getElementById('addNewBtn');
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('[data-dismiss="modal"]');

    addNewBtn.addEventListener('click', () => {
        const contentType = document.querySelector('.content-type-select').value;
        updateModalFields(contentType);
        modal.classList.add('active');
    });

    [closeBtn, cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Initialize TinyMCE editor
function initializeTinyMCE() {
    tinymce.init({
        selector: '.rich-text-editor',
        height: 300,
        menubar: false,
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help'
    });
}

// Update modal fields based on content type
function updateModalFields(contentType) {
    const modalTitle = document.querySelector('.modal-header h2');
    const modalBody = document.querySelector('.modal-body');
    
    // Clear previous content
    modalBody.innerHTML = '';
    
    switch(contentType) {
        case 'services':
            modalTitle.textContent = 'Add New Service Category';
            modalBody.innerHTML = `
                <div class="form-group">
                    <label>Category Name</label>
                    <input type="text" class="form-control" placeholder="Enter category name">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" rows="3" placeholder="Enter category description"></textarea>
                </div>
                <div class="form-group">
                    <label>Icon</label>
                    <select class="form-control">
                        <option>Select icon</option>
                        <option value="broom">Cleaning</option>
                        <option value="wrench">Plumbing</option>
                        <option value="bolt">Electrical</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <div class="toggle-switch">
                        <input type="checkbox" id="status" checked>
                        <label for="status">Active</label>
                    </div>
                </div>
            `;
            break;
            
        case 'pricing':
            modalTitle.textContent = 'Add New Pricing Plan';
            modalBody.innerHTML = `
                <div class="form-group">
                    <label>Service Type</label>
                    <input type="text" class="form-control" placeholder="Enter service type">
                </div>
                <div class="form-group">
                    <label>Base Price</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" placeholder="0.00">
                        <span class="input-group-text">/hr</span>
                    </div>
                </div>
                <div class="form-group">
                    <label>Peak Hours Surcharge (%)</label>
                    <input type="number" class="form-control" placeholder="Enter percentage">
                </div>
                <div class="form-group">
                    <label>Weekend Surcharge (%)</label>
                    <input type="number" class="form-control" placeholder="Enter percentage">
                </div>
            `;
            break;
            
        case 'faqs':
            modalTitle.textContent = 'Add New FAQ';
            modalBody.innerHTML = `
                <div class="form-group">
                    <label>Question</label>
                    <input type="text" class="form-control" placeholder="Enter question">
                </div>
                <div class="form-group">
                    <label>Answer</label>
                    <textarea class="rich-text-editor"></textarea>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select class="form-control">
                        <option>General</option>
                        <option>Service Provider</option>
                        <option>Customer</option>
                        <option>Pricing</option>
                    </select>
                </div>
            `;
            initializeTinyMCE();
            break;
            
        case 'announcements':
            modalTitle.textContent = 'Add New Announcement';
            modalBody.innerHTML = `
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" placeholder="Enter announcement title">
                </div>
                <div class="form-group">
                    <label>Content</label>
                    <textarea class="rich-text-editor"></textarea>
                </div>
                <div class="form-group">
                    <label>Type</label>
                    <select class="form-control">
                        <option value="maintenance">Maintenance</option>
                        <option value="update">Platform Update</option>
                        <option value="notice">Important Notice</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Visibility</label>
                    <select class="form-control">
                        <option value="all">All Users</option>
                        <option value="providers">Service Providers Only</option>
                        <option value="customers">Customers Only</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Schedule</label>
                    <input type="datetime-local" class="form-control">
                </div>
            `;
            initializeTinyMCE();
            break;
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // FAQ toggle
    document.querySelectorAll('.faq-item .btn-icon[title="Toggle"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            faqItem.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-chevron-down');
            this.querySelector('i').classList.toggle('fa-chevron-up');
        });
    });

    // Delete buttons
    document.querySelectorAll('.btn-icon[title="Delete"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = this.closest('.category-card, tr, .faq-item, .announcement-card');
            const itemType = document.querySelector('.content-type-select').value;
            if (confirm(`Are you sure you want to delete this ${itemType.slice(0, -1)}?`)) {
                item.remove();
            }
        });
    });

    // Edit buttons
    document.querySelectorAll('.btn-icon[title="Edit"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const contentType = document.querySelector('.content-type-select').value;
            const modal = document.getElementById('contentModal');
            updateModalFields(contentType);
            // Here you would typically populate the form with existing data
            modal.classList.add('active');
        });
    });
}
