$(document).ready(function() {

	var topics = ["funny dogs", "silly cats", "crazy birds", "silly fish", "funny squirrels", "goofy monkeys", "crazy cows", "funny horse", "goofy goats", "spitting llama"];


//create function to show buttons from topics variable 
	function renderButtons(){
		$("#giphyButtons").empty();

		for (i = 0; i < topics.length; i++) {
			var gifButton = $("<button>");
			gifButton.addClass("gif");
			gifButton.addClass("btn btn-info");
			gifButton.attr("data-name", topics[i]);
			gifButton.text(topics[i]);
			$("#giphyButtons").append(gifButton);
		}
	}
//This is to call the initial buttons on the page
	renderButtons();
//This is for when a search is added, turning it into a button
	$("#add-gif").on("click", function(event){
		event.preventDefault();
		var topic = $("#gif-input").val().trim();
		topics.push(topic);
		renderButtons();
	});

//create onclick event for the buttons to pull API gif info back
	$(document).on("click", ".gif", function()	{
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
			}
			else if ($(this).attr("src")==$(this).attr("moving")){
				$(this).attr("src", $(this).attr("still"));
			}	
			console.log(this);
		};
	
			$(document).on("click", ".gifClass", animate);

});

