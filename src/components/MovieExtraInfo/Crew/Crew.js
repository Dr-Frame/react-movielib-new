import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router";
import "./Crew.scss";
import moviesOperations from "../../../redux/movies/movies-operations";
import moviesSelectors from "../../../redux/movies/movies-selectors";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Fallback from "../../Fallback";

export default function Crew() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const location = useLocation();
  const { state } = location;

  const crewRef = useRef();

  useEffect(() => {
    dispatch(moviesOperations.fetchMovieCredits(params.id));
    crewRef.current.scrollIntoView({ behavior: "smooth" });
  }, [dispatch, params.id]);

  const crew = useSelector(moviesSelectors.getMovieCrew);
  const isLoading = useSelector(moviesSelectors.getLoading);
  const isExtraLoading = useSelector(moviesSelectors.getIsExtraLoading);

  return (
    <section ref={crewRef}>
      {isExtraLoading && !isLoading ? (
        <Fallback />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          exit={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="container"
        >
          <h2 className="Crew__title">Crew</h2>
          <div className="Crew">
            <ul className="Crew__list">
              {crew &&
                crew.map(({ id, job, name, profile_path }) => (
                  <li key={id} className="Crew__list-card">
                    <NavLink
                      to={{
                        pathname: `/people/${id}`,
                        state,
                      }}
                    >
                      <div className="Crew__card-wrapper">
                        <div className="Crew__card">
                          <img
                            className="Crew__img"
                            src={
                              profile_path
                                ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                                : "/img/empty-profile.webp"
                            }
                            alt={name}
                          ></img>
                        </div>
                        <div className="Crew__bottom">
                          <h4 className="Crew__name">{name}</h4>
                          <p className="Crew__job">Job:</p>
                          <p className="Crew__job-name">{job}</p>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        </motion.div>
      )}
    </section>
  );
}
