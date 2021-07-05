import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Reviews.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import { useRouteMatch } from "react-router";
import { motion } from "framer-motion";
import Fallback from "../../Fallback";

export default function Reviews() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const [reviewPage, setReviewPage] = useState(1);

  const reviewRef = useRef();
  useEffect(() => {
    dispatch(moviesOperations.fetchMovieReviews(params.id, reviewPage));
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
  }, [dispatch, params.id, reviewPage]);

  const reviews = useSelector(moviesSelectors.getMovieReviews);
  const isLoading = useSelector(moviesSelectors.getLoading);
  const isExtraLoading = useSelector(moviesSelectors.getIsExtraLoading);

  return (
    <section className="Reviews" ref={reviewRef}>
      {isExtraLoading && !isLoading ? (
        <Fallback />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          exit={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <h2 className="Reviews__title">Reviews</h2>
          <ul className="Reviews__list">
            {reviews.length === 0 ? (
              <p className="Reviews__no-review"> There is no review yet</p>
            ) : (
              reviews.map(
                ({ id, author, content, author_details: { rating } }) => (
                  <li key={id} className="Reviews__item">
                    <p className="Reviews__author">
                      <span>Author:</span> {author}
                    </p>
                    <p className="Reviews__author">
                      <span>Vote:</span>
                      {rating}
                    </p>
                    <p className="Reviews__descr">{content}</p>
                  </li>
                )
              )
            )}
          </ul>
        </motion.div>
      )}
    </section>
  );
}
//https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
