// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference or default to 'light' mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // Theme toggle button click event
    themeToggleBtn.addEventListener('click', function() {
        // Toggle dark mode class
        body.classList.toggle('dark-mode');

        // Save the user's theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }

        // Add a rotation animation to the button
        themeToggleBtn.style.transform = 'scale(0.95) rotate(360deg)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 300);
    });

    // Optional: Add keyboard support (press 'T' to toggle theme)
    document.addEventListener('keydown', function(event) {
        if (event.key === 't' || event.key === 'T') {
            // Only trigger if not typing in an input field
            if (document.activeElement.tagName !== 'INPUT' &&
                document.activeElement.tagName !== 'TEXTAREA') {
                themeToggleBtn.click();
            }
        }
    });
});
