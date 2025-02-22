document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    // Initialize service details modal
    const serviceDetailsModal = new bootstrap.Modal(document.getElementById('serviceDetailsModal'));

    // Table sorting
    const tableHeaders = document.querySelectorAll('.th-content');
    let currentSort = {
        column: null,
        direction: 'asc'
    };

    tableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.textContent.trim().toLowerCase();
            
            // Toggle sort direction
            if (currentSort.column === column) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.column = column;
                currentSort.direction = 'asc';
            }

            // Update sort icons
            tableHeaders.forEach(h => h.querySelector('i').className = 'fas fa-sort');
            header.querySelector('i').className = `fas fa-sort-${currentSort.direction === 'asc' ? 'up' : 'down'}`;

            // Sort table rows
            const tbody = document.querySelector('.history-table tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            rows.sort((a, b) => {
                let aValue = getCellValue(a, column);
                let bValue = getCellValue(b, column);

                if (currentSort.direction === 'desc') {
                    [aValue, bValue] = [bValue, aValue];
                }

                return aValue.localeCompare(bValue);
            });

            // Reorder table rows
            rows.forEach(row => tbody.appendChild(row));
        });
    });

    function getCellValue(row, column) {
        const cells = row.querySelectorAll('td');
        switch(column) {
            case 'date':
                return cells[0].querySelector('.date').textContent;
            case 'customer':
                return cells[1].querySelector('.name').textContent;
            case 'service type':
                return cells[2].querySelector('span').textContent;
            case 'amount':
                return cells[3].querySelector('.amount').textContent;
            case 'status':
                return cells[4].querySelector('.status-badge').textContent;
            case 'rating':
                const rating = cells[5].querySelector('.rating-count');
                return rating ? rating.textContent : '0';
            default:
                return '';
        }
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.history-table tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });

        updatePaginationInfo();
    });

    // Date range filter
    const dateRangeButton = document.querySelector('.date-range button');
    dateRangeButton?.addEventListener('click', () => {
        // Add your date range filter logic here
        console.log('Date range filter clicked');
    });

    // Export functionality
    const exportButton = document.querySelector('.btn-outline-primary');
    exportButton?.addEventListener('click', () => {
        // Add your export logic here
        console.log('Export clicked');
    });

    // View details buttons
    const viewDetailsButtons = document.querySelectorAll('.btn-icon[title="View Details"]');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            // You can customize the modal content based on the clicked row
            serviceDetailsModal.show();
        });
    });

    // Download invoice buttons
    const downloadInvoiceButtons = document.querySelectorAll('.btn-icon[title="Download Invoice"]');
    downloadInvoiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add your invoice download logic here
            console.log('Download invoice clicked');
        });
    });

    // Pagination
    const pageLinks = document.querySelectorAll('.pagination .page-link');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (!link.parentElement.classList.contains('disabled') && 
                !link.parentElement.classList.contains('active')) {
                // Update active page
                document.querySelector('.page-item.active')?.classList.remove('active');
                link.parentElement.classList.add('active');
                
                // Update pagination info
                updatePaginationInfo();
            }
        });
    });

    function updatePaginationInfo() {
        const visibleRows = document.querySelectorAll('.history-table tbody tr:not([style*="display: none"])');
        const paginationInfo = document.querySelector('.pagination-info');
        const currentPage = document.querySelector('.page-item.active .page-link').textContent;
        const rowsPerPage = 10;
        const start = (currentPage - 1) * rowsPerPage + 1;
        const end = Math.min(start + rowsPerPage - 1, visibleRows.length);
        const total = visibleRows.length;

        paginationInfo.textContent = `Showing ${start}-${end} of ${total} entries`;
    }

    // Initial pagination info update
    updatePaginationInfo();

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
});
