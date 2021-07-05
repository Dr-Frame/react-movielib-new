import React, { useCallback, useEffect, useState } from "react";
import "./MovieList.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import genresDB from "../../genres";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import QueuePlayNextRoundedIcon from "@material-ui/icons/QueuePlayNextRounded";
import MovieFilterRoundedIcon from "@material-ui/icons/MovieFilterRounded";
import classnames from "classnames";

import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { motion } from "framer-motion";
import Fallback from "../Fallback";

export default function MovieList({
  moviesList,
  page,
  handlePageChange,
  query,
  totalResults,
}) {
  const location = useLocation();
  const isLoading = useSelector(moviesSelectors.getLoading);
  const favorites = useSelector(moviesSelectors.getFavorited);
  const watched = useSelector(moviesSelectors.getWatched);
  const inQueue = useSelector(moviesSelectors.getInQueue);
  const [resultsPerPage, setResultsPerPage] = useState(20);

  const titleCut = (title) => {
    if (title?.length > 30) {
      return `${title.split(" ").slice(0, 4).join(" ")}...`;
    } else {
      return title;
    }
  };

  const genresCut = (genresArr) => {
    if (genresArr?.length > 4) {
      return genresArr.slice(0, 4);
    } else {
      return genresArr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      exit={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {isLoading ? (
        <Fallback />
      ) : (
        <div className="MovieList__wrapper">
          <ul className="MovieList">
            {moviesList?.map(
              ({
                id,
                title,
                release_date,
                poster_path,
                genre_ids,
                vote_average,
                genres,
              }) => {
                const genresName = [];
                //фиксим кривые айди бекенда
                if (genre_ids) {
                  genre_ids.forEach((genreId) => {
                    genresDB.forEach(({ id, name }) => {
                      if (id === genreId) {
                        return genresName.push(name);
                      }
                    });
                  });
                } else {
                  //если не приходят кривые айди, рендерим по человечески
                  genres.forEach(({ name }) => genresName.push(name));
                }
                return (
                  <li key={id} className="MovieList__flip-card">
                    <NavLink
                      to={{
                        pathname: `movies/${id}`,
                        state: {
                          from: { ...location, page },
                        },
                      }}
                    >
                      <div className="MovieList__flip-card-inner">
                        <div className="MovieList__flip-card-front">
                          <img
                            className="MovieList__img"
                            src={
                              poster_path
                                ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                                : "/img/movie-empty.webp"
                            }
                            alt="movie-name"
                          />
                        </div>
                        <div className="MovieList__flip-card-back">
                          <h2 className="MovieList__title">
                            {titleCut(title)}
                          </h2>
                          <ul className="MovieList__lists">
                            <li>
                              <FavoriteRoundedIcon
                                className={classnames("MovieList__in-list", {
                                  "MovieList__in-list--added": favorites.find(
                                    (movie) => movie.id === id
                                  ),
                                })}
                              />
                            </li>
                            <li>
                              <MovieFilterRoundedIcon
                                className={classnames("MovieList__in-list", {
                                  "MovieList__in-list--added": watched.find(
                                    (movie) => movie.id === id
                                  ),
                                })}
                              />
                            </li>
                            <li>
                              <QueuePlayNextRoundedIcon
                                className={classnames("MovieList__in-list", {
                                  "MovieList__in-list--added": inQueue.find(
                                    (movie) => movie.id === id
                                  ),
                                })}
                              />
                            </li>
                          </ul>
                          <p className="MovieList__descr">
                            <span>Vote:</span>
                            {vote_average}
                          </p>
                          <p className="MovieList__genre">Genres: </p>
                          <ul className="MovieList__genres-list">
                            {genresCut(genresName).map((genre) => (
                              <li key={genre} className="MovieList__genres">
                                -{genre.toLowerCase()}
                                {/* <span>,npm&nbsp;</span> */}
                              </li>
                            ))}
                          </ul>
                          <p className="MovieList__release">
                            <span>Release date:</span>
                            {release_date?.split("").slice(0, 4).join("")}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                );
              }
            )}
          </ul>

          {moviesList.length > 0 && page && (
            <Pagination
              activePage={page}
              itemsCountPerPage={resultsPerPage}
              totalItemsCount={Number(totalResults)}
              pageRangeDisplayed={3}
              onChange={handlePageChange}
              nextPageText={<KeyboardArrowRightIcon />}
              prevPageText={<KeyboardArrowLeftIcon />}
              firstPageText={<SkipPreviousIcon />}
              lastPageText={<SkipNextIcon />}
              innerClass="pagination"
              activeClass="pagination__active-li"
              itemClass="pagination__not-active-li"
            />
          )}
        </div>
      )}
    </motion.div>
  );
}
