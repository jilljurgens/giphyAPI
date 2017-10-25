$(document).ready(function() {

	var topics = ["happy", "excited", "sad", "angry", "ornery", "startled", "perplexed", "anxious", "tense", "comfortable"];

//	var apikey = "dc6zaTOxFJmzC";
//	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=" + apikey + "&limit=10"



//create function to show buttons from topics variable 
	function renderButtons(){
		$("#giphyButtons").empty();

		for (i = 0; i < topics.length; i++) {
			var gifButton = $("<button>");
			gifButton.addClass("gif");
			gifButton.attr("data-name", topics[i]);
			gifButton.text(topics[i]);
			$("#giphyButtons").append(gifButton);
		}
	}
//This is to call the initial buttons on the page
	renderButtons();
//This is for when a search is added, runing it into a button
	$("#add-gif").on("click", function(event){
		event.preventDefault();
		var topic = $("#gif-input").val().trim();
		topics.push(topic);
		renderButtons();
	});

//create onclick event for the buttons to pull API gif info back
	$("button").on("click", function()	{
		var topic = $(this).attr("data-name");
		var apikey = "dc6zaTOxFJmzC";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apikey + "&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"
		})

		.done(function(response){
			var results = response.data;
			for (var i = 0; i < results.length; i++){
				if (results[i].rating !== "r") {
				var gifDiv = $("<div class='item'>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rated: " + rating);
				var gifImage = $("<img>");
				gifImage.attr("src", results[i].images.fixed_height_still.url);
				gifDiv.append(p);
				gifDiv.append(gifImage);
				$("#gifs-show-here").prepend(gifDiv);
				//console.log(results);
				var stillImage = results[i].images.fixed_height_still.url;
				var movingImage = results[i].images.fixed_height.url;
				gifImage.attr("still", stillImage);
				gifImage.attr("moving", movingImage);
				gifImage.addClass("gifClass");
				} 
			};
		});	
	});	
		function animate(){
			if ($(this).attr("src")==$(this).attr("still")){
				$(this).attr("src", $(this).attr("moving"));
				console.log("setting source to moving")
			}
			else if ($(this).attr("src")==$(this).attr("moving")){
				$(this).attr("src", $(this).attr("still"));
				console.log("setting source to still")

			}	
			console.log(this);
		};
	
			$(document).on("click", ".gifClass", animate);
//create an on.click function to call Giphy API with search criteria (button name) to return 10 gifs 

});
//create another on click function for the 10 gifs that appear. to play and stop (if var play == true maybe?)

//if make it to search, create an on.click function to(clear previous buttons if doing search) push to array and create a new button.






//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
//Under every gif, display its rating (PG, G, so on). 
//This data is provided by the GIPHY API.
//Only once you get images displaying with button presses should you move on to the next step.



	