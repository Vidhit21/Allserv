document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    // Monthly Earnings Chart
    const monthlyEarningsCtx = document.getElementById('monthlyEarningsChart').getContext('2d');
    const monthlyEarningsChart = new Chart(monthlyEarningsCtx, {
        type: 'line',
        data: {
            labels: ['1', '5', '10', '15', '20', '25', '30'],
            datasets: [{
                label: 'Earnings',
                data: [500, 800, 1200, 1800, 2500, 3200, 4850],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: value => '$' + value
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Service Distribution Chart
    const serviceDistributionCtx = document.getElementById('serviceDistributionChart').getContext('2d');
    const serviceDistributionChart = new Chart(serviceDistributionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Plumbing', 'Electrical', 'Cleaning', 'Painting', 'Other'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    '#4f46e5',
                    '#06b6d4',
                    '#10b981',
                    '#f59e0b',
                    '#6b7280'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            },
            cutout: '70%'
        }
    });

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
            const tbody = document.querySelector('.transaction-table tbody');
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
            case 'transaction id':
                return cells[1].querySelector('.transaction-id').textContent;
            case 'description':
                return cells[2].querySelector('.service').textContent;
            case 'amount':
                return cells[3].querySelector('.amount').textContent;
            case 'status':
                return cells[4].querySelector('.status-badge').textContent;
            default:
                return '';
        }
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.transaction-table tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });

        updatePaginationInfo();
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
        const visibleRows = document.querySelectorAll('.transaction-table tbody tr:not([style*="display: none"])');
        const paginationInfo = document.querySelector('.pagination-info');
        const currentPage = document.querySelector('.page-item.active .page-link').textContent;
        const rowsPerPage = 10;
        const start = (currentPage - 1) * rowsPerPage + 1;
        const end = Math.min(start + rowsPerPage - 1, visibleRows.length);
        const total = visibleRows.length;

        paginationInfo.textContent = `Showing ${start}-${end} of ${total} transactions`;
    }

    // Withdrawal Modal
    const withdrawalForm = document.getElementById('withdrawalForm');
    const amountInput = withdrawalForm.querySelector('input[type="number"]');
    const summaryAmount = withdrawalForm.querySelector('.summary-row:first-child span:last-child');
    const summaryFee = withdrawalForm.querySelector('.summary-row:nth-child(2) span:last-child');
    const summaryTotal = withdrawalForm.querySelector('.summary-row.total span:last-child');

    amountInput?.addEventListener('input', (e) => {
        const amount = parseFloat(e.target.value) || 0;
        const fee = Math.min(amount * 0.015, 25); // 1.5% fee capped at $25

        summaryAmount.textContent = `$${amount.toFixed(2)}`;
        summaryFee.textContent = `$${fee.toFixed(2)}`;
        summaryTotal.textContent = `$${(amount + fee).toFixed(2)}`;
    });

    // Chart Periods
    const chartActions = document.querySelector('.chart-actions');
    chartActions?.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn')) {
            // Remove active class from all buttons
            chartActions.querySelectorAll('.btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            e.target.classList.add('active');

            // Update chart data based on period
            // This is where you would typically fetch new data and update the chart
            console.log('Switching to period:', e.target.textContent);
        }
    });

    // Initial pagination info update
    updatePaginationInfo();
});
