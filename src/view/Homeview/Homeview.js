import React, { useState, useEffect } from "react";
import "./Homeview.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
import moviesActions from "../../redux/movies/movies-actions";
import MovieList from "../../components/MovieList";
import Swiper from "../../components/Swiper";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { motion } from "framer-motion";

export default function Homeview() {
  const location = useLocation();
  console.log(location);

  const dispatch = useDispatch();
  const moviesList = useSelector(moviesSelectors.getMoviesList);
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
    dispatch(moviesOperations.fetchPopularMovies(page));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, page]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, y: 0 }}
      className="HomeView"
    >
      <div className="container">
        <h1 className="Homeview__title"> Trending</h1>
        <Swiper moviesList={moviesList} />
        <MovieList
          moviesList={moviesList}
          page={page}
          handlePageChange={handlePageChange}
          totalResults={totalResults}
        />
      </div>
    </motion.section>
  );
}
