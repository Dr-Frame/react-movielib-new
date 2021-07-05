import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import movieActions from "../movies/movies-actions";

const query = createReducer("", {
  [movieActions.changeQuery]: (_, { payload }) => payload,
  [movieActions.clearQuery]: () => "",
});

//отвечает за открытие/закрытие меню мобилка
const isMenuOpened = createReducer(false, {
  [movieActions.closeMenu]: () => false,
  [movieActions.openMenu]: () => true,
});

//Массивы данных (фильмы, обзоры и т.д)
const topRatedMovies = createReducer([], {
  [movieActions.fetchTopRatedMoviesSuccess]: (_, { payload }) => payload,
});
const moviesList = createReducer([], {
  [movieActions.searchMovieSuccess]: (_, { payload }) => payload,
  [movieActions.fetchPopularMovieSuccess]: (_, { payload }) => payload,
  [movieActions.clearMovieList]: () => [],
});
const movieDetails = createReducer([], {
  [movieActions.fetchMovieDetailsSuccess]: (_, { payload }) => payload,
});
const movieCredits = createReducer(
  {},
  {
    [movieActions.fetchMovieCreditsSuccess]: (_, { payload }) => payload,
  }
);
const movieReviews = createReducer([], {
  [movieActions.fetchMovieReviewsSuccess]: (_, { payload }) => payload,
});
const similarMovies = createReducer([], {
  [movieActions.fetchSimilarMoviesSuccess]: (_, { payload }) => payload,
});
const movieRecomendations = createReducer([], {
  [movieActions.fetchMovieRecomendationsSuccess]: (_, { payload }) => payload,
});
const movieImages = createReducer([], {
  [movieActions.fetchMovieImagesSuccess]: (_, { payload }) => payload,
});

const moviePersonDetails = createReducer(
  {},
  {
    [movieActions.fetchPersonDetailsSuccess]: (_, { payload }) => payload,
  }
);

const personParticipation = createReducer([], {
  [movieActions.fetchPersonParticipationSuccess]: (_, { payload }) => payload,
});

//Количество результатов каких либо запросов

const movieTotalResults = createReducer("", {
  [movieActions.fetchTotalResults]: (_, { payload }) => payload,
});
const movieTotalPages = createReducer("", {
  [movieActions.fetchTotalPages]: (_, { payload }) => payload,
});
const movieTotalReviews = createReducer("", {
  [movieActions.fetchReviewsTotalResults]: (_, { payload }) => payload,
});
const similarMoviesTotalResults = createReducer("", {
  [movieActions.fetchSimalarMoviesResults]: (_, { payload }) => payload,
});

// LocalStorage массивы
const favouriteMovies = createReducer([], {
  [movieActions.addToFavourite]: (state, { payload }) => [...state, payload],
  [movieActions.deleteFromFavourite]: (state, { payload }) =>
    state.filter((movie) => Number(movie.id) !== Number(payload)),
});

const watchedMovies = createReducer([], {
  [movieActions.addToWatched]: (state, { payload }) => [...state, payload],
  [movieActions.deleteFromWatched]: (state, { payload }) =>
    state.filter((movie) => Number(movie.id) !== Number(payload)),
});
const moviesInQueue = createReducer([], {
  [movieActions.addToQueue]: (state, { payload }) => [...state, payload],
  [movieActions.deleteFromQueue]: (state, { payload }) =>
    state.filter((movie) => Number(movie.id) !== Number(payload)),
});

//процес загрузки данных
const isLoading = createReducer(false, {
  [movieActions.searchMovieRequest]: () => true,
  [movieActions.searchMovieSuccess]: () => false,
  [movieActions.searchMovieError]: () => false,
  [movieActions.fetchPopularMovieRequest]: () => true,
  [movieActions.fetchPopularMovieSuccess]: () => false,
  [movieActions.fetchPopularMovieError]: () => false,
  [movieActions.fetchMovieDetailsRequest]: () => true,
  [movieActions.fetchMovieDetailsSuccess]: () => false,
  [movieActions.fetchMovieDetailsError]: () => false,

  [movieActions.fetchMovieImagesRequest]: () => true,
  [movieActions.fetchMovieImagesSuccess]: () => false,
  [movieActions.fetchMovieImagesError]: () => false,
  [movieActions.fetchPersonDetailsRequest]: () => true,
  [movieActions.fetchPersonDetailsSuccess]: () => false,
  [movieActions.fetchPersonDetailsError]: () => false,
  [movieActions.fetchPersonParticipationRequest]: () => true,
  [movieActions.fetchPersonParticipationSuccess]: () => false,
  [movieActions.fetchPersonParticipationError]: () => false,
  [movieActions.fetchTopRatedMoviesRequest]: () => true,
  [movieActions.fetchTopRatedMoviesSuccess]: () => false,
  [movieActions.fetchTopRatedMoviesError]: () => false,
});

const isExtraLoading = createReducer(false, {
  [movieActions.fetchMovieCreditsRequest]: () => true,
  [movieActions.fetchMovieCreditsSuccess]: () => false,
  [movieActions.fetchMovieCreditsError]: () => false,
  [movieActions.fetchMovieReviewsRequest]: () => true,
  [movieActions.fetchMovieReviewsSuccess]: () => false,
  [movieActions.fetchMovieReviewsError]: () => false,
  [movieActions.fetchSimilarMoviesRequest]: () => true,
  [movieActions.fetchSimilarMoviesSuccess]: () => false,
  [movieActions.fetchSimilarMoviesError]: () => false,
  [movieActions.fetchMovieRecomendationsRequest]: () => true,
  [movieActions.fetchMovieRecomendationsSuccess]: () => false,
  [movieActions.fetchMovieRecomendationsError]: () => false,
});

export default combineReducers({
  query,
  moviesList,
  isLoading,
  movieDetails,
  movieTotalResults,
  movieTotalPages,
  movieCredits,
  movieTotalReviews,
  movieReviews,
  similarMoviesTotalResults,
  similarMovies,
  movieRecomendations,
  movieImages,
  favouriteMovies,
  watchedMovies,
  moviesInQueue,
  moviePersonDetails,
  personParticipation,
  topRatedMovies,
  isMenuOpened,
  isExtraLoading,
});
