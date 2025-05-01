$(document).ready(function() {
    // List of programming skills for autocomplete
    const programmingSkills = [
        "JavaScript", "Python", "Java", "C#", "PHP", "Ruby", "Swift", "Kotlin", 
        "TypeScript", "React", "Angular", "Vue.js", "Node.js", "Express", "Django", 
        "Flask", "Spring", "ASP.NET", "Laravel", "Ruby on Rails", "iOS Development",
        "Android Development", "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes",
        "DevOps", "Machine Learning", "Artificial Intelligence", "Data Science",
        "Blockchain", "GraphQL", "REST API", "MongoDB", "MySQL", "PostgreSQL",
        "Firebase", "Redux", "Unit Testing", "CI/CD", "Git", "Agile", "Scrum"
    ];

    // Selected skills array
    let selectedSkills = [];

    /**
     * jQuery UI Widget: Tabs
     * Implements tabbed interface for different types of contact forms
     */
    $(".contact-tabs").tabs({
        activate: function(event, ui) {
            // Clear any previous form responses when switching tabs
            $(".response-highlight").remove();
        }
    });

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

    // Function to add a skill tag
    function addSkill(skill) {
        if (!selectedSkills.includes(skill)) {
            selectedSkills.push(skill);
            
            // Create a skill tag with remove button
            const skillTag = $('<div class="skill-tag"></div>')
                .text(skill)
                .append('<span class="remove-skill">×</span>');
            
            $("#selected-skills").append(skillTag);
            
            // Update hidden input with comma-separated skills
            $("#skills-list").val(selectedSkills.join(','));
        }
    }

    // Event delegation for removing skills
    $("#selected-skills").on('click', '.remove-skill', function() {
        const skill = $(this).parent().text().slice(0, -1); // Remove the × character
        selectedSkills = selectedSkills.filter(s => s !== skill);
        $(this).parent().remove();
        
        // Update hidden input
        $("#skills-list").val(selectedSkills.join(','));
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
            handleFormSubmit(form, "Thank you for your inquiry! We'll get back to you within 48 hours.");
            return false;
        }
    });

    // Project form validation with jQuery Validation plugin
    $("#project-form").validate({
        rules: {
            "project-name": "required",
            "project-email": {
                required: true,
                email: true
            },
            "project-title": "required",
            "project-type": "required",
            "project-description": "required"
        },
        messages: {
            "project-name": "Please enter your name",
            "project-email": {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            "project-title": "Please enter a title for your project",
            "project-type": "Please select a project type",
            "project-description": "Please describe your project"
        },
        submitHandler: function(form) {
            handleFormSubmit(form, "Thanks for submitting your project! Our team will review it and contact you soon.");
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
                    
                    if (form.id === "project-form") {
                        // Clear selected skills
                        selectedSkills = [];
                        $("#selected-skills").empty();
                        $("#skills-list").val('');
                    }
                    
                    // Reset any jQuery UI widgets
                    if (form.id === "contact-form") {
                        $("#experience-slider").slider("value", 5);
                        $("#experience-value").text("5 years");
                        $("#experience").val(5);
                    }
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