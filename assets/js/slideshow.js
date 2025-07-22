// Wait for the DOM to be fully loaded before initializing slideshow
document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".mySlides");
    const dots = document.querySelectorAll(".dot");

    // Function to navigate slides manually (next/previous buttons)
    window.plusSlides = function(n) {
        slideIndex += n;
        
        // Loop to first slide if we go past the last slide
        if (slideIndex > slides.length) slideIndex = 1;
        
        // Loop to last slide if we go before the first slide
        if (slideIndex < 1) slideIndex = slides.length;
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        // Add active class to current slide and dot
        slides[slideIndex - 1].classList.add("active");
        dots[slideIndex - 1].classList.add("active");
    };

    // Auto-play function that cycles through slides automatically
    function showSlides() {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        // Move to next slide
        slideIndex++;
        
        // Reset to first slide if we've reached the end
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        // Show current slide and highlight corresponding dot
        slides[slideIndex - 1].classList.add("active");
        dots[slideIndex - 1].classList.add("active");
        
        // Schedule next slide change after 6 seconds
        setTimeout(showSlides, 6000);
    }

    // Function to jump to a specific slide (dot navigation)
    function currentSlide(n) {
        slideIndex = n;
        
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        // Show selected slide and highlight corresponding dot
        slides[slideIndex - 1].classList.add("active");
        dots[slideIndex - 1].classList.add("active");
    }

    // Make currentSlide function globally accessible for dot click handlers
    window.currentSlide = currentSlide;

    // Initialize the slideshow
    showSlides();
});