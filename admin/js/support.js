// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeTicketFilter();
    initializeTicketActions();
    initializeModal();
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

// Initialize ticket filter
function initializeTicketFilter() {
    const ticketFilter = document.querySelector('.ticket-filter');
    const ticketItems = document.querySelectorAll('.ticket-item');

    ticketFilter.addEventListener('change', function() {
        const selectedStatus = this.value;
        
        ticketItems.forEach(item => {
            if (selectedStatus === 'all') {
                item.style.display = 'block';
            } else {
                if (item.classList.contains(selectedStatus)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
}

// Initialize ticket actions
function initializeTicketActions() {
    // View buttons
    document.querySelectorAll('.btn.btn-outline').forEach(btn => {
        if (btn.textContent.trim() === 'View') {
            btn.addEventListener('click', function() {
                const ticketItem = this.closest('.ticket-item');
                openTicketModal(ticketItem);
            });
        }
    });

    // Respond buttons
    document.querySelectorAll('.btn.btn-primary').forEach(btn => {
        if (btn.textContent.trim() === 'Respond') {
            btn.addEventListener('click', function() {
                const ticketItem = this.closest('.ticket-item');
                openTicketModal(ticketItem, true);
            });
        }
    });

    // Export button
    document.getElementById('exportTickets').addEventListener('click', function() {
        exportTickets();
    });
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('ticketModal');
    const closeBtn = modal.querySelector('.close-btn');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Status change
    const statusSelect = modal.querySelector('.status-select');
    statusSelect.addEventListener('change', function() {
        updateTicketStatus(this.value);
    });

    // Priority change
    const prioritySelect = modal.querySelector('.priority-select');
    prioritySelect.addEventListener('change', function() {
        updateTicketPriority(this.value);
    });

    // Agent assignment
    const agentSelect = modal.querySelector('.agent-select');
    agentSelect.addEventListener('change', function() {
        assignTicket(this.value);
    });

    // Send response
    const sendBtn = modal.querySelector('.btn.btn-primary');
    sendBtn.addEventListener('click', function() {
        sendResponse();
    });
}

// Open ticket modal
function openTicketModal(ticketItem, focusResponse = false) {
    const modal = document.getElementById('ticketModal');
    const ticketId = ticketItem.querySelector('.ticket-id').textContent;
    const ticketTitle = ticketItem.querySelector('.ticket-title').textContent;
    
    // Update modal header
    modal.querySelector('.modal-header h2').textContent = `${ticketId} - ${ticketTitle}`;
    
    // Show modal
    modal.classList.add('active');
    
    // Focus response area if needed
    if (focusResponse) {
        modal.querySelector('textarea').focus();
    }
}

// Update ticket status
function updateTicketStatus(status) {
    // Here you would typically make an API call to update the ticket status
    console.log('Updating ticket status:', status);
}

// Update ticket priority
function updateTicketPriority(priority) {
    // Here you would typically make an API call to update the ticket priority
    console.log('Updating ticket priority:', priority);
}

// Assign ticket to agent
function assignTicket(agentId) {
    // Here you would typically make an API call to assign the ticket
    console.log('Assigning ticket to agent:', agentId);
}

// Send response
function sendResponse() {
    const modal = document.getElementById('ticketModal');
    const responseText = modal.querySelector('textarea').value;
    
    if (responseText.trim()) {
        // Here you would typically make an API call to send the response
        console.log('Sending response:', responseText);
        
        // Add response to conversation history
        addMessageToHistory('Support Agent', responseText, true);
        
        // Clear textarea
        modal.querySelector('textarea').value = '';
    }
}

// Add message to conversation history
function addMessageToHistory(sender, content, isAgent = false) {
    const history = document.querySelector('.conversation-history');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isAgent ? 'agent' : 'customer'}`;
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-sender">${sender}</span>
            <span class="message-time">Just now</span>
        </div>
        <div class="message-content">
            ${content}
        </div>
    `;
    
    history.appendChild(messageDiv);
}

// Export tickets
function exportTickets() {
    // Here you would typically make an API call to generate and download the export
    console.log('Exporting tickets...');
    alert('Tickets export started. You will be notified when the file is ready for download.');
}
