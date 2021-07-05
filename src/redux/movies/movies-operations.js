import axios from "axios";
import movieActions from "./movies-actions";

const key = "3550330ecc32a34c7342dbd44dd96d6e";

const changeQuery = (query) => (dispatch) => {
  dispatch(movieActions.changeQuery(query));
};

const clearQuery = () => (dispatch) => {
  dispatch(movieActions.clearQuery());
};

const clearMovieList = () => (dispatch) => {
  dispatch(movieActions.clearMovieList());
};

//фильмы по запросу
const fetchSearchMovies =
  (query, page = 1) =>
  async (dispatch) => {
    const link = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=${page}&include_adult=false`;

    dispatch(movieActions.searchMovieRequest());

    try {
      await axios.get(link).then(({ data }) => {
        console.log(data);
        dispatch(movieActions.searchMovieSuccess(data.results));
        dispatch(movieActions.fetchTotalResults(data.total_results));
        dispatch(movieActions.fetchTotalPages(data.total_pages));
      });
    } catch (error) {
      dispatch(movieActions.searchMovieError(error));
    }
  };

// популярные фильмы
const fetchPopularMovies =
  (page = 1) =>
  async (dispatch) => {
    const link = `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}&page=${page}`;

    dispatch(movieActions.fetchPopularMovieRequest());

    try {
      await axios.get(link).then(({ data }) => {
        dispatch(movieActions.fetchPopularMovieSuccess(data.results));
        dispatch(movieActions.fetchTotalResults(data.total_results));
        dispatch(movieActions.fetchTotalPages(data.total_pages));
      });
    } catch (error) {
      dispatch(movieActions.fetchPopularMovieError(error));
    }
  };

//детали фильма
const fetchMovieDetails = (movieId) => async (dispatch) => {
  const link = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`;

  dispatch(movieActions.fetchMovieDetailsRequest());
  try {
    axios
      .get(link)
      .then(({ data }) =>
        dispatch(movieActions.fetchMovieDetailsSuccess(data))
      );
  } catch (error) {
    dispatch(movieActions.fetchMovieDetailsError(error));
  }
};

//команда/актеры фильма
const fetchMovieCredits = (movieId) => async (dispatch) => {
  const link = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=en-US`;

  dispatch(movieActions.fetchMovieCreditsRequest());

  try {
    await axios
      .get(link)
      .then(({ data }) =>
        dispatch(movieActions.fetchMovieCreditsSuccess(data))
      );
  } catch (error) {
    dispatch(movieActions.fetchMovieCreditsError(error));
  }
};

//отзывы о фильме
const fetchMovieReviews =
  (movieId, page = 1) =>
  async (dispatch) => {
    const link = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${key}&language=en-US&page=${page}`;

    dispatch(movieActions.fetchMovieReviewsRequest());

    try {
      await axios.get(link).then(({ data }) => {
        dispatch(movieActions.fetchMovieReviewsSuccess(data.results));
        dispatch(movieActions.fetchReviewsTotalResults(data.total_results));
      });
    } catch (error) {
      dispatch(movieActions.fetchMovieReviewsError(error));
    }
  };

//идентичные фильмы
const fetchSimilarMovies =
  (movieId, page = 1) =>
  async (dispatch) => {
    const link = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${key}&language=en-US&page=${page}`;

    dispatch(movieActions.fetchSimilarMoviesRequest());

    try {
      await axios.get(link).then(({ data }) => {
        dispatch(movieActions.fetchSimilarMoviesSuccess(data.results));
        dispatch(movieActions.fetchSimalarMoviesResults(data.total_results));
      });
    } catch (error) {
      dispatch(movieActions.fetchSimilarMoviesError(error));
    }
  };

//фильмы рекомендации
const fetchMovieRecomendations =
  (movieId, page = 1) =>
  async (dispatch) => {
    const link = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${key}&language=en-US&page=${page}`;

    dispatch(movieActions.fetchMovieRecomendationsRequest());

    try {
      await axios
        .get(link)
        .then(({ data }) =>
          dispatch(movieActions.fetchMovieRecomendationsSuccess(data.results))
        );
    } catch (error) {
      dispatch(movieActions.fetchMovieRecomendationsError(error));
    }
  };

//картинки с фильма
const fetchMovieImages = (movieId) => async (dispatch) => {
  const link = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${key}&language=en-US`;

  dispatch(movieActions.fetchMovieImagesRequest());

  try {
    await axios
      .get(link)
      .then(({ data }) => dispatch(movieActions.fetchMovieImagesSuccess(data)));
  } catch (error) {
    dispatch(movieActions.fetchMovieImagesError(error));
  }
};

//данные о человеке
const fetchPersonDetails = (personID) => async (dispatch) => {
  const link = `https://api.themoviedb.org/3/person/${personID}?api_key=${key}&language=en-US`;

  dispatch(movieActions.fetchPersonDetailsRequest());

  try {
    await axios
      .get(link)
      .then(({ data }) =>
        dispatch(movieActions.fetchPersonDetailsSuccess(data))
      );
  } catch (error) {
    dispatch(movieActions.fetchPersonDetailsError(error));
  }
};

const fetchPersonParticipation = (personID) => async (dispatch) => {
  const link = `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${key}&language=en-US`;

  dispatch(movieActions.fetchPersonParticipationRequest());

  try {
    await axios
      .get(link)
      .then(({ data }) =>
        dispatch(movieActions.fetchPersonParticipationSuccess(data.cast))
      );
  } catch (error) {
    dispatch(movieActions.fetchPersonParticipationError(error));
  }
};

const fetchTopRatedMOvies =
  (page = 1) =>
  async (dispatch) => {
    const link = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${page}`;
    dispatch(movieActions.fetchTopRatedMoviesRequest());

    try {
      await axios.get(link).then(({ data }) => {
        console.log(data);
        dispatch(movieActions.fetchTopRatedMoviesSuccess(data.results));
        dispatch(movieActions.fetchTotalResults(data.total_results));
        dispatch(movieActions.fetchTotalPages(data.total_pages));
      });
    } catch (error) {
      dispatch(movieActions.fetchTopRatedMoviesError(error));
    }
  };

export default {
  clearQuery,
  changeQuery,
  fetchSearchMovies,
  fetchPopularMovies,
  fetchMovieDetails,
  clearMovieList,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchSimilarMovies,
  fetchMovieRecomendations,
  fetchMovieImages,
  fetchPersonDetails,
  fetchPersonParticipation,
  fetchTopRatedMOvies,
};
