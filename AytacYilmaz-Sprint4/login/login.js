$(document).ready(function() {
    
    // jQuery Plugin: Form Validation
    // Validates login form input
    $("#login-form").validate({
        rules: {
            username: "required",
            password: "required"
        },
        messages: {
            username: "Please enter your username",
            password: "Please enter your password"
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.siblings(".error-message"));
        },
        submitHandler: function(form) {
            // jQuery DOM Manipulation and effects
            $("#login-button").prop("disabled", true).text("Logging in...");
            
            // Use AJAX to check login credentials against users.json
            $.ajax({
                url: '../users.json',
                type: 'GET',
                dataType: 'json',
                success: function(users) {
                    const username = $("#username").val();
                    const password = $("#password").val();
                    const user = users.find(u => u.username === username && u.password === password);
                    
                    if (user) {
                        // jQuery Effects: slideUp and slideDown animations
                        setTimeout(function() {
                            $("#login-form").slideUp(300);
                            $("#login-message")
                                .html(`<div class='success-message'><p>Welcome ${username}! Redirecting to home...</p></div>`)
                                .hide().slideDown(300);
                                
                            // Redirect to home page after 2 seconds
                            setTimeout(function() {
                                window.location.href = "../index.html";
                            }, 2000);
                        }, 1000);
                    } else {
                        // Reset button and show error message
                        $("#login-button").prop("disabled", false).text("Login");
                        $("#login-message")
                            .html("<div class='error-message'><p>Wrong username or password!</p></div>")
                            .hide().slideDown(300);
                    }
                },
                error: function() {
                    $("#login-button").prop("disabled", false).text("Login");
                    $("#login-message")
                        .html("<div class='error-message'><p>Error accessing user data!</p></div>")
                        .hide().slideDown(300);
                }
            });
            
            return false;
        }
    });
    
    // jQuery Plugin: Form Validation
    // Validates registration form with complex rules
    $("#register-form").validate({
        rules: {
            name: "required",
            username: {
                required: true,
                minlength: 4
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            },
            "confirm-password": {
                required: true,
                equalTo: "#reg-password"
            }
        },
        messages: {
            name: "Please enter your name and surname",
            username: {
                required: "Please enter a username",
                minlength: "Username must be at least 4 characters long"
            },
            email: {
                required: "Please enter your email address",
                email: "Please enter a valid email address"
            },
            password: {
                required: "Please enter a password",
                minlength: "Password must be at least 8 characters long"
            },
            "confirm-password": {
                required: "Please confirm your password",
                equalTo: "Passwords do not match"
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.siblings(".error-message"));
        },
        submitHandler: function(form) {
            // jQuery DOM Manipulation
            $("#register-button").prop("disabled", true).text("Registering...");
            
            // Get form data
            const userData = {
                name: $("#name").val(),
                username: $("#reg-username").val(),
                email: $("#email").val(),
                password: $("#reg-password").val()
            };
            
            // Get existing users and add new user
            $.ajax({
                url: '../users.json',
                type: 'GET',
                dataType: 'json',
                success: function(users) {
                    // Check if username already exists
                    if (users.some(user => user.username === userData.username)) {
                        $("#register-button").prop("disabled", false).text("Register");
                        $("#register-message")
                            .html("<div class='error-message'><p>Username already exists!</p></div>")
                            .hide().slideDown(300);
                        return;
                    }
                    
                    // Add new user
                    users.push(userData);
                    
                    // Save updated users array back to users.json
                    $.ajax({
                        url: '../users.json',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(users),
                        success: function() {
                            // jQuery Effects: slideUp and slideDown animations 
                            setTimeout(function() {
                                $("#register-form").slideUp(300);
                                $("#register-message")
                                    .html("<div class='success-message'><p>Registration successful! Please log in with your new account.</p></div>")
                                    .hide().slideDown(300);
                            }, 1000);
                        },
                        error: function() {
                            $("#register-button").prop("disabled", false).text("Register");
                            $("#register-message")
                                .html("<div class='error-message'><p>Error saving user data!</p></div>")
                                .hide().slideDown(300);
                        }
                    });
                },
                error: function() {
                    // If users.json doesn't exist or can't be read, create first user
                    const users = [userData];
                    
                    $.ajax({
                        url: '../users.json',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(users),
                        success: function() {
                            setTimeout(function() {
                                $("#register-form").slideUp(300);
                                $("#register-message")
                                    .html("<div class='success-message'><p>Registration successful! Please log in with your new account.</p></div>")
                                    .hide().slideDown(300);
                            }, 1000);
                        },
                        error: function() {
                            $("#register-button").prop("disabled", false).text("Register");
                            $("#register-message")
                                .html("<div class='error-message'><p>Error creating user data!</p></div>")
                                .hide().slideDown(300);
                        }
                    });
                }
            });
            
            return false;
        }
    });
    
    // jQuery UI Effect: shake animation for invalid form submission
    $.validator.setDefaults({
        invalidHandler: function(form, validator) {
            $(form.target).effect("shake", { times: 2 }, 300);
        }
    });
   
});