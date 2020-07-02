var APIKeyOMDB = "70f249c8"
var APIKeySpoon = "2b38497b30584d7d914e0006ce05f848"
var APIKeyMovieDB = "4ee2048f656df52ca79c1b3928871706"


var getGenreInfo = function (choice) { 
    var genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + APIKeyMovieDB + "&language=en-US";

    fetch(genreUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
    })
  })
}

var getMovieArray = function (genreID) {
    var GenreID = "35"
    pageNumber = Math.floor(Math.random() * Math.floor(50))

    var movieArrayURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKeyMovieDB + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNumber + "&with_genres=" + GenreID;
    fetch(movieArrayURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        randomMovie = Math.floor(Math.random() * Math.floor(20))

        var movieTitle = data.results[randomMovie].title
        var moviePlot = data.results[randomMovie].overview
        var movieId = data.results[randomMovie].id
        var posterId = data.results[randomMovie].poster_path
        
        var posterUrl = "https://image.tmdb.org/t/p/w500/" + posterId
        console.log(movieTitle)
        console.log(posterUrl)

        getMovieInfo(movieId)
        });
    });
};

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

var getIMDBinfo = function (idIMDB) {
    var getMovieInfoIMDBUrl = "http://www.omdbapi.com/?i=" + idIMDB + "&apikey=" + APIKeyOMDB;
    fetch(getMovieInfoIMDBUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

    var movieTitle = data.Title
    var moviePlot = data.Plot
    var movieActors = data.Actors
    var movieYear = data.Year
    var movieRunTime = data.Runtime
    var movieRating = data.rated 
    
    console.log(movieTitle)
    console.log(moviePlot)
    console.log(movieActors)

    
        });
    });

};

getMovieArray()