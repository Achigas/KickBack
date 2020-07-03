var APIKeySpoon = "2b38497b30584d7d914e0006ce05f848"
var APIKeyMovieDB = "4ee2048f656df52ca79c1b3928871706"

///match Genre to ID 
//Fetch to genres : https://api.themoviedb.org/3/genre/movie/list?api_key=4ee2048f656df52ca79c1b3928871706&language=en-US


var getGenreInfo = function () { 
    var genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + APIKeyMovieDB + "&language=en-US";
fetch(genreUrl).then(function(response) {
    response.json().then(function(data) {
        console.log(data);

    })
    })
}

var getMovieArray = function (genreID) {
    var GenreID = "12"
    pageNumber = Math.floor(Math.random() * Math.floor(500))
    //var randomMovieID = random number between 1-20
    var movieArrayURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKeyMovieDB + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNumber + "&with_genres=" + GenreID;
    fetch(movieArrayURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        randomMovie = Math.floor(Math.random() * Math.floor(20))

        var movieTitle = data.results[randomMovie].title
        var moviePlot = data.results[randomMovie].overview

        displayMovieInfo(movieTitle, moviePlot)
    })


})
}

var displayMovieInfo = function (title,plot) {
    console.log(title)
    console.log(plot)

}
//getGenreInfo()
getMovieArray()



var getRandomRecipe = function () {
    var offsetId = Math.floor(Math.random() * Math.floor(200));
    var foodType = "chinese";
    var typeFoodUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + foodType + "&number=100&apiKey=" + APIKeySpoon + "&offset=" + offsetId; 
    fetch(typeFoodUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            
            randomFoodId = Math.floor(Math.random() * Math.floor(100))

            var foodId = data.results[randomFoodId].id;
           
            
            getRecipeInfo(foodId);
        })
    })
} 


var getRecipeInfo = function(foodId){
    var recInfoUrl ="https://api.spoonacular.com/recipes/" + foodId + "/information?apiKey=" + APIKeySpoon;
    fetch(recInfoUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displayFoodRecipe(data);
})
})
}

var displayFoodRecipe = function(data) {
    var foodTitle = data.title
    var timePrep = data.readyInMinutes
    var foodImage = data.image
    var foodSource = data.sourceUrl
    console.log(foodTitle, timePrep, foodImage, foodSource)
}

getRandomRecipe();

//var displayFoodRecipe = function (foodName, foodRecipe, foodImage) {
    //console.log(foodName)
    //console.log(foodRecipe)
    //console.log(foodImage)
//}
//displayFoodRecipe()



