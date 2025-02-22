// Initialize all charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeSparklines();
    initializeMainCharts();
});

// Initialize sidebar navigation
function initializeSidebar() {
    const sidebarItems = document.querySelectorAll('.sidebar-nav-item');
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
}

// Initialize sparkline charts in overview cards
function initializeSparklines() {
    // Common sparkline options
    const sparklineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        elements: {
            line: {
                tension: 0.4
            },
            point: {
                radius: 0
            }
        }
    };

    // Revenue Sparkline
    const revenueSparkline = new Chart(
        document.getElementById('revenueSparkline').getContext('2d'),
        {
            type: 'line',
            data: {
                labels: Array.from({length: 10}, (_, i) => i + 1),
                datasets: [{
                    data: [30, 45, 35, 50, 40, 60, 55, 65, 75, 70],
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    fill: true
                }]
            },
            options: sparklineOptions
        }
    );

    // Users Sparkline
    const usersSparkline = new Chart(
        document.getElementById('usersSparkline').getContext('2d'),
        {
            type: 'line',
            data: {
                labels: Array.from({length: 10}, (_, i) => i + 1),
                datasets: [{
                    data: [20, 30, 25, 40, 35, 45, 40, 50, 45, 60],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    fill: true
                }]
            },
            options: sparklineOptions
        }
    );

    // Bookings Sparkline
    const bookingsSparkline = new Chart(
        document.getElementById('bookingsSparkline').getContext('2d'),
        {
            type: 'line',
            data: {
                labels: Array.from({length: 10}, (_, i) => i + 1),
                datasets: [{
                    data: [40, 50, 45, 60, 55, 70, 65, 80, 75, 90],
                    borderColor: '#17a2b8',
                    backgroundColor: 'rgba(23, 162, 184, 0.1)',
                    fill: true
                }]
            },
            options: sparklineOptions
        }
    );

    // Satisfaction Sparkline
    const satisfactionSparkline = new Chart(
        document.getElementById('satisfactionSparkline').getContext('2d'),
        {
            type: 'line',
            data: {
                labels: Array.from({length: 10}, (_, i) => i + 1),
                datasets: [{
                    data: [4.5, 4.6, 4.5, 4.7, 4.6, 4.8, 4.7, 4.9, 4.8, 4.8],
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    fill: true
                }]
            },
            options: sparklineOptions
        }
    );
}

// Initialize main charts
function initializeMainCharts() {
    // Revenue Analysis Chart
    const revenueChart = new Chart(
        document.getElementById('revenueChart').getContext('2d'),
        {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: [30000, 35000, 32000, 40000, 38000, 45000, 42000, 50000, 48000, 55000, 52000, 58000],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
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
                            borderDash: [2, 4]
                        }
                    }
                }
            }
        }
    );

    // Service Categories Chart
    const categoriesChart = new Chart(
        document.getElementById('categoriesChart').getContext('2d'),
        {
            type: 'doughnut',
            data: {
                labels: ['Cleaning', 'Plumbing', 'Electrical', 'Gardening', 'Others'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#007bff',
                        '#28a745',
                        '#ffc107',
                        '#17a2b8',
                        '#6c757d'
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
                }
            }
        }
    );

    // User Growth Chart
    const userGrowthChart = new Chart(
        document.getElementById('userGrowthChart').getContext('2d'),
        {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Users',
                    data: [120, 150, 180, 220, 250, 280],
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
                    }
                }
            }
        }
    );
}

// Handle date range changes
const dateRangeSelect = document.querySelector('.date-range-picker select');
dateRangeSelect.addEventListener('change', function() {
    // Here you would typically make an API call to fetch new data
    console.log('Date range changed:', this.value);
    // Then update all charts with new data
    updateChartsData(this.value);
});

// Handle chart type changes
const chartTypeSelect = document.querySelector('.chart-type-select');
chartTypeSelect.addEventListener('change', function() {
    const revenueChart = Chart.getChart('revenueChart');
    if (revenueChart) {
        revenueChart.config.type = this.value.toLowerCase().split(' ')[0];
        revenueChart.update();
    }
});

// Update charts data based on selected date range
function updateChartsData(range) {
    // This is a mock function that would typically fetch real data from an API
    // For now, it just generates random data
    const charts = {
        revenueChart: Chart.getChart('revenueChart'),
        categoriesChart: Chart.getChart('categoriesChart'),
        userGrowthChart: Chart.getChart('userGrowthChart')
    };

    // Update each chart with new random data
    Object.values(charts).forEach(chart => {
        if (chart) {
            chart.data.datasets[0].data = chart.data.datasets[0].data.map(
                () => Math.floor(Math.random() * 100)
            );
            chart.update();
        }
    });
}
