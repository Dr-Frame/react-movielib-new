import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Queue.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useLocation } from "react-router";
import MovieList from "../MovieList/MovieList";
import moviesActions from "../../redux/movies/movies-actions";
import { motion } from "framer-motion";

export default function Favorite() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(location.page || 1);

  //для закрытие меню мобильного при открытии
  useEffect(() => dispatch(moviesActions.closeMenu()), []);

  const queue = useSelector(moviesSelectors.getInQueue);

  //для пагинации функция
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <section className="Queue">
      <div className="container">
        <h1 className="Queue__title">Queue list</h1>
        {queue.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="Queue__empty"
          >
            You have not added any film yet!
          </motion.p>
        ) : (
          <MovieList
            moviesList={queue}
            /*  page={page}
            handlePageChange={handlePageChange}
            totalResults={queue.length} */
          />
        )}
      </div>
    </section>
  );
}
