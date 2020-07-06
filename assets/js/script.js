var containerMovieEl = document.getElementById("movie-container")
var containerRecipeEl = document.getElementById("recipe-container")
var buttonKickback = document.getElementById("kickback-submit")

//API Keys
var APIKeyOMDB = "70f249c8"
var APIKeySpoon = "2b38497b30584d7d914e0006ce05f848"
var APIKeyMovieDB = "4ee2048f656df52ca79c1b3928871706"
//choice input 
//var choiceMovie = document.getElementById("movie-dropdown").value;
//var choiceRecipe = document.getElementById("recipe-dropdown").value;

//Display movie poster from MovieDB API URL
var displayMoviePoster = function (posterId) {

    containerMovieEl.textContent = ""

    //posterId identifies unique poster identifier for movie
    var posterUrl = "https://image.tmdb.org/t/p/w200/" + posterId

    //create div and img elements to hold image
    var posterEl = document.createElement("div")
    var posterImg = document.createElement("img")
    posterImg.setAttribute("src", posterUrl)
    
    //append to the poster element and then the movie container
    posterEl.appendChild(posterImg);
    containerMovieEl.appendChild(posterEl);

}

//Display movie information like Name, run time , etc 
var displayMovieInfo = function (data) {

    var movieTitle = data.Title
    var moviePlot = data.Plot
    var movieActors = data.Actors
    var movieYear = data.Year
    var movieRuntime = data.Runtime
    var movieRating = data.Rated 
    
    console.log(movieTitle)
    console.log(moviePlot)
    console.log(movieRating)

    //create elements to display movie data
    var movieInfoEl = document.createElement("div");
    var movieTitleEl = document.createElement("h3");
    var moviePlotEl = document.createElement("p");
    var movieRuntimeEl = document.createElement("p");
    var movieRatingEl = document.createElement("p");
    var movieYearEl = document.createElement("p");

    //add movie data to HTML elements
    movieTitleEl.textContent = movieTitle;
    moviePlotEl.textContent = moviePlot;
    movieRuntimeEl.textContent = "Runtime: " + movieRuntime;
    movieRatingEl.textContent = "Rating: " + movieRating;
    movieYearEl.textContent = "Year: " + movieYear;

    //Append to div section
    movieInfoEl.appendChild(movieTitleEl);
    movieInfoEl.appendChild(moviePlotEl);
    movieInfoEl.appendChild(movieRuntimeEl);
    movieInfoEl.appendChild(movieRatingEl);
    movieInfoEl.appendChild(movieYearEl);
    movieTitleEl.setAttribute("class","movieTitle")
    moviePlotEl.setAttribute("class","moviePlot")
    movieRuntimeEl.setAttribute("class","movieExtraInfo")
    movieRatingEl.setAttribute("class","movieExtraInfo")
    movieYearEl.setAttribute("class","movieExtraInfo")

    //append to movie container
    containerMovieEl.appendChild(movieInfoEl)

}

//pass in genre choice to get genre IDs from MovieDB API
var getGenreInfo = function (choice) { 
    var genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + APIKeyMovieDB + "&language=en-US";

    fetch(genreUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        
        //for loop to find the ID for matching choice
        for (var i=0; i < data.genres.length; i++)
            if (data.genres[i].name === choice) {
                var genreId = data.genres[i].id
            }

            //get array of movies with that genreID
            getMovieArray(genreId)
    });
  });
};

//Movie array
var getMovieArray = function (genreId) {
    //random page -- organized from most to least popular - 50 is accessing top 1000 movies - can be variable
    pageNumber = Math.floor(Math.random() * Math.floor(50))
    console.log(genreId)

    //fetching movies what genre
    var movieArrayURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKeyMovieDB + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNumber + "&with_genres=" + genreId;
    fetch(movieArrayURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        
        //get a random movie from the random page
        randomMovie = Math.floor(Math.random() * Math.floor(20))
        
        var movieId = data.results[randomMovie].id
        var posterId = data.results[randomMovie].poster_path

        displayMoviePoster(posterId)
        getMovieInfo(movieId)
        });
    });
};

//Movie information from the Movie DB with movie ID. This will get a OMDB/IMDB movie ID.
var getMovieInfo = function (movieId) {

    var getMovieDetailsUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + APIKeyMovieDB + "&language=en-US";
    fetch(getMovieDetailsUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

    idIMDB = data.imdb_id;

    getIMDBinfo(idIMDB);

    });
    });
};

//call to OMDB for cleaner data and synopsis 
var getIMDBinfo = function (idIMDB) {
    var getMovieInfoIMDBUrl = "http://www.omdbapi.com/?i=" + idIMDB + "&apikey=" + APIKeyOMDB;
    fetch(getMovieInfoIMDBUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

    displayMovieInfo(data)

    
        });
    });

};


var getRandomRecipe = function (cuisineType) {
    var offsetId = Math.floor(Math.random() * Math.floor(200));
    var typeFoodUrl = "https://api.spoonacular.com/recipes/complexSearch?cuisine=" + cuisineType + "&number=100&apiKey=" + APIKeySpoon + "&offset=" + offsetId; 
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

    containerRecipeEl.textContent = ""

    var foodTitle = data.title
    var timePrep = data.readyInMinutes
    var foodImage = data.image
    var foodSource = data.sourceUrl
    console.log(foodTitle, timePrep, foodImage, foodSource)

    var recipeInfoEl = document.createElement("div");
    var recipeNameEl = document.createElement("h3");

    var recipeSourceLink = document.createElement("a");
    var recipeImageEl = document.createElement("img");
    var recipePreptimeEl = document.createElement("p");
    
    recipeSourceLink.setAttribute("href", foodSource)
    recipeImageEl.setAttribute("src", foodImage)
    recipeImageEl.setAttribute("class", "recipeImage")
    recipeNameEl.setAttribute("class", "recipeName")
    recipePreptimeEl.setAttribute("class", "recipePreptime")

    recipeSourceLink.appendChild(recipeImageEl)

    recipeNameEl.textContent = foodTitle;
    recipePreptimeEl.textContent = "Prep time: " + timePrep + "  minutes";
    
    recipeInfoEl.appendChild(recipeNameEl)
    recipeInfoEl.appendChild(recipePreptimeEl)
    recipeInfoEl.appendChild(recipeSourceLink)

    containerRecipeEl.appendChild(recipeInfoEl)



}


var generateRandRecMov = function(choiceMov, choiceRec) {
    event.preventDefault()
    getRandomRecipe(choiceRec);
    getGenreInfo(choiceMov);
}


buttonKickback.addEventListener("click", function () {
    var choiceMovie = document.getElementById("movie-dropdown").value;
    var choiceRecipe = document.getElementById("recipe-dropdown").value;
    generateRandRecMov(choiceMovie, choiceRecipe)
} )


