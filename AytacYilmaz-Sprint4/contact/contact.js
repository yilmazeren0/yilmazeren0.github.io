$(document).ready(function() {
 
   // List of common inquiry subjects for autocomplete
    const commonSubjects = [
        "General Information", "Partnership Opportunity", "Project Collaboration",
        "Technical Support", "Bug Report", "Feature Request", "Membership Inquiry",
        "Volunteer Opportunity", "Event Information", "Sponsorship", 
        "Press/Media Inquiry", "Job/Internship Opportunity", "Workshop/Training Request",
        "Feedback", "Other"
    ];

  
    /**
     * jQuery UI Widget: Slider
     * Experience level slider for the contact form
     */
    $("#experience-slider").slider({
        range: "min",
        min: 0,
        max: 20,
        value: 5,
        slide: function(event, ui) {
            $("#experience-value").text(ui.value + " years");
            $("#experience").val(ui.value);
        }
    });

    /**
     * jQuery UI Widget: Datepicker
     * Date selection for preferred contact date
     */
    $("#contact-date").datepicker({
        minDate: 0, // Prevent selecting dates in the past
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true
    });

    /**
     * jQuery UI Widget: Button
     * Enhanced radio buttons for priority selection
     */
    $("#priority-buttons").buttonset();

    /**
     * jQuery UI Widget: Autocomplete for subject field
     * Common inquiry subject suggestions
     */
    $("#subject").autocomplete({
        source: commonSubjects,
        minLength: 1,
        delay: 300,
        autoFocus: true
    });

    /**
     * jQuery UI Widget: Autocomplete
     * Skill selection with autocomplete
     */
    $("#skills-autocomplete").autocomplete({
        source: function(request, response) {
            // Filter out already selected skills
            const availableSkills = programmingSkills.filter(skill => 
                !selectedSkills.includes(skill) && 
                skill.toLowerCase().indexOf(request.term.toLowerCase()) !== -1
            );
            response(availableSkills);
        },
        minLength: 1,
        select: function(event, ui) {
            addSkill(ui.item.value);
            $(this).val('');
            return false;
        }
    });

    /**
     * jQuery Plugin: Form Validation
     * Using jQuery Validation plugin for form validation
     */
    // General contact form validation
    $("#contact-form").validate({
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            subject: "required",
            message: "required"
        },
        messages: {
            name: "Please enter your name",
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            subject: "Please enter a subject for your inquiry",
            message: "Please enter your message"
        },
        submitHandler: function(form) {
            handleFormSubmit(form, "Thank you for contacting DevCollab. We have received your inquiry and will respond to you within 48 business hours. Your message is important to us.");
            return false;
        }
    });

  
    // Generic form submission handler using jQuery UI Dialog
    function handleFormSubmit(form, message) {
        // Collect form data (would normally be sent to server)
        const formData = $(form).serializeArray();
        
        // jQuery UI Widget: Dialog for showing response messages
        $("#dialog-message").text(message);
        $("#response-dialog").dialog({
            modal: true,
            width: 400,
            buttons: {
                "Close": function() {
                    $(this).dialog("close");
                    
                    // Reset the form
                    form.reset();
                    
                    // Reset any jQuery UI widgets
                    $("#experience-slider").slider("value", 5);
                    $("#experience-value").text("5 years");
                    $("#experience").val(5);
                }
            }
        });
    }

    // jQuery Animation: hover with animate method
    $(".project-card").hover(
        function() {
            $(this).stop().animate({
                backgroundColor: "#f9f9f9"
            }, 200);
        },
        function() {
            $(this).stop().animate({
                backgroundColor: "#ffffff"
            }, 200);
        }
    );
});