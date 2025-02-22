// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeSettings();
    initializeApiKeyControls();
    initializeChangeTracking();
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

// Initialize settings functionality
function initializeSettings() {
    // Save settings button
    document.getElementById('saveSettings').addEventListener('click', function() {
        saveSettings();
    });

    // Initialize all toggle switches
    document.querySelectorAll('.toggle-switch input[type="checkbox"]').forEach(toggle => {
        toggle.addEventListener('change', function() {
            trackChanges();
        });
    });

    // Initialize all inputs and selects
    document.querySelectorAll('input:not([type="checkbox"]), select').forEach(input => {
        input.addEventListener('change', function() {
            trackChanges();
        });
    });

    // Initialize checkbox groups
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            trackChanges();
        });
    });
}

// Initialize API key controls
function initializeApiKeyControls() {
    const apiKeyInput = document.querySelector('.api-key-field input');
    const showButton = document.getElementById('showApiKey');
    const copyButton = document.getElementById('copyApiKey');
    const regenerateButton = document.getElementById('regenerateApiKey');

    // Show/Hide API Key
    showButton.addEventListener('click', function() {
        const type = apiKeyInput.type;
        apiKeyInput.type = type === 'password' ? 'text' : 'password';
        showButton.querySelector('i').className = `fas fa-${type === 'password' ? 'eye-slash' : 'eye'}`;
    });

    // Copy API Key
    copyButton.addEventListener('click', function() {
        apiKeyInput.type = 'text';
        apiKeyInput.select();
        document.execCommand('copy');
        apiKeyInput.type = 'password';
        
        // Show feedback
        const icon = copyButton.querySelector('i');
        icon.className = 'fas fa-check';
        setTimeout(() => {
            icon.className = 'fas fa-copy';
        }, 2000);
    });

    // Regenerate API Key
    regenerateButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to regenerate the API key? All existing integrations will need to be updated.')) {
            // Here you would typically make an API call to generate a new key
            const newKey = 'sk_test_' + Math.random().toString(36).substr(2, 9);
            apiKeyInput.value = newKey;
            trackChanges();
        }
    });
}

// Initialize change tracking
function initializeChangeTracking() {
    const alert = document.getElementById('unsavedChanges');
    const discardButton = document.getElementById('discardChanges');
    const saveButton = document.getElementById('saveChanges');

    // Handle discard changes
    discardButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to discard all changes?')) {
            location.reload();
        }
    });

    // Handle save changes
    saveButton.addEventListener('click', function() {
        saveSettings();
    });

    // Handle page leave
    window.addEventListener('beforeunload', function(e) {
        if (alert.classList.contains('active')) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

// Track changes in settings
function trackChanges() {
    const alert = document.getElementById('unsavedChanges');
    alert.classList.add('active');
}

// Save settings
function saveSettings() {
    const alert = document.getElementById('unsavedChanges');
    
    // Here you would typically make an API call to save all settings
    // For now, we'll just simulate the save
    const saveButton = document.getElementById('saveSettings');
    const originalText = saveButton.innerHTML;
    
    saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveButton.disabled = true;

    setTimeout(() => {
        saveButton.innerHTML = '<i class="fas fa-check"></i> Saved!';
        alert.classList.remove('active');

        setTimeout(() => {
            saveButton.innerHTML = originalText;
            saveButton.disabled = false;
        }, 2000);
    }, 1500);
}

// Get current settings
function getCurrentSettings() {
    const settings = {};
    
    // Collect all input values
    document.querySelectorAll('input:not([type="checkbox"]), select').forEach(input => {
        settings[input.name] = input.value;
    });

    // Collect all checkbox values
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        settings[checkbox.name] = checkbox.checked;
    });

    return settings;
}

// Update settings UI
function updateSettingsUI(settings) {
    // Update input values
    Object.keys(settings).forEach(key => {
        const element = document.querySelector(`[name="${key}"]`);
        if (element) {
            if (element.type === 'checkbox') {
                element.checked = settings[key];
            } else {
                element.value = settings[key];
            }
        }
    });
}

// Handle settings import/export
function exportSettings() {
    const settings = getCurrentSettings();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "allserv_settings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function importSettings(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const settings = JSON.parse(e.target.result);
            updateSettingsUI(settings);
            trackChanges();
        } catch (error) {
            alert('Invalid settings file');
        }
    };
    reader.readAsText(file);
}
