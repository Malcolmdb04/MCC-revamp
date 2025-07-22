/* ===================================
   CONTACT BUTTON SCROLL FUNCTIONALITY
   Handles smooth scrolling to footer when contact button is clicked
   =================================== */

// Wait for the DOM to be fully loaded before initializing scroll functionality
document.addEventListener("DOMContentLoaded", function() {
    // Get references to the contact button and target footer section
    const contactBtn = document.querySelector("#contact-button");
    const footerSection = document.querySelector("#footer-section");
   
    // Ensure both elements exist before attaching event listener
    if (contactBtn && footerSection) {
        contactBtn.addEventListener("click", function() {
            // Trigger custom smooth scroll to footer with 1.5 second duration
            smoothScrollTo(footerSection.offsetTop, 1500);
        });
    } else {
        // Log warning if elements are not found (for debugging)
        if (!contactBtn) console.warn("Contact button not found");
        if (!footerSection) console.warn("Footer section not found");
    }

    /**
     * Custom smooth scroll function with easing animation
     * @param {number} targetY - The Y position to scroll to
     * @param {number} duration - Animation duration in milliseconds
     */
    function smoothScrollTo(targetY, duration) {
        // Get current scroll position
        const startY = window.scrollY || window.pageYOffset;
       
        // Calculate total distance to scroll
        const distance = targetY - startY;
       
        // Initialize timing variable
        let startTime = null;

        /**
         * Animation frame function that handles the scroll progression
         * @param {number} currentTime - Current timestamp from requestAnimationFrame
         */
        function animation(currentTime) {
            // Set start time on first frame
            if (!startTime) startTime = currentTime;
           
            // Calculate elapsed time and progress (0 to 1)
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
           
            // Apply easing function for smooth acceleration/deceleration
            const ease = easeInOutQuad(progress);
           
            // Update scroll position based on eased progress
            window.scrollTo(0, startY + distance * ease);
           
            // Continue animation if duration hasn't elapsed
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        /**
         * Quadratic easing function for smooth in-out animation
         * Creates acceleration at start and deceleration at end
         * @param {number} t - Progress value between 0 and 1
         * @returns {number} Eased progress value
         */
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        // Start the animation
        requestAnimationFrame(animation);
    }
});