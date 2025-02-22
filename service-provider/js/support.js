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

    // Search Functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            // Add search functionality here
            // This could filter help articles or show search suggestions
        });
    }

    // Live Chat Button
    const chatButton = document.querySelector('.contact-card .btn-primary');
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            // Initialize chat widget
            alert('Chat feature coming soon!');
        });
    }

    // Email Support Button
    const emailButton = document.querySelector('.contact-card .btn-outline-primary');
    if (emailButton) {
        emailButton.addEventListener('click', () => {
            window.location.href = 'mailto:support@allserv.com';
        });
    }

    // Quick Link Cards
    const quickLinkCards = document.querySelectorAll('.quick-link-card');
    quickLinkCards.forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.querySelector('h3').textContent;
            // Navigate to specific help section based on topic
            const element = document.querySelector(`[data-topic="${topic}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Help Articles "Read More" Links
    const readMoreLinks = document.querySelectorAll('.read-more');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const article = link.closest('.help-article');
            const title = article.querySelector('h3').textContent;
            // Navigate to full article page
            // This would be implemented based on your article system
            alert(`Full article for "${title}" coming soon!`);
        });
    });
});
