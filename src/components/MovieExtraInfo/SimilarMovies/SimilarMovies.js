import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SimilarMovies.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import { useRouteMatch } from "react-router";
import Pagination from "react-js-pagination";

export default function SimilarMovies() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const [similarMoviesPage, setSimilarMoviesPage] = useState(1);

  useEffect(
    () =>
      dispatch(
        moviesOperations.fetchSimilarMovies(params.id, similarMoviesPage)
      ),
    [dispatch, similarMoviesPage, params.id]
  );
  const similarMovies = useSelector(moviesSelectors.getSimilarMovies);
  const similarMoviesTotalAmount = useSelector(
    moviesSelectors.getSimilarMoviesAmount
  );

  const similarMoviesRelutsPerPage = 20;

  const handlePageChange = (pageNumber) => {
    setSimilarMoviesPage(pageNumber);
  };
  return (
    <section>
      <div className="container">
        <h2>SimilarMovies</h2>
        <ul>
          {similarMovies &&
            similarMovies.map(
              ({ poster_path, title, genre_ids, vote_average, id }) => (
                <li key={id}>
                  {poster_path && (
                    <img
                      className="SimilarMovies__img"
                      src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                      alt={title}
                    ></img>
                  )}
                  <h4 className="SimilarMovies__title">{title}</h4>
                  <p className="SimilarMovies__vote">
                    <span>Vote:</span>
                    {vote_average}
                  </p>
                  <p className="SimilarMovies__department">
                    <span>Genres:</span>
                    {genre_ids}
                  </p>
                </li>
              )
            )}
        </ul>
        {/* <Pagination
          activePage={similarMoviesPage}
          itemsCountPerPage={similarMoviesRelutsPerPage}
          totalItemsCount={Number(similarMoviesTotalAmount)}
          pageRangeDisplayed={1}
          onChange={handlePageChange}
        /> */}
      </div>
    </section>
  );
}
