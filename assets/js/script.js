var containerMovieEl = document.getElementById("movie-container")
var containerRecipeEl = document.getElementById("recipe-container")
var containerRecButtons = document.getElementById("recipe-buttons")
var containerMovieButtons = document.getElementById("movie-buttons")
var buttonKickback = document.getElementById("kickback-submit")
var pictures = document.getElementById("pictures")

//API Keys
var APIKeyOMDB = "70f249c8"
var APIKeySpoon = "903cd2ab9ccb463c98f08db9266be15c"
var APIKeyMovieDB = "4ee2048f656df52ca79c1b3928871706"
//choice input 
//var choiceMovie = document.getElementById("movie-dropdown").value;
//var choiceRecipe = document.getElementById("recipe-dropdown").value;

//Display movie poster from MovieDB API URL
var displayMoviePoster = function (movieTitle, posterId) {

    containerMovieEl.textContent = ""

    //posterId identifies unique poster identifier for movie
    var posterUrl = "https://image.tmdb.org/t/p/w200/" + posterId

    //create div and img elements to hold image
    var posterEl = document.createElement("div")
    var posterImg = document.createElement("img")
    var movieTitleEl = document.createElement("h3")
    posterImg.setAttribute("src", posterUrl)
    movieTitleEl.textContent = movieTitle
    movieTitleEl.setAttribute("class","movieTitle")
    posterImg.setAttribute("class","posterImg")
    
    //append to the poster element and then the movie container
    posterEl.appendChild(movieTitleEl);
    posterEl.appendChild(posterImg);

    containerMovieEl.appendChild(posterEl)

}

//Display movie information like Name, run time , etc 
var displayMovieInfo = function (data) {

    var moviePlot = data.Plot
    var movieYear = data.Year
    var movieRuntime = data.Runtime
    var movieRating = data.Rated 
    
    //create elements to display movie data
    var movieInfoEl = document.createElement("div");
    var moviePlotEl = document.createElement("p");
    var movieRuntimeEl = document.createElement("p");
    var movieRatingEl = document.createElement("p");
    var movieYearEl = document.createElement("p");
    var movieRatingEl = document.createElement("p")
    var movieRatingColor = document.createElement("span")
    movieRatingColor.textContent = movieRating

        if (movieRating === "R" || movieRating === "TV-MA") {
            movieRatingColor.setAttribute("class", "bg-danger text-white p-1")
        } else if (movieRating === "PG-13") {
            movieRatingColor.setAttribute("class", "bg-warning text-black p-1")
        } else {
            movieRatingColor.setAttribute("class", "bg-success text-white p-1")
        }


    //add movie data to HTML elements
    moviePlotEl.textContent = moviePlot;
    movieRuntimeEl.textContent = "Runtime: " + movieRuntime;
    movieRatingEl.textContent = "Rating: ";
    movieYearEl.textContent = "Year: " + movieYear;

    movieRatingEl.appendChild(movieRatingColor)

    //Append to div section
    movieInfoEl.appendChild(moviePlotEl);
    movieInfoEl.appendChild(movieRuntimeEl);
    movieInfoEl.appendChild(movieRatingEl);
    movieInfoEl.appendChild(movieYearEl);
    moviePlotEl.setAttribute("class","moviePlot")
    movieRuntimeEl.setAttribute("class","movieExtraInfo")
    movieRatingEl.setAttribute("class","movieExtraInfo")
    movieYearEl.setAttribute("class","movieExtraInfo")

    //append to movie container
    containerMovieEl.appendChild(movieInfoEl)

    var newMovieBtn = document.createElement("btn")
    newMovieBtn.setAttribute("type", "submit");
    newMovieBtn.setAttribute("class", "btn-movienew");
    newMovieBtn.textContent = "New Movie"
    newMovieBtn.addEventListener("click", function () {
        getGenreInfo(document.getElementById("movie-dropdown").value)
    })

    containerMovieEl.appendChild(newMovieBtn)


}

//pass in genre choice to get genre IDs from MovieDB API
var getGenreInfo = function (choice) { 
    event.preventDefault()
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
        var movieTitle = data.results[randomMovie].title 
        var posterId = data.results[randomMovie].poster_path

        displayMoviePoster(movieTitle,posterId)
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
    event.preventDefault()
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

    var newRecipeBtn = document.createElement("btn")
    newRecipeBtn.setAttribute("type", "submit");
    newRecipeBtn.setAttribute("class", "btn-recipenew");
    newRecipeBtn.textContent = "New Recipe"
    newRecipeBtn.addEventListener("click", function () {
        getRandomRecipe(document.getElementById("recipe-dropdown").value)
    })

    containerRecipeEl.appendChild(newRecipeBtn)
    pictures.style.display = "none"

}


var generateRandRecMov = function(choiceMov, choiceRec) {
    event.preventDefault()
    //console.log(choiceMov)
    if (!choiceMov) {
        console.log("hi")
    }
//add here. if choiceMovie is blank, if choiceRecipe is blank, do this //
    var containerResultsEl = document.getElementById("results-container")
    containerRecipeEl.setAttribute("class","colA col-sm-6 col-md-5 offset-md-5 col-lg-4 offset-lg-1 mb-2")
    containerMovieEl.setAttribute("class", "colB col-sm-6 col-md-5 offset-md-5 col-lg-4 offset-lg-1 mb-2")

    getRandomRecipe(choiceRec);
    getGenreInfo(choiceMov);
    pictures.style.display = "none"
}


buttonKickback.addEventListener("click", function () {
    var choiceMovie = document.getElementById("movie-dropdown").value;
    var choiceRecipe = document.getElementById("recipe-dropdown").value;
    //console.log(choiceMovie)
    generateRandRecMov(choiceMovie, choiceRecipe)
} )
