var names = ["Ben", "Joel", "Judy", "Anne"];
var scores = [88, 98, 77, 88];

var $ = function (id) {
    return document.getElementById(id);
};

window.onload = function () {
    $("display_results").onclick = displayResults;
    $("display_scores").onclick = displayScores;
    $("add").onclick = addScore;
};

function displayResults() {
    if (scores.length === 0) return;

    let total = 0;
    let highestScore = scores[0];
    let highestName = names[0];

    for (let i = 0; i < scores.length; i++) {
        total += scores[i];
        if (scores[i] > highestScore) {
            highestScore = scores[i];
            highestName = names[i];
        }
    }

    let average = total / scores.length;

    $("results").innerHTML =
        "<h2>Results</h2>" +
        "<p>Average score = " + Math.round(average) + "</p>" +
        "<p>High score = " + highestName + " with a score of " + highestScore + "</p>";
}

function displayScores() {
    let table = "<h2>Scores</h2>";
    table += "<tr><td><strong>Name</strong></td><td><strong>Score</strong></td></tr>";

    for (let i = 0; i < names.length; i++) {
        table += "<tr><td>" + names[i] + "</td><td>" + scores[i] + "</td></tr>";
    }

    $("scores_table").innerHTML = table;
}

function addScore() {
    let name = $("name").value.trim();
    let score = parseInt($("score").value);

    $("name_error").innerText = "";
    $("score_error").innerText = "";

    let hasError = false;

    if (name === "") {
        $("name_error").innerText = "Name cannot be empty.";
        hasError = true;
    }

    if (isNaN(score) || score < 0 || score > 100) {
        $("score_error").innerText = "Score must be a number between 0 and 100.";
        hasError = true;
    }

    if (hasError) return;

    names.push(name);
    scores.push(score);

    $("name").value = "";
    $("score").value = "";
}

