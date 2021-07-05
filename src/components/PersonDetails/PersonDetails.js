import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./PersonDetails.scss";
import moviesSelectors from "../../redux/movies/movies-selectors";
import moviesOperations from "../../redux/movies/movies-operations";
import { useRouteMatch } from "react-router";
import MovieList from "../MovieList";
import Fallback from "../Fallback";
import { motion } from "framer-motion";

export default function PersonDetails() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();

  useEffect(() => {
    dispatch(moviesOperations.fetchPersonDetails(params.id));
    dispatch(moviesOperations.fetchPersonParticipation(params.id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, params.id]);

  const personInfo = useSelector(moviesSelectors.getPersonDetails);
  const personParticipation = useSelector(
    moviesSelectors.getPersonParticipation
  );
  const { name, profile_path, birthday, place_of_birth, biography } =
    personInfo;
  const isLoading = useSelector(moviesSelectors.getLoading);
  const isExtraLoading = useSelector(moviesSelectors.getIsExtraLoading);

  console.log(personParticipation);
  return (
    <section className="Person">
      {isLoading ? (
        <Fallback />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container"
        >
          <h1 className="Person__name">{name}</h1>
          {!isLoading && isExtraLoading ? (
            <Fallback />
          ) : (
            <img
              className="Person__img"
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                  : "/img/empty-profile.webp"
              }
              width="200"
              alt={name}
            ></img>
          )}
          <p className="Person__info">Information</p>
          {birthday && place_of_birth ? (
            <div className="Person__info__wrapper">
              <ul className="Person__list">
                <li className="Person__list-item">
                  <p className="Person__decr">
                    <span>Age:</span>

                    {birthday &&
                      new Date().getFullYear() -
                        birthday.split("").slice(0, 4).join("")}
                  </p>
                </li>
                <li className="Person__list-item">
                  <p className="Person__decr">
                    <span>Date of birth:</span> {birthday}
                  </p>
                </li>
                <li className="Person__list-item">
                  <p className="Person__decr">
                    <span>Place of birth:</span> {place_of_birth}
                  </p>
                </li>
              </ul>
              <p className="Person__bio">Biography:</p>
              <p className="Person__bio-descr">{biography}</p>
            </div>
          ) : (
            <p className="Person__no-info">Oops...No information avaliable</p>
          )}

          {personParticipation.length !== 0 && (
            <>
              <h2 className="Person__filmography">Filmography</h2>
              <MovieList moviesList={personParticipation} />
            </>
          )}
        </motion.div>
      )}
    </section>
  );
}
