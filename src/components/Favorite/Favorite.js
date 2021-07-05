import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Favorite.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
import { useLocation } from "react-router";
import MovieList from "../MovieList/MovieList";
import moviesActions from "../../redux/movies/movies-actions";
import { motion } from "framer-motion";

export default function Favorite() {
  const location = useLocation();
  const [page, setPage] = useState(location.page || 1);

  const dispatch = useDispatch();
  const favorited = useSelector(moviesSelectors.getFavorited);

  //для закрытие меню мобильного при открытии
  useEffect(() => dispatch(moviesActions.closeMenu()), []);

  //для пагинации функция
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <section className="Favorite">
      <div className="container">
        <h1 className="Favorite__title">Favorite list</h1>
        {favorited.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="Favorite__empty"
          >
            You have not added any film yet!
          </motion.p>
        ) : (
          <MovieList
            moviesList={favorited}
            /* page={page}
            handlePageChange={handlePageChange}
            totalResults={favorited.length} */
          />
        )}
      </div>
    </section>
  );
}
