// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {

    const learnMoreBtn = document.querySelector(".green-button");
    const aboutSection = document.querySelector("#about-section");
    
    // Ensure both elements exist before attaching event listener
    if (learnMoreBtn && aboutSection) {
        learnMoreBtn.addEventListener("click", function() {
            // Trigger custom smooth scroll with 1.5 second duration
            smoothScrollTo(aboutSection.offsetTop, 1500);
        });
    }

    /*
     * Custom smooth scroll function with easing animation
     */
    function smoothScrollTo(targetY, duration) {
        // Get current scroll position
        const startY = window.scrollY || window.pageYOffset;
        
        // Calculate total distance to scroll
        const distance = targetY - startY;
        
        // Initialize timing variable
        let startTime = null;

        /*
         * Animation frame function that handles the scroll progression
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

        /*
         * Quadratic easing function for smooth in-out animation
         */
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        // Start the animation
        requestAnimationFrame(animation);
    }
});