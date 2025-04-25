$(function() {
    $("#birthday").datepicker();

    var languages = [
        "ActionScript", "AppleScript", "Asp", "JavaScript",
        "Lisp", "Perl", "PHP", "Python", "C", "C++", "C#", "Go",
        "Swift", "Ruby", "TypeScript"
    ];

    $("#language").autocomplete({
        source: languages
    });
});
