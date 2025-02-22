// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeRevenueChart();
    initializeUserGrowthChart();
    
    // Initialize sidebar navigation
    initializeSidebar();
});

// Revenue Chart
function initializeRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue',
                data: [4500, 5200, 4800, 5900, 6000, 7000, 6500],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
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
                        borderDash: [2, 4]
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

    // Handle period change
    const periodSelect = ctx.canvas.closest('.chart-card').querySelector('.chart-period');
    periodSelect.addEventListener('change', function() {
        // Update chart data based on selected period
        // This would typically fetch new data from the server
        updateChartData(revenueChart, this.value);
    });
}

// User Growth Chart
function initializeUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart').getContext('2d');
    const userGrowthChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'New Users',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(40, 167, 69, 0.2)',
                borderColor: '#28a745',
                borderWidth: 2
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
                        borderDash: [2, 4]
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

    // Handle period change
    const periodSelect = ctx.canvas.closest('.chart-card').querySelector('.chart-period');
    periodSelect.addEventListener('change', function() {
        // Update chart data based on selected period
        // This would typically fetch new data from the server
        updateChartData(userGrowthChart, this.value);
    });
}

// Update chart data based on selected period
function updateChartData(chart, period) {
    // This is a mock function that would typically fetch data from the server
    // For now, it just generates random data
    const newData = Array.from({length: 7}, () => Math.floor(Math.random() * 100));
    chart.data.datasets[0].data = newData;
    chart.update();
}

// Initialize sidebar navigation
function initializeSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-nav-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Here you would typically handle navigation
            // For now, we'll just log the action
            console.log('Navigating to:', this.textContent.trim());
        });
    });
}
