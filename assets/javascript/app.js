// Array containing topics for original buttons
var topics = [
	"kids falling",
	"people falling",
	"ice skating fails",
	"skateboarding fails",
	"basketball fails",
	"animals falling",
	"animal fails",
	"drunk people fails",
	"handshake fails",
	"dancing fails",
	"running fails",
	"car fails",
];

// Creates a button for each topic in the array
for (var i = 0; i < topics.length; i++) {
	var button = $("<button>").text(topics[i]);
	button.attr("data-fail", topics[i]);
	button.addClass("fail-button");
	$("#button-group").append(button);
}

// On click function for 'Submit' button
$("#add-button").on("click", function(x) {
    
    // Prevents user from creating a button that already exists on the page
	x.preventDefault();
	var alreadyExist = false;
	if(topics.indexOf($("#new-input").val()) !== -1) {
		alreadyExist = true;
	}
    // Creates new button from user input and adds it to page
    if($("#new-input").val() !== "" && alreadyExist === false) {
		var newFail = $("#new-input").val().toLowerCase();
		topics.push(newFail);
		var button = $("<button>").text(newFail);
		button.attr("data-fail", newFail);
		button.addClass("fail-button");
		$("#button-group").append(button);
    }
    // Clears the user input
	$("#new-input").val("");
});

// On click function for fail buttons
$(document).on("click", ".fail-button", function() {
	var fail = $(this).attr("data-fail");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fail + "&api_key=IiL5GT5whesOI0YtGNx1yC2bbNpBzNhh&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).then(function(response) {
    	var results = response.data;
		var resultsContainerSection = $("<section class='results-container'>");

    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='result-container'>");
    		
    		var rating = results[i].rating;

    		var rating = $("<p>").text("Rating: " + rating);

    		var failImg = $("<img class='result'>");
    		failImg.attr("src", results[i].images.fixed_height_still.url);
    		failImg.attr("data-state", "still");
    		failImg.attr("data-still", results[i].images.fixed_height_still.url);
    		failImg.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(failImg);
    		singleResultDiv.prepend(rating);
    		resultsContainerSection.prepend(singleResultDiv);
    	}

    	$("#fails-group").prepend(resultsContainerSection);
    });
});

// On click function for images
$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

    // Toggles between still and animated images
	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});