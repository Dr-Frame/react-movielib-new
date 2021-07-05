import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Recomendations.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import Pagination from "react-js-pagination";
import { useRouteMatch } from "react-router";
import { motion } from "framer-motion";
import Fallback from "../../Fallback";
import MovieList from "../../MovieList";

export default function Reviews() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  useEffect(() => {
    dispatch(moviesOperations.fetchMovieRecomendations(params.id));
    recoRef.current.scrollIntoView({ behavior: "smooth" });
  }, [dispatch, params.id]);

  const recoRef = useRef();
  const recomendationList = useSelector(
    moviesSelectors.getMovieRecomendationsList
  );
  const isLoading = useSelector(moviesSelectors.getLoading);
  const isExtraLoading = useSelector(moviesSelectors.getIsExtraLoading);

  return (
    <section ref={recoRef}>
      {isExtraLoading && !isLoading ? (
        <Fallback />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          exit={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="container Recomendations__container"
        >
          <h2 className="Recomendations__title">Recomendations</h2>
          <MovieList moviesList={recomendationList} />
          {/* <ul className="Recomendations__list">
            {recomendationList.map(
              ({ id, poster_path, title, vote_average }) => {
                return (
                  <li key={id} className="Recomendations__flip-card">
                    <div className="Recomendations__flip-card-inner">
                      <div className="Recomendations__flip-card-front">
                        {poster_path && (
                          <img
                            className="Recomendations__img"
                            src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                            alt={title}
                          ></img>
                        )}
                      </div>
                      <div className="Recomendations__flip-card-back">
                        <h3 className="Recomendations__movie-title">
                          <span>Title:</span>
                          {title}
                        </h3>
                        <p className="Recomendations__movie-vote">
                          <span>Vote:</span> {vote_average}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              }
            )}
          </ul> */}
        </motion.div>
      )}
    </section>
  );
}
