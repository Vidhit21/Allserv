// Get service details from URL parameters
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentStep = 1;
    const totalSteps = 4;
    
    // Get DOM elements
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');
    const formSteps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const confirmButton = document.getElementById('confirmBooking');

    // Initialize the booking form
    function initializeBookingForm() {
        updateProgress();
        setupEventListeners();
        loadServiceDetails();
    }

    // Update progress bar
    function updateProgress() {
        progressSteps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        progressLines.forEach((line, index) => {
            if (index < currentStep - 1) {
                line.classList.add('active');
            } else {
                line.classList.remove('active');
            }
        });
    }

    // Show current step
    function showStep(stepNumber) {
        formSteps.forEach((step, index) => {
            if (index + 1 === stepNumber) {
                step.style.display = 'block';
            } else {
                step.style.display = 'none';
            }
        });
    }

    // Validate current step
    function validateStep(stepNumber) {
        const currentFormStep = document.getElementById('step' + stepNumber);
        const requiredFields = currentFormStep.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('error');
                showToast('Please fill in all required fields', 'error');
            } else {
                field.classList.remove('error');
            }
        });

        return isValid;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Next button clicks
        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (validateStep(currentStep)) {
                    if (currentStep < totalSteps) {
                        currentStep++;
                        showStep(currentStep);
                        updateProgress();
                        window.scrollTo(0, 0);
                    }
                }
            });
        });

        // Previous button clicks
        prevButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    showStep(currentStep);
                    updateProgress();
                    window.scrollTo(0, 0);
                }
            });
        });

        // Confirm booking button click
        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                if (validateStep(currentStep)) {
                    // Collect all form data
                    const formData = {
                        service: document.getElementById('serviceType').value,
                        package: document.getElementById('servicePackage').value,
                        date: document.getElementById('date').value,
                        time: document.getElementById('time').value,
                        address: document.getElementById('address').value,
                        city: document.getElementById('city').value,
                        zipcode: document.getElementById('zipcode').value,
                        payment: document.querySelector('input[name="payment"]:checked').value,
                        total: document.getElementById('summaryTotal').textContent
                    };

                    // Show success message
                    showToast('Booking confirmed successfully!', 'success');

                    // Store booking data in localStorage (for demo purposes)
                    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                    bookings.push({
                        ...formData,
                        id: Date.now(),
                        status: 'Pending',
                        bookingDate: new Date().toISOString()
                    });
                    localStorage.setItem('bookings', JSON.stringify(bookings));

                    // Redirect to booking history page after a short delay
                    setTimeout(() => {
                        window.location.href = 'booking-history.html';
                    }, 2000);
                }
            });
        }

        // Payment method change
        const paymentMethods = document.querySelectorAll('input[name="payment"]');
        paymentMethods.forEach(method => {
            method.addEventListener('change', () => {
                const cardDetails = document.getElementById('cardDetails');
                if (method.value === 'card') {
                    cardDetails.style.display = 'block';
                } else {
                    cardDetails.style.display = 'none';
                }
            });
        });

        // Promo code button
        const promoButton = document.querySelector('.promo-code button');
        if (promoButton) {
            promoButton.addEventListener('click', () => {
                const promoInput = document.querySelector('.promo-code input');
                if (promoInput.value) {
                    // Demo promo code logic
                    showToast('Promo code applied successfully!', 'success');
                    updateOrderSummary();
                } else {
                    showToast('Please enter a promo code', 'error');
                }
            });
        }
    }

    // Load service details
    function loadServiceDetails() {
        // Update confirmation details as user progresses
        const serviceType = document.getElementById('serviceType');
        const servicePackage = document.getElementById('servicePackage');

        serviceType.addEventListener('change', updateConfirmationDetails);
        servicePackage.addEventListener('change', updateConfirmationDetails);
    }

    // Update confirmation details
    function updateConfirmationDetails() {
        const confirmService = document.getElementById('confirmService');
        const confirmDateTime = document.getElementById('confirmDateTime');
        const confirmLocation = document.getElementById('confirmLocation');
        const confirmAmount = document.getElementById('confirmAmount');

        if (confirmService) {
            const serviceType = document.getElementById('serviceType').value;
            const servicePackage = document.getElementById('servicePackage').value;
            confirmService.textContent = `${serviceType} - ${servicePackage} Package`;
        }

        if (confirmDateTime) {
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            confirmDateTime.textContent = `${date} ${time}`;
        }

        if (confirmLocation) {
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const zipcode = document.getElementById('zipcode').value;
            confirmLocation.textContent = `${address}, ${city} ${zipcode}`;
        }

        if (confirmAmount) {
            confirmAmount.textContent = document.getElementById('summaryTotal').textContent;
        }
    }

    // Toast notification system
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

    // Initialize the form
    initializeBookingForm();
});

// Load service details from URL parameters
function loadServiceDetails(serviceId) {
    // Mock service data (replace with actual API call)
    const service = {
        id: serviceId || '1',
        name: 'Professional House Cleaning',
        description: 'Complete house cleaning service by experienced professionals',
        price: 99.99,
        originalPrice: 129.99,
        image: 'images/services/cleaning.jpg'
    };

    // Update the UI with service details
    document.getElementById('serviceName').textContent = service.name;
    document.getElementById('serviceDescription').textContent = service.description;
    document.getElementById('servicePrice').textContent = `$${service.price}`;
    document.getElementById('serviceOriginalPrice').textContent = `$${service.originalPrice}`;
    document.getElementById('serviceImage').src = service.image;
    document.getElementById('serviceImage').alt = service.name;

    // Update summary
    document.getElementById('summaryPrice').textContent = `$${service.price}`;
    updateTotalAmount(service.price);
}

function updateTotalAmount(servicePrice) {
    const serviceFee = 5.00;
    const total = parseFloat(servicePrice) + serviceFee;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
}

function initializeFormHandlers() {
    const form = document.getElementById('bookingForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Collect form data
        const formData = {
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            address: document.getElementById('address').value,
            notes: document.getElementById('notes').value,
            cardNumber: document.getElementById('cardNumber').value,
            expiryDate: document.getElementById('expiryDate').value,
            cvv: document.getElementById('cvv').value,
            cardName: document.getElementById('cardName').value
        };

        // Process booking
        processBooking(formData);
    });
}

function validateForm() {
    // Add validation for required fields
    const requiredFields = ['date', 'time', 'address', 'cardNumber', 'expiryDate', 'cvv', 'cardName'];
    let isValid = true;

    requiredFields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            showError(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            element.classList.add('error');
            isValid = false;
        } else {
            element.classList.remove('error');
        }
    });

    // Validate card number format
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber)) {
        showError('Please enter a valid 16-digit card number');
        isValid = false;
    }

    // Validate expiry date format (MM/YY)
    const expiryDate = document.getElementById('expiryDate').value;
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        showError('Please enter a valid expiry date (MM/YY)');
        isValid = false;
    }

    // Validate CVV format
    const cvv = document.getElementById('cvv').value;
    if (!/^\d{3}$/.test(cvv)) {
        showError('Please enter a valid 3-digit CVV');
        isValid = false;
    }

    return isValid;
}

function initializeCardFormatting() {
    // Format card number input
    const cardInput = document.getElementById('cardNumber');
    cardInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
    });

    // Format expiry date input
    const expiryInput = document.getElementById('expiryDate');
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
    });

    // Format CVV input
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
    });
}

function processBooking(formData) {
    // Show loading state
    const submitButton = document.querySelector('.btn-book');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    // Simulate API call
    setTimeout(() => {
        // Success scenario
        showSuccess('Booking confirmed! Redirecting to booking history...');
        
        // Redirect to booking history after 2 seconds
        setTimeout(() => {
            window.location.href = 'booking-history.html';
        }, 2000);
    }, 1500);
}

function showSuccess(message) {
    showToast(message, 'success');
}

function showError(message) {
    showToast(message, 'error');
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('visible'), 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateOrderSummary() {
    const basePrice = parseFloat(document.querySelector('.current-price').textContent.replace('$', ''));
    const addons = document.querySelectorAll('.addon-item input:checked');
    let total = basePrice;

    addons.forEach(addon => {
        total += parseFloat(addon.dataset.price);
    });

    const promoCode = document.querySelector('.promo-code input').value;
    if (promoCode === 'WELCOME10') {
        const discount = total * 0.1;
        document.querySelector('.summary-item.discount .amount').textContent = `-$${discount.toFixed(2)}`;
        total -= discount;
    }

    document.querySelector('.summary-item.total .amount').textContent = `$${total.toFixed(2)}`;
}
