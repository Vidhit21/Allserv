document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password });
            
            // For demo purposes, simulate successful login
            showToast('Login successful!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }

    // Register Form Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirmPassword').value
            };

            if (formData.password !== formData.confirmPassword) {
                showToast('Passwords do not match!', 'error');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Registration attempt:', formData);

            // For demo purposes, simulate successful registration
            showToast('Registration successful!', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Toast Notification System
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        const container = document.querySelector('.toast-container') || createToastContainer();
        container.appendChild(toast);

        // Trigger reflow
        toast.offsetHeight;

        // Show toast
        toast.classList.add('visible');

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
});
