$(document).ready(function () {
    $("#nav_list a").click(function (e) {
        e.preventDefault();

        const fileName = $(this).attr("title") + ".json";

        $.getJSON("json_files/" + fileName, function (data) {
            const speaker = data.speakers[0];

            let html = `
                <h1>${speaker.title}</h1>
                <img src="${speaker.image}" alt="${speaker.speaker}">
                <h2>${speaker.month}<br>${speaker.speaker}</h2>
                <p>${speaker.text}</p>
            `;

            $("main").empty().append(html);
        });
    });
});
