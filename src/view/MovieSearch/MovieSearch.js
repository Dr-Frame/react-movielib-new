import React, { useEffect, useState } from "react";
import "./MovieSearch.scss";
import { useSelector, useDispatch } from "react-redux";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesActions from "../../redux/movies/movies-actions";
import MovieList from "../../components/MovieList";
import { useLocation, useHistory } from "react-router";
import queryString from "query-string";
import { motion } from "framer-motion";

export default function MovieSearch() {
  const dispatch = useDispatch();
  const moviesList = useSelector(moviesSelectors.getMoviesList);
  const location = useLocation();
  const { search } = location;
  const { push } = useHistory();

  /*  //для закрытие меню мобильного при открытии
  useEffect(() => dispatch(moviesActions.closeMenu()), []); */

  //из адресной строки браузера выделяем сам запрос, что бы при обновлении страницы он был как запрос.
  const initialQueryState = queryString.parse(search);

  const [query, setQuery] = useState(initialQueryState.query || "");

  //если вернулись не с 1 страницы списка фильмов, то рендерим ее , если да, то рендерим 1
  const [page, setPage] = useState(location.page || 1);

  //при маунте убираем список популярных фильмов, что бы лист был пустой
  useEffect(() => {
    dispatch(moviesOperations.clearMovieList());
  }, [dispatch]);

  //если слова запроса нету - не рендерим, если есть запрос и рендер списка
  useEffect(() => {
    if (query === "") {
      return;
    }
    dispatch(moviesOperations.fetchSearchMovies(query, page));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, page]);

  //смотрим что бы в адресной строке был запрос
  useEffect(() => {
    push({
      ...location,
      page,
      search: `?query=${query}`,
    });
  }, [query, location.search, page]);

  //запрос
  const changeQuery = (e) => {
    setQuery(e.currentTarget.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query === "") {
      return;
    }
    setPage(1);
    dispatch(moviesOperations.fetchSearchMovies(query));
    location.search = search;
  };

  const totalResults = useSelector(moviesSelectors.getTotalResults);
  const isLoading = useSelector(moviesSelectors.getLoading);
  //для пагинации функция
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <section className="MovieSearch__section">
      <div className="container">
        <motion.form
          initial={{ opacity: 0, y: -50 }}
          exit={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="MovieSearch__form"
          onSubmit={handleSubmit}
        >
          <label className="MovieSearch__label">
            <input
              placeholder="..."
              className="MovieSearch__input"
              value={query}
              onChange={changeQuery}
            />
          </label>
          <button className="MovieSearch__btn" type="submit">
            Search
          </button>
        </motion.form>

        <MovieList
          moviesList={moviesList}
          query={query}
          page={page}
          handlePageChange={handlePageChange}
          totalResults={totalResults}
        />
      </div>
    </section>
  );
}
