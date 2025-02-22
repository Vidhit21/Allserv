document.addEventListener('DOMContentLoaded', function() {
    // Sidebar Toggle
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

    // Monthly Earnings Chart
    const earningsCtx = document.getElementById('earningsChart');
    if (earningsCtx) {
        new Chart(earningsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Earnings',
                    data: [1200, 1900, 1500, 2100, 1800, 2400],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
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
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
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
    }

    // Service Requests Chart
    const requestsCtx = document.getElementById('requestsChart');
    if (requestsCtx) {
        new Chart(requestsCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'New Requests',
                    data: [5, 8, 6, 9, 7, 4, 3],
                    backgroundColor: '#22c55e'
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
                        },
                        ticks: {
                            stepSize: 1
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
    }

    // Notification Bell Dropdown (placeholder)
    const notificationBell = document.querySelector('.notification-bell');
    notificationBell?.addEventListener('click', () => {
        // Add your notification dropdown logic here
        console.log('Notification bell clicked');
    });

    // User Profile Dropdown (placeholder)
    const userProfile = document.querySelector('.user-profile');
    userProfile?.addEventListener('click', () => {
        // Add your user profile dropdown logic here
        console.log('User profile clicked');
    });

    // Responsive Design Adjustments
    function handleResize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    }

    window.addEventListener('resize', handleResize);
});
