$(document).ready(function () {

  $("body").append(`
    <div id="registration-dialog" title="Registration Confirmation" style="display:none;">
      <p id="registration-message"></p>
    </div>
  `);
    // we use jquery dialog widget here.
  $("#registration-dialog").dialog({
    autoOpen: false,
    modal: true,
    width: 400,
    buttons: {
      "OK": function() {
        $(this).dialog("close");
      }
    },
    show: {
      effect: "fade",
      duration: 300
    },
    hide: {
      effect: "fade",
      duration: 200
    }
  });

  // ajax request to fetch event data from events.json
  $.getJSON("events.json", function (data) {
    const $carousel = $(".owl-carousel");

    data.forEach(function (event) {
      const html = `
        <div class="event-card">
          <img src="${event.image}" alt="${event.title}" />
          <h3>${event.title}</h3>
          <p>Date: ${event.date}</p>
          <p>${event.description}</p>
          <button class="register-btn" data-event="${event.title}">Register</button>
        </div>
      `;
      $carousel.append(html);
    });

    // carousel owl jquery plugin
    $carousel.owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: true,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    });
    
    $(document).on("click", ".register-btn", function() {
      const eventName = $(this).data("event");
      
      $("#registration-message").html(`
        <div style="text-align:center; padding: 10px;">
          <i class="fas fa-check-circle" style="color: #4CAF50; font-size: 48px; margin-bottom: 15px;"></i>
          <h3 style="margin-bottom: 15px;">Registration Successful!</h3>
          <p>You have successfully registered for the "<strong>${eventName}</strong>" event.</p>
        </div>
      `);
      
      $("#registration-dialog").dialog("open");
    });
  });
});

