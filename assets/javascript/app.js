// Array containing topics for original buttons
var topics = [
	"handshake fails",
	"gymnastics fails",
	"ice skating fails",
	"skateboarding fails",
	"basketball fails",
	"baseball bloopers",
	"animal fails",
	"drunk people fails",
	"high five fails",
	"dancing fails",
	"running fails",
	"car fails",
];

// Creates a button for each topic in the array and puts them on the page
for (var i = 0; i < topics.length; i++) {
	var button = $("<button>").text(topics[i]);
	button.attr("data-fail", topics[i]);
	button.addClass("fail-button");
	$("#button-group").append(button);
}

// On click function for 'Submit' button
$("#add-button").on("click", function(x) {
    
    // Determines if user's new input already exists on the page
	x.preventDefault();
	var alreadyExist = false;
	if(topics.indexOf($("#new-input").val()) !== -1) {
		alreadyExist = true;
	}
    // Adds new button to the page if input field isn't blank and doesn't already exist
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

	// AJAX request to Giphy
	$.ajax({
    	url: queryURL,
    	method: "GET"
    }).then(function(response) {
    	var results = response.data; // Stores response in a variable
		var $resultsContainer = $("<section class='results-container'>"); 

    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='rating-container'>");
			
			var rating = results[i].rating;
    		var rating = $("<p>").text("Rating: " + rating);

			// Creates image tags with attributes for still and animated images
    		var failImg = $("<img class='result'>");
    		failImg.attr("src", results[i].images.fixed_height_still.url);
    		failImg.attr("data-state", "still");
    		failImg.attr("data-still", results[i].images.fixed_height_still.url);
    		failImg.attr("data-animate", results[i].images.fixed_height.url);

			// Puts still image and rating into divs; puts divs into section
    		singleResultDiv.prepend(failImg);
    		singleResultDiv.prepend(rating);
    		$resultsContainer.prepend(singleResultDiv);
    	}

		// Puts section on the page
    	$("#fails-group").prepend($resultsContainer);
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