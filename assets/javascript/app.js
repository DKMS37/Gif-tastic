var topics = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "turtle", "chicken", "frog"];

function displayGif(){
    var topic = $(this).attr("data-topic");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q="+ topic + "&api_key=5ffwOLmeVyAVhjajRATByebPgTsf0p7W&limit=10";
    $.ajax({
        url: queryUrl,
        method: "GET"
     }).then(function(response){
   
       var results = response.data;
       
       for (var i = 0; i < results.length; i++){
       var p = $("<h4>").text("Rated: " + results[i].rating);
       var topicsDiv = $("<div class= 'row'>").addClass("col-md-3 img-fluid text-center");
       var topicImage = $("<img>");
       topicImage.attr("src", results[i].images.fixed_height_small.url);
       topicsDiv.append(p, topicImage);


      $("#animals").append(topicsDiv);
      }

     });
}

function renderButtons(){
    $("#animal-button").empty();
    for (var i =0; i < topics.length; i++){
    var a =$("<button>");
    a.addClass("topic-btn");
    a.attr("data-topic",topics[i]);
    a.text(topics[i]);
    $("#animals").append(a);
    }
}
$(document).ready(function(){
$("#add-animal").on("click", function(event){
    event.preventDefault();
    var topic = $("#animal-input").val().trim();
    topics.push(topic);
    renderButtons();
    $("#animal-input").val("");

});   
});
$(document).on("click", ".topic-btn", displayGif);
renderButtons();