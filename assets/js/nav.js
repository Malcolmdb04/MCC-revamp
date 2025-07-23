// Get DOM elements for the mobile navigation toggle
const burgerToggle = document.getElementById('burger-toggle');
const navList = document.getElementById('nav-list');
const nav = document.querySelector('nav');

// Add click event listener to the burger menu
burgerToggle.addEventListener('click', function() {
    // Toggle the 'open' class on the navigation list
    navList.classList.toggle('open');
    
    // Adjust navigation padding based on menu state
    if (navList.classList.contains('open')) {
        // Remove bottom padding when menu is open
        nav.style.paddingBottom = '0';
    } else {
        // Restore original padding when menu is closed
        nav.style.paddingBottom = '12px';
    }
});