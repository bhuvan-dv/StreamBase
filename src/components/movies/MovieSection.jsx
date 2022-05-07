import React, { useContext } from "react";
import { MovieContext } from "../../api/MovieContext";
import Spinner from "../../pages/spinner/Spinner";
import Movie from "./Movie";
import Styles from "./movie.module.css";
const MovieSection = () => {
  let { Movies } = useContext(MovieContext);

  return (
    <section className={Styles.movieBlock}>
      <article>
        {Movies.length === 0 || Movies === undefined ? (
          <Spinner />
        ) : (
          Movies.map(movie => {
            return <Movie key={movie.id} {...movie} />;
          })
        )}
      </article>
    </section>
  );
};

export default MovieSection;
