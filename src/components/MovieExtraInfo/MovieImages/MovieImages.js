import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import "./MovieImages.scss";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import moviesOperations from "../../../redux/movies/movies-operations";

export default function MoviesImages() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  useEffect(
    () => dispatch(moviesOperations.fetchMovieImages(params.id)),
    [dispatch, params.id]
  );

  const moviePictures = useSelector(moviesSelectors.getMoviePictures);

  console.log(moviePictures);
  return (
    <section>
      <div className="container">
        <h2>MoviesImages</h2>
      </div>
    </section>
  );
}

//https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
