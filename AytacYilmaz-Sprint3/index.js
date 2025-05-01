$(document).ready(function() {
        
    // jQuery Animation: hover effects with animate() method
    $(".project-card").hover(
        function() {
            $(this).animate({
                marginTop: "-10px"
            }, 200);
        },
        function() {
            $(this).animate({
                marginTop: "0"
            }, 200);
        }
    );
    
    // jQuery Form Handling: submit event and form manipulation
    $("#newsletter-form").submit(function(e) {
        e.preventDefault();
        const email = $("#newsletter-email").val();
        
        // jQuery DOM Manipulation: property changes and text manipulation
        $("#newsletter-submit").prop("disabled", true).text("Subscribing...");
        
        // jQuery Effects: slideUp, slideDown and HTML content manipulation
        setTimeout(function() {
            $("#newsletter-form").slideUp(300, function() {
                $("#newsletter-message")
                    .html("<div class='success-message'><p>Thank you for subscribing! Check your email to confirm your subscription.</p></div>")
                    .slideDown(300);
            });
        }, 1000);
    });
    
    // jQuery Event Handling: scroll event with custom animation
    $(window).scroll(function() {
        $(".fade-in").each(function() {
            const bottom_of_element = $(this).offset().top + $(this).outerHeight() / 3;
            const bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if (bottom_of_window > bottom_of_element) {
                $(this).animate({'opacity':'1'}, 700);
            }
        });
    });
    
    // jQuery CSS Manipulation
    $(".fade-in").css("opacity", "0");
    // jQuery Event Triggering
    $(window).trigger("scroll");
});