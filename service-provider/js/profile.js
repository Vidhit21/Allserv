document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips and popovers
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => new bootstrap.Tooltip(tooltip));

    // Tab Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');
            
            // Update active states
            navItems.forEach(nav => nav.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Profile Image Upload
    const profilePhoto = document.querySelector('.profile-photo');
    const editPhotoBtn = profilePhoto.querySelector('.edit-photo');
    const profileImageInput = document.getElementById('profileImageInput');

    editPhotoBtn?.addEventListener('click', () => profileImageInput.click());
    profileImageInput?.addEventListener('change', handleImageUpload);

    // Cover Image Upload
    const coverPhoto = document.querySelector('.cover-photo');
    const editCoverBtn = coverPhoto.querySelector('.edit-cover');
    const coverImageInput = document.getElementById('coverImageInput');

    editCoverBtn?.addEventListener('click', () => coverImageInput.click());
    coverImageInput?.addEventListener('change', handleImageUpload);

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const isProfileImage = e.target.id === 'profileImageInput';
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSize) {
            showAlert('Image size should be less than 5MB', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            if (isProfileImage) {
                document.querySelector('.profile-photo img').src = event.target.result;
                document.querySelector('.user-profile img').src = event.target.result;
            } else {
                document.querySelector('.cover-photo img').src = event.target.result;
            }
            showAlert('Image updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }

    // Edit Profile Button
    const editProfileBtn = document.querySelector('.profile-actions .btn-primary');
    editProfileBtn?.addEventListener('click', () => {
        const currentInfo = document.querySelectorAll('.info-item p');
        currentInfo.forEach(info => {
            const text = info.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control';
            input.value = text;
            info.parentNode.replaceChild(input, info);
        });

        // Change button to Save
        editProfileBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        editProfileBtn.classList.remove('btn-primary');
        editProfileBtn.classList.add('btn-success');
        
        // Add click event for saving
        editProfileBtn.removeEventListener('click', arguments.callee);
        editProfileBtn.addEventListener('click', saveProfileChanges);
    });

    function saveProfileChanges() {
        const inputs = document.querySelectorAll('.info-item input');
        inputs.forEach(input => {
            const p = document.createElement('p');
            p.textContent = input.value;
            input.parentNode.replaceChild(p, input);
        });

        // Reset button
        const editProfileBtn = document.querySelector('.profile-actions .btn-success');
        editProfileBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
        editProfileBtn.classList.remove('btn-success');
        editProfileBtn.classList.add('btn-primary');
        
        showAlert('Profile updated successfully!', 'success');
    }

    // Skills Management
    const addSkillBtn = document.querySelector('.skills-grid').nextElementSibling;
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', () => {
            const skill = prompt('Enter new skill:');
            if (skill) {
                const skillTag = document.createElement('div');
                skillTag.className = 'skill-tag';
                skillTag.innerHTML = `${skill} <i class="fas fa-times"></i>`;
                document.querySelector('.skills-grid').appendChild(skillTag);
                
                // Add delete functionality
                skillTag.querySelector('i').addEventListener('click', () => {
                    skillTag.remove();
                    showAlert('Skill removed', 'success');
                });
                
                showAlert('Skill added successfully!', 'success');
            }
        });
    }

    // Service Management
    const services = document.querySelectorAll('.service-card');
    services.forEach(service => {
        const editBtn = service.querySelector('.edit-service');
        const deleteBtn = service.querySelector('.delete-service');

        editBtn?.addEventListener('click', () => {
            const title = service.querySelector('h4').textContent;
            const price = service.querySelector('.service-price h5').textContent;
            const description = service.querySelector('p').textContent;

            // Create edit form
            const form = document.createElement('form');
            form.innerHTML = `
                <div class="mb-3">
                    <label class="form-label">Service Title</label>
                    <input type="text" class="form-control" value="${title}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Price</label>
                    <input type="text" class="form-control" value="${price}">
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control">${description}</textarea>
                </div>
                <button type="submit" class="btn btn-primary">Save Changes</button>
            `;

            // Show in modal
            const modal = new bootstrap.Modal(document.getElementById('editServiceModal'));
            document.querySelector('.modal-body').innerHTML = '';
            document.querySelector('.modal-body').appendChild(form);
            modal.show();
        });

        deleteBtn?.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this service?')) {
                service.remove();
                showAlert('Service deleted successfully!', 'success');
            }
        });
    });

    // Document Upload
    const documentUpload = document.getElementById('documentUpload');
    const documentsGrid = document.querySelector('.documents-grid');
    
    documentUpload?.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const card = createDocumentCard(file);
            documentsGrid.insertBefore(card, documentsGrid.firstChild);
        });
        showAlert('Documents uploaded successfully!', 'success');
    });

    function createDocumentCard(file) {
        const card = document.createElement('div');
        card.className = 'document-card';
        
        const icon = getFileIcon(file.name);
        const size = formatFileSize(file.size);
        
        card.innerHTML = `
            <div class="document-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="document-info">
                <h6>${file.name}</h6>
                <span>${size}</span>
            </div>
            <div class="document-actions">
                <button class="btn btn-icon" data-bs-toggle="tooltip" title="Download">
                    <i class="fas fa-download"></i>
                </button>
                <button class="btn btn-icon text-danger" data-bs-toggle="tooltip" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // Add event listeners
        card.querySelector('.text-danger').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this document?')) {
                card.remove();
                showAlert('Document deleted successfully!', 'success');
            }
        });

        return card;
    }

    function getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        switch(ext) {
            case 'pdf': return 'fa-file-pdf';
            case 'doc':
            case 'docx': return 'fa-file-word';
            case 'xls':
            case 'xlsx': return 'fa-file-excel';
            case 'jpg':
            case 'jpeg':
            case 'png': return 'fa-file-image';
            default: return 'fa-file';
        }
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Review Filters
    const reviewFilters = document.querySelectorAll('[data-rating]');
    reviewFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const rating = filter.getAttribute('data-rating');
            const reviews = document.querySelectorAll('.review-card');
            
            reviewFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            reviews.forEach(review => {
                const reviewRating = review.getAttribute('data-rating');
                review.style.display = (rating === 'all' || reviewRating === rating) ? '' : 'none';
            });
        });
    });

    // Share Profile
    const shareBtn = document.querySelector('.btn-outline-primary');
    shareBtn?.addEventListener('click', async () => {
        try {
            await navigator.share({
                title: 'My AllServ Profile',
                text: 'Check out my service provider profile on AllServ',
                url: window.location.href
            });
        } catch (err) {
            // Fallback for browsers that don't support native sharing
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = window.location.href;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            showAlert('Profile link copied to clipboard!', 'success');
        }
    });

    // Alert System
    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed bottom-0 end-0 m-3`;
        alertDiv.style.zIndex = '1050';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // Responsive sidebar toggle
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    toggleBtn?.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Add interactive features for availability calendar
    function initializeCalendar() {
        const calendar = document.querySelector('.schedule-grid');
        if (!calendar) return;

        // Save availability changes
        calendar.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const timeSlot = e.target.closest('.time-slot');
                const day = timeSlot.closest('.day-schedule').querySelector('h5').textContent;
                const time = timeSlot.querySelector('span').textContent;
                const isAvailable = e.target.checked;

                // Visual feedback
                timeSlot.classList.toggle('active', isAvailable);
                showAlert(`${day} ${time} marked as ${isAvailable ? 'available' : 'unavailable'}`, 'success');
            }
        });

        // Add custom time slot
        const addTimeSlotBtns = document.querySelectorAll('.add-time-slot');
        addTimeSlotBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const day = btn.closest('.day-schedule');
                const timeSlots = day.querySelector('.time-slots');
                
                // Create time picker modal
                const modal = new bootstrap.Modal(document.getElementById('addTimeSlotModal'));
                const form = document.getElementById('timeSlotForm');
                
                form.onsubmit = (e) => {
                    e.preventDefault();
                    const startTime = form.querySelector('#startTime').value;
                    const endTime = form.querySelector('#endTime').value;
                    
                    const newSlot = document.createElement('div');
                    newSlot.className = 'time-slot';
                    newSlot.innerHTML = `
                        <input type="checkbox" checked>
                        <span>${startTime} - ${endTime}</span>
                        <button class="btn btn-icon btn-sm text-danger delete-slot">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    
                    timeSlots.appendChild(newSlot);
                    modal.hide();
                    showAlert('New time slot added', 'success');
                };
                
                modal.show();
            });
        });
    }

    // Enhanced document management
    function initializeDocumentManagement() {
        const documentsGrid = document.querySelector('.documents-grid');
        if (!documentsGrid) return;

        // Document preview
        documentsGrid.addEventListener('click', (e) => {
            const previewBtn = e.target.closest('[data-action="preview"]');
            if (previewBtn) {
                const docCard = previewBtn.closest('.document-card');
                const docName = docCard.querySelector('h6').textContent;
                const docType = docCard.querySelector('p').textContent.split('•')[0].trim();
                
                // Show preview modal
                const modal = new bootstrap.Modal(document.getElementById('documentPreviewModal'));
                const modalBody = document.querySelector('#documentPreviewModal .modal-body');
                const modalTitle = document.querySelector('#documentPreviewModal .modal-title');
                
                modalTitle.textContent = docName;
                
                // Simulate preview based on document type
                if (docType === 'PDF') {
                    modalBody.innerHTML = `<div class="pdf-preview">
                        <iframe src="assets/sample-pdf.pdf" width="100%" height="500px"></iframe>
                    </div>`;
                } else if (docType === 'JPG' || docType === 'PNG') {
                    modalBody.innerHTML = `<div class="image-preview">
                        <img src="assets/sample-image.jpg" class="img-fluid" alt="${docName}">
                    </div>`;
                }
                
                modal.show();
            }
        });

        // Document expiry tracking
        const documents = documentsGrid.querySelectorAll('.document-card');
        documents.forEach(doc => {
            const expiryDate = doc.getAttribute('data-expiry');
            if (expiryDate) {
                const daysUntilExpiry = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
                
                if (daysUntilExpiry <= 30) {
                    const badge = document.createElement('span');
                    badge.className = `badge ${daysUntilExpiry <= 7 ? 'bg-danger' : 'bg-warning'}`;
                    badge.textContent = `Expires in ${daysUntilExpiry} days`;
                    doc.querySelector('.document-info').appendChild(badge);
                }
            }
        });
    }

    // Enhanced service management
    function initializeServiceManagement() {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;

        // Service booking availability
        const services = servicesGrid.querySelectorAll('.service-card');
        services.forEach(service => {
            const availabilityBadge = document.createElement('div');
            availabilityBadge.className = 'availability-badge';
            
            // Simulate random availability
            const isAvailable = Math.random() > 0.3;
            const nextSlot = isAvailable ? 'Next available slot: Today, 2:00 PM' : 'Next available slot: Tomorrow, 9:00 AM';
            
            availabilityBadge.innerHTML = `
                <span class="badge ${isAvailable ? 'bg-success' : 'bg-warning'}">
                    ${isAvailable ? 'Available Now' : 'Limited Slots'}
                </span>
                <small class="d-block mt-2">${nextSlot}</small>
            `;
            
            service.querySelector('.service-price').appendChild(availabilityBadge);
        });

        // Quick book buttons
        services.forEach(service => {
            const bookBtn = document.createElement('button');
            bookBtn.className = 'btn btn-primary mt-3 w-100';
            bookBtn.innerHTML = '<i class="fas fa-calendar-plus"></i> Quick Book';
            
            bookBtn.addEventListener('click', () => {
                const modal = new bootstrap.Modal(document.getElementById('quickBookModal'));
                const form = document.getElementById('quickBookForm');
                const serviceName = service.querySelector('h4').textContent;
                
                document.getElementById('bookingServiceName').textContent = serviceName;
                
                // Populate available time slots
                const timeSelect = form.querySelector('#bookingTime');
                timeSelect.innerHTML = '';
                
                // Simulate available time slots
                const times = ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
                times.forEach(time => {
                    const option = document.createElement('option');
                    option.value = time;
                    option.textContent = time;
                    timeSelect.appendChild(option);
                });
                
                modal.show();
            });
            
            service.appendChild(bookBtn);
        });
    }

    // Enhanced review system
    function initializeReviewSystem() {
        const reviewsList = document.querySelector('.reviews-list');
        if (!reviewsList) return;

        // Review sorting
        const sortSelect = document.createElement('select');
        sortSelect.className = 'form-select w-auto ms-auto';
        sortSelect.innerHTML = `
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
        `;
        
        document.querySelector('.reviews-header').appendChild(sortSelect);
        
        sortSelect.addEventListener('change', () => {
            const reviews = Array.from(reviewsList.querySelectorAll('.review-card'));
            const sortValue = sortSelect.value;
            
            reviews.sort((a, b) => {
                if (sortValue === 'newest' || sortValue === 'oldest') {
                    const dateA = new Date(a.querySelector('.review-date').textContent);
                    const dateB = new Date(b.querySelector('.review-date').textContent);
                    return sortValue === 'newest' ? dateB - dateA : dateA - dateB;
                } else {
                    const ratingA = parseInt(a.getAttribute('data-rating'));
                    const ratingB = parseInt(b.getAttribute('data-rating'));
                    return sortValue === 'highest' ? ratingB - ratingA : ratingA - ratingB;
                }
            });
            
            reviews.forEach(review => reviewsList.appendChild(review));
        });

        // Review filtering
        const filterBtns = document.createElement('div');
        filterBtns.className = 'btn-group mt-3';
        filterBtns.innerHTML = `
            <button class="btn btn-outline-primary active" data-rating="all">All</button>
            <button class="btn btn-outline-primary" data-rating="5">5★</button>
            <button class="btn btn-outline-primary" data-rating="4">4★</button>
            <button class="btn btn-outline-primary" data-rating="3">3★</button>
            <button class="btn btn-outline-primary" data-rating="2">2★</button>
            <button class="btn btn-outline-primary" data-rating="1">1★</button>
        `;
        
        document.querySelector('.reviews-header').appendChild(filterBtns);
    }

    // Initialize all features
    initializeCalendar();
    initializeDocumentManagement();
    initializeServiceManagement();
    initializeReviewSystem();
});