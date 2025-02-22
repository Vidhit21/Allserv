// Authentication Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Password Toggle Visibility
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    if (togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            
            // Toggle eye icon
            const eyeIcon = this.querySelector('i');
            eyeIcon.classList.toggle('fa-eye');
            eyeIcon.classList.toggle('fa-eye-slash');
        });
    }

    // Form Validation and Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Basic validation
            if (!email || !password) {
                showAlert('Please fill in all fields', 'danger');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }

            // Simulate login API call
            simulateLogin(email, password, rememberMe);
        });
    }

    // Registration Form Validation and Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const userType = document.querySelector('input[name="userType"]:checked').value;
            const termsAccepted = document.getElementById('termsAccepted').checked;

            // Validation
            if (!fullName || !email || !phone || !password || !confirmPassword) {
                showAlert('Please fill in all fields', 'danger');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }

            if (!isValidPhone(phone)) {
                showAlert('Please enter a valid phone number', 'danger');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'danger');
                return;
            }

            if (!termsAccepted) {
                showAlert('Please accept the terms and conditions', 'danger');
                return;
            }

            // Simulate registration API call
            simulateRegistration(fullName, email, phone, password, userType);
        });
    }
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    const form = document.querySelector('.auth-form');
    form.insertBefore(alertDiv, form.firstChild);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// API Simulation Functions
function simulateLogin(email, password, rememberMe) {
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;

    // Simulate API delay
    setTimeout(() => {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Simulate successful login
        showAlert('Login successful! Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = '../dashboard/user.html';
        }, 1500);
    }, 2000);
}

function simulateRegistration(fullName, email, phone, password, userType) {
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;

    // Simulate API delay
    setTimeout(() => {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Simulate successful registration
        showAlert('Registration successful! Redirecting to login...', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }, 2000);
}
