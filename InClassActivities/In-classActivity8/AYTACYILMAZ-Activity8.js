var names = ["Ben", "Joel", "Judy", "Anne"];
var scores = [88, 98, 77, 88];

var $ = function (id) { return document.getElementById(id); };



window.onload = function () {
	$("display_results").onclick = displayResults;
	$("display_scores").onclick = displayScores;
	$("add").onclick = addScore;
	
	
};

function displayResults()
{
	if (scores.length === 0)
	{
		alert("No scores to display!");
		return;
	}
	var average = 0;
	let maxScore = 0;
	let maxName = "";
	
	for(var i=0;i<scores.length;i++)
	{
		average= (average*(i)+scores[i])/(i+1);
		if(scores[i]>maxScore)
		{
			maxScore=scores[i];
			maxName=names[i];
		}
		
	}
	
	document.getElementById("results").innerHTML="<h2> Results </h2><br /> Average score is "+average + "<br \> "
	document.getElementById("results").innerHTML+=`Highest score = ${maxName} with a score of ${maxScore}<br \>`;
}
function displayScores(){
	if (scores.length === 0)
	{
		alert("No scores to display!");
		return;
	}
	var output = "<h2> Scores </h2><br />";
	for(var i=0;i<scores.length;i++)
	{
		output+=names[i] + ": " + scores[i] + "<br \>";
	}
	document.getElementById("results").innerHTML=output;
}


