import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MovieDetailsPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useRouteMatch,
  useHistory,
  useParams,
  NavLink,
} from "react-router-dom";
import { Route, Switch } from "react-router-dom";
//components
import Cast from "../MovieExtraInfo/Cast";
import Reviews from "../MovieExtraInfo/Reviews";
import MovieImages from "../MovieExtraInfo/MovieImages";
import SimilarMovies from "../MovieExtraInfo/SimilarMovies";
import Crew from "../MovieExtraInfo/Crew";
import Recomendations from "../MovieExtraInfo/Recomendations";

import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";
import movieActions from "../../redux/movies/movies-actions";
import { motion } from "framer-motion";
import Fallback from "../Fallback";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import QueuePlayNextRoundedIcon from "@material-ui/icons/QueuePlayNextRounded";
import MovieFilterRoundedIcon from "@material-ui/icons/MovieFilterRounded";
import classnames from "classnames";

export default function MovieDetailsPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const match = useRouteMatch();
  const { params } = match;
  const history = useHistory();
  console.log(location);
  console.log(history);
  //рендерим фильм исходя из айди полученого от мувилиста через params
  useEffect(() => {
    dispatch(moviesOperations.fetchMovieDetails(params.id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, params.id]);

  const isLoading = useSelector(moviesSelectors.getLoading);
  //если есть слово запрос, значит пришли со страницы поиска (пушим строку поиска что бы отобразился запрос который был), если нету то с главной
  /* const handleGoBack = () => {
    //проверка state на null or undefined
    //для посика фильмов с запросом
    if (state?.query) {
      history.push({
        pathname: "/movies",
        //прокидываем на мувисерч обратно номер страницы с которой входили сюда
        page: state.page,
        search: `?query=${state.query}`,
      });
    } //если есть страница то бросаем на ту страницу популярных фильмов
    //для популярных фильмов, возврат на нужную страницу
    else if (state?.page) {
      history.push({
        pathname: "/",
        page: state.page,
      });
    }
    // если нету ни страницы ни запроса(в случае если мы дали ссылку и в истории пусто)
    else {
      history.push({
        pathname: "/",
      });
    }
  }; */

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }

    history.push("/");
  };

  //данные для страницы фильма
  const {
    id,
    poster_path,
    title,
    vote_average,
    overview,
    genres,
    release_date,
    budget,
    production_companies,
    production_countries,
    revenue,
    runtime,
  } = useSelector(moviesSelectors.getMovieDetails);

  //local storage
  const currentMovie = useSelector(moviesSelectors.getMovieDetails);
  const favorited = useSelector(moviesSelectors.getFavorited);
  const watched = useSelector(moviesSelectors.getWatched);
  const inQueue = useSelector(moviesSelectors.getInQueue);

  //стейт для любимых/просмотренных/в очереди фильмов
  const [isMovieIncludedInFavourites, setIsMovieIncludedInFavourites] =
    useState(false);
  const [isMovieIncludedInWatched, setIsMovieIncludedInWatched] =
    useState(false);
  const [isMovieIncludedInQueue, setIsMovieIncludedInQueue] = useState(false);

  //проверка на можно добавить или удалить
  const moviePresenseInArrayCheck = useCallback((movieList, currentId, set) => {
    for (const movie of movieList) {
      if (movie.id === currentId) {
        set(true);
        return;
      } else if (movie.id !== currentId) {
        set(false);
      }
    }
  }, []);

  //для фейворит
  useEffect(
    () =>
      moviePresenseInArrayCheck(
        favorited,
        currentMovie.id,
        setIsMovieIncludedInFavourites
      ),
    [favorited, currentMovie.id, moviePresenseInArrayCheck]
  );
  useEffect(
    () =>
      moviePresenseInArrayCheck(
        watched,
        currentMovie.id,
        setIsMovieIncludedInWatched
      ),
    [watched, currentMovie.id, moviePresenseInArrayCheck]
  );
  useEffect(
    () =>
      moviePresenseInArrayCheck(
        inQueue,
        currentMovie.id,
        setIsMovieIncludedInQueue
      ),
    [inQueue, currentMovie.id, moviePresenseInArrayCheck]
  );

  return (
    <section className="MovieDetailsPage">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="MovieDetails__wrapper"
        >
          <div className="MovieDetailsPage__go-back-wrapper">
            <button
              className="MovieDetailsPage__go-back"
              type="button"
              onClick={handleGoBack}
            >
              Go back
            </button>
          </div>

          {isLoading ? (
            <Fallback />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="MovieDetailsPage__btn-pack">
                {isMovieIncludedInFavourites ? (
                  <li className="MovieDetailsPage__btn-pack__list">
                    <button
                      className="MovieDetailsPage__btn-pack__item"
                      onClick={() => {
                        dispatch(
                          movieActions.deleteFromFavourite(currentMovie.id)
                        );
                        setIsMovieIncludedInFavourites(false);
                      }}
                    >
                      <FavoriteRoundedIcon className="MovieDetailsPage__btn--added" />
                    </button>
                    <span className="MovieDetailsPage__btn__tool-tip">
                      Delete from favorites
                    </span>
                  </li>
                ) : (
                  <li className="MovieDetailsPage__btn-pack__list">
                    <button
                      className="MovieDetailsPage__btn-pack__item"
                      onClick={() =>
                        dispatch(movieActions.addToFavourite(currentMovie))
                      }
                    >
                      <FavoriteRoundedIcon className="MovieDetailsPage__btn--not-added" />
                    </button>
                    <span className="MovieDetailsPage__btn__tool-tip">
                      Add to favorites
                    </span>
                  </li>
                )}
                {isMovieIncludedInWatched ? (
                  <li className="MovieDetailsPage__btn-pack__list">
                    <button
                      className="MovieDetailsPage__btn-pack__item"
                      onClick={() => {
                        dispatch(
                          movieActions.deleteFromWatched(currentMovie.id)
                        );
                        setIsMovieIncludedInWatched(false);
                      }}
                    >
                      <MovieFilterRoundedIcon className="MovieDetailsPage__btn--added" />
                    </button>
                    <span className="MovieDetailsPage__btn__tool-tip">
                      Delete from watched
                    </span>
                  </li>
                ) : (
                  <li className="MovieDetailsPage__btn-pack__list">
                    <button
                      className="MovieDetailsPage__btn-pack__item"
                      onClick={() =>
                        dispatch(movieActions.addToWatched(currentMovie))
                      }
                    >
                      <MovieFilterRoundedIcon className="MovieDetailsPage__btn--not-added" />
                    </button>
                    <span className="MovieDetailsPage__btn__tool-tip">
                      Add to watched
                    </span>
                  </li>
                )}
                {isMovieIncludedInQueue ? (
                  <li className="MovieDetailsPage__btn-pack__list">
                    <button
                      className="MovieDetailsPage__btn-pack__item"
                      onClick={() => {
                        dispatch(movieActions.deleteFromQueue(currentMovie.id));
                        setIsMovieIncludedInQueue(false);
                      }}
                    >
                      <QueuePlayNextRoundedIcon className="MovieDetailsPage__btn--added" />
                    </button>
                    <span className="MovieDetailsPage__btn__tool-tip">
                      Delete from queue
                    </span>
                  </li>
                ) : (
                  <li className="MovieDetailsPage__btn-pack__list">
                    <button
                      className="MovieDetailsPage__btn-pack__item"
                      onClick={() =>
                        dispatch(movieActions.addToQueue(currentMovie))
                      }
                    >
                      <QueuePlayNextRoundedIcon className="MovieDetailsPage__btn--not-added" />
                    </button>
                    <span className="MovieDetailsPage__btn__tool-tip">
                      Add to queue
                    </span>
                  </li>
                )}
              </ul>
              <div className="MovieDetailsPage__movie-info">
                <div className="MovieDetailsPage__movie-info--wrapper">
                  <img
                    className="MovieDetailsPage__poster"
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : "/img/movie-empty.webp"
                    }
                    alt="movie-poster"
                    width="200"
                  ></img>

                  <div className="MovieDetailsPage__info">
                    <h1 className="MovieDetailsPage__title">{title}</h1>
                    <p className="MovieDetailsPage__element">
                      <span>User rate:</span>
                      {vote_average}
                    </p>
                    <p className="MovieDetailsPage__element">
                      <span>Release date:</span> {release_date}
                    </p>

                    <p className="MovieDetailsPage__element">
                      <span>Budget:</span> {budget} $
                    </p>
                    <p className="MovieDetailsPage__element">
                      <span>Revenue:</span> {revenue} $
                    </p>
                    <p className="MovieDetailsPage__element">
                      <span>Run time:</span> {runtime} min
                    </p>
                    <div className="MovieDetailsPage__genres">
                      <p className="MovieDetailsPage__element">
                        <span>Genres:</span>
                      </p>
                      {genres && (
                        <ul className="MovieDetailsPage__genres-list">
                          {genres.map(({ id, name }) => {
                            return (
                              <li
                                key={id}
                                className="MovieDetailsPage__genres--item"
                              >
                                {name},&nbsp;
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>

                    <p className="MovieDetailsPage__element">
                      <span>Countries:</span>
                    </p>
                    {production_countries?.length > 0 && (
                      <ul className="MovieDetailsPage__countries">
                        {production_countries.map(({ name }) => {
                          return (
                            <li
                              key={name}
                              className="MovieDetailsPage__countries__item"
                            >
                              - {name}
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    <p className="MovieDetailsPage__element">
                      <span>Production companies:</span>
                    </p>
                    {production_companies?.length > 0 && (
                      <ul className="MovieDetailsPage__companies">
                        {production_companies.map(({ name }) => {
                          return (
                            <li
                              key={name}
                              className="MovieDetailsPage__companies__item"
                            >
                              - {name}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    <h3 className="MovieDetailsPage__element">
                      <span>Overview</span>
                    </h3>
                    <p className="MovieDetailsPage__element">{overview}</p>
                  </div>
                </div>

                <div className="MovieDetailsPage__extra">
                  <ul className="MovieDetailsPage__extra__list">
                    <li className="MovieDetailsPage__extra__item">
                      <NavLink
                        className="MovieDetailsPage__extra__link"
                        activeClassName="MovieDetailsPage__extra__link--active"
                        to={{
                          pathname: `${match.url}/cast`,
                          state,
                        }}
                      >
                        Cast
                      </NavLink>
                    </li>
                    <li className="MovieDetailsPage__extra__item">
                      <NavLink
                        className="MovieDetailsPage__extra__link"
                        activeClassName="MovieDetailsPage__extra__link--active"
                        to={{
                          pathname: `${match.url}/reviews`,
                          state: state,
                        }}
                      >
                        Reviews
                      </NavLink>
                    </li>

                    <li className="MovieDetailsPage__extra__item">
                      <NavLink
                        className="MovieDetailsPage__extra__link"
                        activeClassName="MovieDetailsPage__extra__link--active"
                        to={{
                          pathname: `${match.url}/crew`,
                          state: state,
                        }}
                      >
                        Crew
                      </NavLink>
                    </li>
                    <li className="MovieDetailsPage__extra__item">
                      <NavLink
                        className="MovieDetailsPage__extra__link"
                        activeClassName="MovieDetailsPage__extra__link--active"
                        to={{
                          pathname: `${match.url}/recomendations`,
                          state: state,
                        }}
                      >
                        Reco
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Switch>
        <Route path={`${match.path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${match.path}/reviews`}>
          <Reviews />
        </Route>

        <Route path={`${match.path}/crew`}>
          <Crew />
        </Route>
        <Route path={`${match.path}/recomendations`}>
          <Recomendations />
        </Route>
      </Switch>
    </section>
  );
}
