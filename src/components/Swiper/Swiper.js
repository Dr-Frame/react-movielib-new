import React from "react";
import "./Swiper.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink, useLocation } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import classnames from "classnames";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import QueuePlayNextRoundedIcon from "@material-ui/icons/QueuePlayNextRounded";
import MovieFilterRoundedIcon from "@material-ui/icons/MovieFilterRounded";
import { useSelector } from "react-redux";
import moviesSelectors from "../../redux/movies/movies-selectors";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function SwiperModule({ moviesList }) {
  const location = useLocation();
  const favorites = useSelector(moviesSelectors.getFavorited);
  const watched = useSelector(moviesSelectors.getWatched);
  const inQueue = useSelector(moviesSelectors.getInQueue);

  const titleCut = (title) => {
    if (title?.length > 30) {
      return `${title.split(" ").slice(0, 4).join(" ")}...`;
    } else {
      return title;
    }
  };

  return (
    <>
      <Swiper
        effect="Flip"
        slidesPerView={5}
        /* spaceBetween={0} */
        slidesPerGroup={5}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        <ul>
          {moviesList?.map(
            ({ id, title, release_date, poster_path, vote_average }) => {
              return (
                <SwiperSlide>
                  <li key={id} className="Swipper__flip-card">
                    <NavLink
                      to={{
                        pathname: `movies/${id}`,
                        state: {
                          from: { ...location },
                        },
                      }}
                    >
                      <div className="Swipper__flip-card-inner">
                        <div className="Swipper__flip-card-front">
                          <img
                            className="Swipper__img"
                            src={
                              poster_path
                                ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                                : "/img/movie-empty.webp"
                            }
                            alt="movie-name"
                          />
                        </div>
                        <div className="Swipper__flip-card-back">
                          <h2 className="Swipper__title">{titleCut(title)}</h2>
                          <ul className="Swipper__lists">
                            <li>
                              <FavoriteRoundedIcon
                                className={classnames("Swipper__in-list", {
                                  "Swipper__in-list--added": favorites.find(
                                    (movie) => movie.id === id
                                  ),
                                })}
                              />
                            </li>
                            <li>
                              <MovieFilterRoundedIcon
                                className={classnames("Swipper__in-list", {
                                  "Swipper__in-list--added": watched.find(
                                    (movie) => movie.id === id
                                  ),
                                })}
                              />
                            </li>
                            <li>
                              <QueuePlayNextRoundedIcon
                                className={classnames("Swipper__in-list", {
                                  "Swipper__in-list--added": inQueue.find(
                                    (movie) => movie.id === id
                                  ),
                                })}
                              />
                            </li>
                          </ul>
                          <p className="Swipper__descr">
                            <span>Vote:</span>
                            {vote_average}
                          </p>
                          <p className="Swipper__release">
                            <span>Release date:</span>
                            {release_date?.split("").slice(0, 4).join("")}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                </SwiperSlide>
              );
            }
          )}
        </ul>
      </Swiper>

      {/* <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
       
      </Swiper> */}
    </>
  );
}
