// This is the array of the topics.
var topics = ["rabbit", "cat", "hamster", "dog", "pigeon", "lion", "panda", "bear", "turtle", "tiger", "elephant", "racoon"];
// Function that renders the Html to diplay the Appropriate content.
function displayGif() {
    var topic = $(this).attr("data-topic");
    // The query calls on the first ten results from the giphy api, and also storing our giphy API URL.
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=5ffwOLmeVyAVhjajRATByebPgTsf0p7W&limit=15";
    // Perfoming an AJAX GET request to our queryURL.
    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        // After the data from the AJAX request comes back.
        .then(function (response) {
            // Saving the image_original_url property.
            var results = response.data;
            // Looping to go through all ten result.
            for (var i = 0; i < results.length; i++) {
                // Creating a paragraph tag with the result item's rating.
                var p = $("<h4>").text("rated: " + results[i].rating);
                // Creating and storing a div tag.
                var topicsDiv = $("<div>");
                // Creating and storing an image tag.
                var topicImage = $("<img>");
                // Setting the topicImage src attribute to imageUrl.
                topicImage.attr("src", results[i].images.fixed_width_still.url);

                topicImage.addClass("gif");
                // Setting the topicImage src attribute to imageUrl.
                topicImage.attr("data-state", "still");
                topicImage.attr("data-animate", results[i].images.fixed_width.url);
                topicImage.attr("data-still", results[i].images.fixed_width_still.url);
                // Appending the paragraph and image tag to the topicsDiv
                topicsDiv.append(p, topicImage);
                // Prependng the topicsDiv to the HTML page in the "class row" div.
                $(".row").prepend(topicsDiv);
            }
            $(".gif").on("click", function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate,
                // Else set src to the data-still value.
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
}
// Function for displaying topic buttons.
function renderButtons() {
    // Deleting the buttons prior to adding new topic
    // (this is necessary otherwise you will have repeat buttons)
    $("#animal-button").empty();
    // Looping through the array of topics.
    for (var i = 0; i < topics.length; i++) {
        // Then dynamically generating buttons for each topic in the array.
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of topic to our button.
        a.addClass("topic-btn");
        // Adding a data-attribute.
        a.attr("data-topic", topics[i]);
        // Providing the initial button text.
        a.text(topics[i]);
        // Adding the button to the animal-button div.
        $("#animal-button").append(a);
    }
}
$(document).ready(function () {
    // This function handles events where one button is clicked.
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#animal-input").val().trim();
        if (topic !== "" && topics.indexOf(topic) === -1) {
            topics.push(topic);
            // Calling the renderButtons function to display the initial buttons.
            renderButtons();
            $("#animal-input").val("");
        }
    });
});
$(document).on("click", ".topic-btn", displayGif);
renderButtons();