import React from "react";
import Style from "./movie.module.css";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
const Movie = props => {
  // console.log(props);
  const totalStars = 5;
  let {
    title,
    description,
    genre,
    yol,
    language,
    cast,
    ratings,
    downLoadURLPoster,
    downloadURLVideo,
    id,
  } = props.movieVal;
  return (
    <main>
      <header>
        <Link to={{ pathname: `/${title}/${id}` }} state={{ ...props }}>
          <img src={downLoadURLPoster} alt={title} />
        </Link>
      </header>
      <aside>
        <h2>{title}</h2>
        <p className={Style.rating_cast}>
          <span className={Style.movieContent}>
            <li>{language}</li>
            <li>{genre}</li>
            <span className={Style.ratingBlock}>
              {[...new Array(totalStars)].map((arr, index) => {
                return index < ratings ? (
                  <AiFillStar style={{ color: "#ffc107" }} />
                ) : (
                  <AiFillStar />
                );
              })}
            </span>
          </span>
        </p>
        <p className={Style.movieDes}>{description.slice(0, 60)}...</p>
        <p className={Style.cast_block}> {cast}</p>
      </aside>
      <footer>
        <Link to={{ pathname: `/${title}/${id}` }} state={{ ...props }}>
          watch now
        </Link>
      </footer>
    </main>
  );
};

export default Movie;
