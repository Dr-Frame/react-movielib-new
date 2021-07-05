import { createAction } from "@reduxjs/toolkit";

//поиск фильмов
const searchMovieRequest = createAction("movies/searchMovieRequest");
const searchMovieSuccess = createAction("movies/searchMovieSuccess");
const searchMovieError = createAction("movies/searchMovieError");

const fetchPopularMovieRequest = createAction(
  "movies/fetchPopularMovieRequest"
);
const fetchPopularMovieSuccess = createAction(
  "movies/fetchPopularMovieSuccess"
);
const fetchPopularMovieError = createAction("movies/fetchPopularMovieError");

const fetchMovieDetailsRequest = createAction(
  "movies/fetchMovieDetailsRequest"
);
const fetchMovieDetailsSuccess = createAction(
  "movies/fetchMovieDetailsSuccess"
);
const fetchMovieDetailsError = createAction("movies/fetchMovieDetailsError");

const fetchMovieCreditsRequest = createAction(
  "movies/fetchMovieCreditsRequest"
);
const fetchMovieCreditsSuccess = createAction(
  "movies/fetchMovieCreditsSuccess"
);
const fetchMovieCreditsError = createAction("movies/fetchMovieCreditsError");

const fetchMovieReviewsRequest = createAction(
  "movies/fetchMovieReviewsRequest"
);
const fetchMovieReviewsSuccess = createAction(
  "movies/fetchMovieReviewsSuccess"
);
const fetchMovieReviewsError = createAction("movies/fetchMovieReviewsError");

const fetchTotalPages = createAction("movies/fetchTotalPages");
const fetchTotalResults = createAction("movies/fetchTotalResults");
const fetchReviewsTotalResults = createAction(
  "movies/fetchReviewsTotalResults"
);

//похожие фильмы
const fetchSimilarMoviesRequest = createAction(
  "movies/fetchSimilarMoviesRequest"
);
const fetchSimilarMoviesSuccess = createAction(
  "movies/fetchSimilarMoviesSuccess"
);
const fetchSimilarMoviesError = createAction("movies/fetchSimilarMoviesError");
const fetchSimalarMoviesResults = createAction(
  "movies/fetchSimalarMoviesResults"
);

//фильмы рекомендации
const fetchMovieRecomendationsRequest = createAction(
  "movies/fetchMovieRecomendationsRequest"
);
const fetchMovieRecomendationsSuccess = createAction(
  "movies/fetchMovieRecomendationsSuccess"
);
const fetchMovieRecomendationsError = createAction(
  "movies/fetchMovieRecomendationsError"
);

//картинки с фильма
const fetchMovieImagesRequest = createAction("movies/fetchMovieImagesRequest");
const fetchMovieImagesSuccess = createAction("movies/fetchMovieImagesSuccess");
const fetchMovieImagesError = createAction("movies/fetchMovieImagesError");

//данные о персоне
const fetchPersonDetailsRequest = createAction(
  "movies/fetchPersonDetailsRequest"
);
const fetchPersonDetailsSuccess = createAction(
  "movies/fetchPersonDetailsSuccess"
);
const fetchPersonDetailsError = createAction("movies/fetchPersonDetailsError");

//данные об участии человека в фильме команде
const fetchPersonParticipationRequest = createAction(
  "movies/fetchPersonParticipationRequest"
);
const fetchPersonParticipationSuccess = createAction(
  "movies/fetchPersonParticipationSuccess"
);
const fetchPersonParticipationError = createAction(
  "movies/fetchPersonParticipationError"
);

//топ фильмы
const fetchTopRatedMoviesRequest = createAction(
  "movies/fetchTopRatedMoviesRequest"
);
const fetchTopRatedMoviesSuccess = createAction(
  "movies/fetchTopRatedMoviesSuccess"
);
const fetchTopRatedMoviesError = createAction(
  "movies/fetchTopRatedMoviesError"
);

//local storage actions
const addToFavourite = createAction("movies/addToFavourite", (movie) => ({
  payload: movie,
}));
const deleteFromFavourite = createAction(
  "movies/deleteFromFavourite",
  (movieId) => ({ payload: movieId })
);
const addToWatched = createAction("movies/addToWatched");
const deleteFromWatched = createAction("movies/deleteFromWatched");
const addToQueue = createAction("movies/addToQueue");
const deleteFromQueue = createAction("movies/deleteFromQueue");

//доп действия
const changeQuery = createAction("movies/changeQuery");
const clearQuery = createAction("movies/clearQuery");
const clearMovieList = createAction("movies/clearMovieList");
const closeMenu = createAction("movies/closeMenu");
const openMenu = createAction("movies/openMenu");

export default {
  clearQuery,
  changeQuery,
  searchMovieRequest,
  searchMovieSuccess,
  searchMovieError,
  fetchPopularMovieRequest,
  fetchPopularMovieSuccess,
  fetchPopularMovieError,
  fetchMovieDetailsRequest,
  fetchMovieDetailsSuccess,
  fetchMovieDetailsError,
  fetchTotalPages,
  fetchTotalResults,
  clearMovieList,
  fetchMovieCreditsRequest,
  fetchMovieCreditsSuccess,
  fetchMovieCreditsError,
  fetchMovieReviewsRequest,
  fetchMovieReviewsSuccess,
  fetchMovieReviewsError,
  fetchReviewsTotalResults,
  fetchSimilarMoviesRequest,
  fetchSimilarMoviesSuccess,
  fetchSimilarMoviesError,
  fetchSimalarMoviesResults,
  fetchMovieRecomendationsRequest,
  fetchMovieRecomendationsSuccess,
  fetchMovieRecomendationsError,
  fetchMovieImagesRequest,
  fetchMovieImagesSuccess,
  fetchMovieImagesError,
  addToFavourite,
  addToWatched,
  addToQueue,
  deleteFromFavourite,
  deleteFromWatched,
  deleteFromQueue,
  fetchPersonDetailsRequest,
  fetchPersonDetailsSuccess,
  fetchPersonDetailsError,
  fetchPersonParticipationRequest,
  fetchPersonParticipationSuccess,
  fetchPersonParticipationError,
  fetchTopRatedMoviesRequest,
  fetchTopRatedMoviesSuccess,
  fetchTopRatedMoviesError,
  closeMenu,
  openMenu,
};
