document.addEventListener('DOMContentLoaded', function() {
    // Form switching
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    // Registration steps
    const regSteps = document.querySelectorAll('.reg-step');
    const progressBar = document.querySelector('.progress-bar');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');

    // Switch to registration form
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    });

    // Switch to login form
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    // Handle registration steps
    let currentStep = 0;

    function updateProgress() {
        const progress = ((currentStep + 1) / regSteps.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function showStep(stepIndex) {
        regSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        updateProgress();
    }

    // Next step buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep = Math.min(currentStep + 1, regSteps.length - 1);
                showStep(currentStep);
            }
        });
    });

    // Previous step buttons
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep = Math.max(currentStep - 1, 0);
            showStep(currentStep);
        });
    });

    // Form validation
    function validateStep(step) {
        const currentStepForm = regSteps[step];
        const inputs = currentStepForm.querySelectorAll('input, select');
        let isValid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value) {
                isValid = false;
                showError(input, 'This field is required');
            } else {
                clearError(input);
            }

            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid email address');
                }
            }

            // Phone validation
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                if (!phoneRegex.test(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid phone number');
                }
            }
        });

        return isValid;
    }

    // Password strength meter
    const passwordInput = document.getElementById('regPassword');
    const strengthMeter = document.querySelector('.strength-meter');

    passwordInput?.addEventListener('input', () => {
        const password = passwordInput.value;
        const strength = calculatePasswordStrength(password);
        updateStrengthMeter(strength);
    });

    function calculatePasswordStrength(password) {
        let score = 0;
        
        // Length check
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        
        // Character variety checks
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        return Math.min(score, 3); // 0 = none, 1 = weak, 2 = medium, 3 = strong
    }

    function updateStrengthMeter(strength) {
        strengthMeter.className = 'strength-meter';
        if (strength === 1) strengthMeter.classList.add('weak');
        else if (strength === 2) strengthMeter.classList.add('medium');
        else if (strength === 3) strengthMeter.classList.add('strong');
    }

    // File upload handling
    const uploadAreas = document.querySelectorAll('.upload-area');

    uploadAreas.forEach(area => {
        area.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*,.pdf';
            input.click();

            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Update UI to show selected file
                    const fileName = document.createElement('p');
                    fileName.textContent = file.name;
                    fileName.classList.add('selected-file');
                    
                    // Clear previous selection
                    const existing = area.querySelector('.selected-file');
                    if (existing) existing.remove();
                    
                    area.appendChild(fileName);
                }
            });
        });

        // Drag and drop handling
        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });

        area.addEventListener('dragleave', () => {
            area.classList.remove('dragover');
        });

        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            
            const file = e.dataTransfer.files[0];
            if (file) {
                const fileName = document.createElement('p');
                fileName.textContent = file.name;
                fileName.classList.add('selected-file');
                
                const existing = area.querySelector('.selected-file');
                if (existing) existing.remove();
                
                area.appendChild(fileName);
            }
        });
    });

    // Error handling functions
    function showError(input, message) {
        const formFloating = input.closest('.form-floating');
        let errorDiv = formFloating.querySelector('.error-message');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-danger small mt-1';
            formFloating.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.classList.add('is-invalid');
    }

    function clearError(input) {
        const formFloating = input.closest('.form-floating');
        const errorDiv = formFloating.querySelector('.error-message');
        
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('is-invalid');
    }

    // Form submission handling
    const loginFormElement = loginForm.querySelector('form');
    loginFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your login form submission logic here
        console.log('Login form submitted');
    });

    const registerFormElement = document.getElementById('regStep3');
    registerFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStep(2)) {
            // Add your registration form submission logic here
            console.log('Registration form submitted');
        }
    });
});
