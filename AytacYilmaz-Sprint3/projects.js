$(document).ready(function() {
    // jQuery Effects: slideToggle for toggle animation
    $(".expand-btn").click(function() {
        $(this).next(".project-details").slideToggle(300);
        
        // jQuery Text Manipulation: changing text content
        if ($(this).text() === "View Details") {
            $(this).text("Hide Details");
        } else {
            $(this).text("View Details");
        }
    });
    
    // jQuery Class Manipulation: addClass and removeClass for filtering
    $(".project-categories .filter-tag").click(function() {
        $(".project-categories .filter-tag").removeClass("active");
        $(this).addClass("active");
        
        filterProjects();
    });
    
    // jQuery Class Manipulation: addClass and removeClass for filtering
    $(".project-difficulty .filter-tag").click(function() {
        $(".project-difficulty .filter-tag").removeClass("active");
        $(this).addClass("active");
        
        filterProjects();
    });
    
    // jQuery Event Handling: input event
    $("#project-search").on("input", function() {
        filterProjects();
    });
    
    // Custom filtering function using jQuery methods
    function filterProjects() {
        const category = $(".project-categories .filter-tag.active").data("category");
        const difficulty = $(".project-difficulty .filter-tag.active").data("difficulty");
        const searchTerm = $("#project-search").val().toLowerCase();
        
        $(".project-card").each(function() {
            const cardCategory = $(this).data("category");
            const cardDifficulty = $(this).data("difficulty");
            const cardName = $(this).data("name").toLowerCase();
            const cardTech = $(this).data("tech").toLowerCase();
            
            // Check if card matches all filter criteria
            const matchesCategory = category === "all" || cardCategory === category;
            const matchesDifficulty = difficulty === "all" || cardDifficulty === difficulty;
            const matchesSearch = searchTerm === "" || 
                                cardName.includes(searchTerm) || 
                                cardTech.includes(searchTerm);
            
            if (matchesCategory && matchesDifficulty && matchesSearch) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    
    // jQuery UI Widget: Draggable - makes elements draggable
    $(".project-card").draggable({
        helper: "clone",
        cursor: "move",
        revert: "invalid",
        opacity: 0.7,
        zIndex: 100
    });
    
    // jQuery UI Widget: Droppable - enables drop targets for draggable elements
    $("#favorites-list").droppable({
        accept: ".project-card",
        activeClass: "ui-state-highlight",
        drop: function(event, ui) {
            // Remove placeholder if this is the first project
            if ($(this).find(".project-placeholder").length > 0) {
                $(this).find(".project-placeholder").remove();
            }
            
            const projectName = ui.draggable.find("h3").text();
            
            // Check if project is already in favorites
            let isDuplicate = false;
            $("#favorites-list .project-mini").each(function() {
                if ($(this).text().includes(projectName)) {
                    isDuplicate = true;
                    // jQuery UI Effect: shake animation
                    $(this).effect("shake");
                    return false;
                }
            });
            
            if (!isDuplicate) {
                // Create mini version of the project card
                const projectMini = $("<div></div>")
                    .addClass("project-mini")
                    .html(`
                        <strong>${projectName}</strong>
                        <span class="remove-favorite" style="float: right; cursor: pointer;">×</span>
                    `);
                
                // Append to favorites list
                $(this).append(projectMini);
                
                // jQuery UI Effect: highlight animation
                projectMini.effect("highlight", {}, 1000);
            }
        }
    });
    
    // jQuery UI Widget: Sortable - enables reordering elements via drag and drop
    $("#favorites-list").sortable({
        placeholder: "sortable-placeholder",
        cursor: "move"
    });
    
    // jQuery UI Effect: fade animation 
    $("#favorites-list").on("click", ".remove-favorite", function() {
        $(this).parent().effect("fade", {}, 300, function() {
            $(this).remove();
            
            // Add placeholder back if no favorites left
            if ($("#favorites-list").children().length === 0) {
                $("#favorites-list").append('<div class="project-placeholder">Drop projects here to save them</div>');
            }
        });
    });
    
    // jQuery UI Widget: Dialog - creates modal dialogs
    $(".view-project-btn").click(function() {
        const projectCard = $(this).closest(".project-card");
        const projectName = projectCard.data("name");
        const projectCategory = projectCard.data("category");
        const projectDifficulty = projectCard.data("difficulty");
        const projectTech = projectCard.data("tech").split(" ").join(", ");
        const projectImageSrc = projectCard.find("img").attr("src");
        
        // Create content for dialog
        let dialogContent = `
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${projectImageSrc}" alt="${projectName}" style="max-width: 150px; border-radius: 5px;">
                <h2>${projectName}</h2>
            </div>
            <div>
                <p><strong>Category:</strong> ${projectCategory.charAt(0).toUpperCase() + projectCategory.slice(1)}</p>
                <p><strong>Difficulty:</strong> ${projectDifficulty.charAt(0).toUpperCase() + projectDifficulty.slice(1)}</p>
                <p><strong>Technologies:</strong> ${projectTech}</p>
                <p><strong>Description:</strong> ${projectCard.find("p").first().text()}</p>
                <div style="margin-top: 20px;">
                    <a href="#" class="ui-button ui-widget ui-corner-all">View Repository</a>
                    <a href="#" class="ui-button ui-widget ui-corner-all">Join Team</a>
                </div>
            </div>
        `;
        
        // jQuery HTML Manipulation: setting HTML content
        $("#project-details-content").html(dialogContent);
        // jQuery UI Dialog initialization
        $("#project-details-dialog").dialog({
            modal: true,
            width: 500,
            buttons: {
                Close: function() {
                    $(this).dialog("close");
                }
            }
        });
    });
    
    // jQuery Animation: hover effects
    $(".project-card").hover(
        function() {
            $(this).animate({ marginTop: "-10px" }, 200);
        },
        function() {
            $(this).animate({ marginTop: "0" }, 200);
        }
    );
});