// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {

    const contactBtn = document.querySelector("#contact-button");
    const footerSection = document.querySelector("#footer-section");
   
    // Ensure both elements exist before attaching event listener
    if (contactBtn && footerSection) {
        contactBtn.addEventListener("click", function() {

            smoothScrollTo(footerSection.offsetTop, 1500);
        });
    } else {

        if (!contactBtn) console.warn("Contact button not found");
        if (!footerSection) console.warn("Footer section not found");
    }


    function smoothScrollTo(targetY, duration) {
        // Get current scroll position
        const startY = window.scrollY || window.pageYOffset;
       
        // Calculate total distance to scroll
        const distance = targetY - startY;
    

        let startTime = null;


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

      
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        // Start the animation
        requestAnimationFrame(animation);
    }
});