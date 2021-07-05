import React, { useState, useEffect } from "react";
import "./TopRatedView.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesActions from "../../redux/movies/movies-actions";
import MovieList from "../../components/MovieList";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Homeview() {
  const location = useLocation();
  const dispatch = useDispatch();
  const topMovieList = useSelector(moviesSelectors.getTopRatedMovies);
  const totalResults = useSelector(moviesSelectors.getTotalResults);
  const [page, setPage] = useState(location?.page || 1);

  //для закрытие меню мобильного при открытии
  useEffect(() => dispatch(moviesActions.closeMenu()), []);

  //для пагинации
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  //при маунте и смене страниц рендерим популярніе фильмы
  useEffect(() => {
    dispatch(moviesOperations.fetchTopRatedMOvies(page));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, page]);

  return (
    <section>
      <div className="container">
        <h1 className="Top__title"> Top Rated</h1>
        <MovieList
          moviesList={topMovieList}
          page={page}
          handlePageChange={handlePageChange}
          totalResults={totalResults}
        />
      </div>
    </section>
  );
}
