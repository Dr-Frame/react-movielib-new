const getQuery = (state) => state.movies.query;
const getMoviesList = (state) => state.movies.moviesList;
const getMovieDetails = (state) => state.movies.movieDetails;
const getLoading = (state) => state.movies.isLoading;
const getIsExtraLoading = (state) => state.movies.isExtraLoading;
const getTotalResults = (state) => state.movies.movieTotalResults;
const getTotalPages = (state) => state.movies.movieTotalPages;
const getMovieCast = (state) => state.movies.movieCredits.cast;
const getMovieCrew = (state) => state.movies.movieCredits.crew;
const getMovieReviews = (state) => state.movies.movieReviews;
const getTotalReviewResults = (state) => state.movies.movieTotalReviews;
const getSimilarMovies = (state) => state.movies.similarMovies;
const getSimilarMoviesAmount = (state) =>
  state.movies.similarMoviesTotalResults;
const getMovieRecomendationsList = (state) => state.movies.movieRecomendations;
const getMoviePictures = (state) => state.movies.movieImages;
const getFavorited = (state) => state.movies.favouriteMovies;
const getWatched = (state) => state.movies.watchedMovies;
const getInQueue = (state) => state.movies.moviesInQueue;
const getPersonDetails = (state) => state.movies.moviePersonDetails;
const getPersonParticipation = (state) => state.movies.personParticipation;
const getTopRatedMovies = (state) => state.movies.topRatedMovies;
const getIsMenuOpened = (state) => state.movies.isMenuOpened;

export default {
  getQuery,
  getMoviesList,
  getMovieDetails,
  getLoading,
  getIsExtraLoading,
  getTotalResults,
  getTotalPages,
  getMovieCast,
  getMovieCrew,
  getMovieReviews,
  getTotalReviewResults,
  getSimilarMovies,
  getSimilarMoviesAmount,
  getMovieRecomendationsList,
  getMoviePictures,
  getFavorited,
  getWatched,
  getInQueue,
  getPersonDetails,
  getPersonParticipation,
  getTopRatedMovies,
  getIsMenuOpened,
};
