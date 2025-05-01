// This script initializes an Owl Carousel on the page when it is fully loaded.
// It sets the carousel to display one item at a time, allows looping through items
$(document).ready(function(){
    // Owl Carousel Plugin: responsive content carousel/slider
    $(".owl-carousel").owlCarousel({
      items: 1,
      loop: true,
      margin: 20,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true
    });
});