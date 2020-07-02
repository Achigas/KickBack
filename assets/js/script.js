var APIKeyOMDB = "70f249c8"
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