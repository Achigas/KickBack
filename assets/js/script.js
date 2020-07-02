var APIKeyOMDB = "70f249c8"
var APIKeySpoon = "2b38497b30584d7d914e0006ce05f848"
var APIKeyMovieDB = "4ee2048f656df52ca79c1b3928871706"
var choice = "Documentary"


var getGenreInfo = function (choice) { 
    var genreUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + APIKeyMovieDB + "&language=en-US";

    fetch(genreUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);

        for (var i=0; i < data.genres.length; i++)
            if (data.genres[i].name === choice) {
                var genreId = data.genres[i].id
            }

            getMovieArray(genreId)
    });
  });
};

var getMovieArray = function (genreId) {
    pageNumber = Math.floor(Math.random() * Math.floor(50))
    console.log(genreId)

    var movieArrayURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + APIKeyMovieDB + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNumber + "&with_genres=" + genreId;
    fetch(movieArrayURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

        randomMovie = Math.floor(Math.random() * Math.floor(20))

        var movieId = data.results[randomMovie].id
        var posterId = data.results[randomMovie].poster_path
        
        var posterUrl = "https://image.tmdb.org/t/p/w200/" + posterId
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
    console.log(movieYear)

    
        });
    });

};

getGenreInfo(choice)