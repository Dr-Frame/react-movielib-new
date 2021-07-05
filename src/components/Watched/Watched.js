import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moviesSelectors from "../../redux/movies/movies-selectors";
import "./Watched.scss";
import { useLocation } from "react-router";
import MovieList from "../MovieList/MovieList";
import moviesActions from "../../redux/movies/movies-actions";
import { motion } from "framer-motion";

export default function Favorite() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.page || 1);
  const watched = useSelector(moviesSelectors.getWatched);

  //для закрытие меню мобильного при открытии
  useEffect(() => dispatch(moviesActions.closeMenu()), []);

  //для пагинации функция
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <section className="Watched">
      <div className="container">
        <h1 className="Watched__title">Watched list</h1>
        {watched.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="Watched__empty"
          >
            You have not added any film yet!
          </motion.p>
        ) : (
          <MovieList
            moviesList={watched}
            /* page={page}
            handlePageChange={handlePageChange}
            totalResults={watched.length} */
          />
        )}
      </div>
    </section>
  );
}
