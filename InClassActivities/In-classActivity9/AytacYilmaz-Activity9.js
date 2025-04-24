$(document).ready(function() {
    // preload images
    $("#image_list a").each(function() {
        var swappedImage = new Image();
        swappedImage.src = $(this).attr("href");
    });

    // set up event handlers for links    
    $("#image_list a").click(function(evt) {
        evt.preventDefault();

        var imageURL = $(this).attr("href");
        var caption = $(this).attr("title");

        $("#image, #caption").fadeOut(1000, function() {
            $("#image").attr("src", imageURL);
            $("#caption").text(caption);
            $("#image, #caption").fadeIn(1000);
        });
    });

    $("li:first-child a").focus();
});
