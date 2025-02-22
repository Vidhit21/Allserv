document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
    initializeFileUpload();
    initializeSupportForm();
});

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

function initializeFileUpload() {
    const fileUpload = document.getElementById('fileUpload');
    const fileInput = fileUpload.querySelector('input[type="file"]');
    const fileList = document.getElementById('fileList');

    // Handle click on upload area
    fileUpload.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle drag and drop
    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.classList.add('dragover');
    });

    fileUpload.addEventListener('dragleave', () => {
        fileUpload.classList.remove('dragover');
    });

    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showToast('File size should not exceed 5MB');
                return;
            }

            // Create file item
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <i class="fas fa-file"></i>
                <span class="file-name">${file.name}</span>
                <i class="fas fa-times remove-file"></i>
            `;

            // Add remove functionality
            fileItem.querySelector('.remove-file').addEventListener('click', () => {
                fileItem.remove();
            });

            fileList.appendChild(fileItem);
        });
    }
}

function initializeSupportForm() {
    const form = document.getElementById('supportForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            submitSupportTicket();
        }
    });
}

function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !category || !subject || !message) {
        showToast('Please fill in all required fields');
        return false;
    }

    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitSupportTicket() {
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        bookingId: document.getElementById('bookingId').value,
        category: document.getElementById('category').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        files: Array.from(document.querySelectorAll('.file-item')).map(item => 
            item.querySelector('.file-name').textContent
        )
    };

    // In a real application, this would make an API call
    console.log('Submitting support ticket:', formData);

    // Show loading state
    const submitButton = document.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

    // Simulate API call
    setTimeout(() => {
        // Reset form
        document.getElementById('supportForm').reset();
        document.getElementById('fileList').innerHTML = '';
        
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        // Show success message
        showToast('Support ticket submitted successfully');

        // Add new ticket to list
        addNewTicket(formData);
    }, 2000);
}

function addNewTicket(formData) {
    const ticketList = document.querySelector('.ticket-list');
    const ticketId = 'TIC' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    const ticketItem = document.createElement('div');
    ticketItem.className = 'ticket-item';
    ticketItem.innerHTML = `
        <div class="ticket-status status-open">Open</div>
        <div class="ticket-info">
            <div class="ticket-subject">${formData.subject}</div>
            <div class="ticket-date">Submitted on ${new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })}</div>
            <div class="ticket-id">Ticket ID: ${ticketId}</div>
        </div>
        <a href="#" class="view-ticket">View Details</a>
    `;

    ticketList.insertBefore(ticketItem, ticketList.firstChild);
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
