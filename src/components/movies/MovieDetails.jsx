import React from "react";
import { useLocation } from "react-router-dom";
import Styles from "./movie.module.css"
import MovieSection from "./MovieSection";
const MovieDetails = (props) => {
    // console.log(props);
  let location = useLocation();
  let { movieVal } = location.state;
  // console.log(movieVal);

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
  } = movieVal;
  return (
    <section id={Styles.moviePlayer}>
      <article>
        <div className={Styles.videoPlayer}>
          <video src={downloadURLVideo} controls autoPlay></video>
        </div>
        <div className={Styles.videoDescription}>
          <h2 style={{color:"#ffc107"}}>{title}</h2>
          <p>Synopsis: {description}</p>
          <p>Genre: {genre}</p>
          <p>Release Date: {yol}</p>
          <p>Language: {language}</p>
          <p>Cast: {cast}</p>
          <p>Rating: {ratings}</p>
        </div>
      </article>
      <footer>
      <MovieSection/>
      </footer>
    </section>
  );
};

export default MovieDetails;
