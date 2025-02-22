document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 &&
                !sidebar.contains(e.target) &&
                !toggleBtn.contains(e.target) &&
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    // Tab Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.dataset.tab;
            
            // Update navigation
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update tab content
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Password Strength Indicator
    const passwordInput = document.getElementById('newPassword');
    const strengthBar = document.getElementById('passwordStrength');

    if (passwordInput && strengthBar) {
        passwordInput.addEventListener('input', () => {
            const strength = calculatePasswordStrength(passwordInput.value);
            updatePasswordStrengthIndicator(strength);
        });
    }

    // Form Submissions
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add password update logic here
            showAlert('Password updated successfully!', 'success');
        });
    }

    // Payment Method Management
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        const removeBtn = method.querySelector('.btn-outline-danger');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to remove this payment method?')) {
                    method.remove();
                    showAlert('Payment method removed successfully!', 'success');
                }
            });
        }
    });

    // Notification Toggles
    const notificationToggles = document.querySelectorAll('.form-check-input[type="checkbox"]');
    notificationToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const status = toggle.checked ? 'enabled' : 'disabled';
            const notificationName = toggle.closest('.notification-item')
                ?.querySelector('h6')?.textContent || 'Notification';
            showAlert(`${notificationName} ${status}!`, 'info');
        });
    });

    // Theme Switcher
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const theme = radio.value;
            document.body.className = theme === 'dark' ? 'dark-theme' : '';
            showAlert(`Theme switched to ${theme} mode!`, 'info');
        });
    });
});

// Helper Functions
function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 25; // Uppercase
    if (/[a-z]/.test(password)) strength += 25; // Lowercase
    if (/[0-9]/.test(password)) strength += 15; // Numbers
    if (/[^A-Za-z0-9]/.test(password)) strength += 10; // Special characters
    
    return Math.min(100, strength);
}

function updatePasswordStrengthIndicator(strength) {
    const strengthBar = document.getElementById('passwordStrength');
    if (!strengthBar) return;

    strengthBar.style.width = `${strength}%`;
    
    // Update color based on strength
    if (strength < 30) {
        strengthBar.className = 'progress-bar bg-danger';
    } else if (strength < 70) {
        strengthBar.className = 'progress-bar bg-warning';
    } else {
        strengthBar.className = 'progress-bar bg-success';
    }
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alert.style.zIndex = '1050';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Add to document
    document.body.appendChild(alert);

    // Remove after 3 seconds
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculatePasswordStrength,
        updatePasswordStrengthIndicator,
        showAlert
    };
}
