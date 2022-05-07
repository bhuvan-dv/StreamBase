import React, { Fragment, useContext, useRef, useState } from "react";
// import video from "./arabic_kuthu.mp4";
import Styles from "./video.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { MovieContext } from "../../api/MovieContext";
import { Link } from "react-router-dom";
const PreloadedVideo = () => {
  let { Movies } = useContext(MovieContext);
  let [play, setPlay] = useState(true);
  let videoRef = useRef();
  let videoControls = () => {
    setPlay(!play);
    if (play) {
      videoRef.current.pause();
      videoRef.current.muted = true;
    } else {
      videoRef.current.play();
      videoRef.current.muted = false;
    }
  };
  return (
    <section id={Styles.videoBlock}>
      {Movies.length > 0 && (
        <Fragment>
          <div className={Styles.videoDesc}>
            <h1
              style={{
                color: "#ffc107",
                fontSize: "3rem",
                textShadow: "2px 2px #ffff",
              }}
            >
              {/* Unlimited movies, TV shows and more. */}
              {Movies[Movies.length - 1].movieVal.title}
            </h1>
            {/* <h3>Watch anywhere. Cancel anytime.</h3> */}
            <p>
              {Movies[Movies.length - 1].movieVal.description.slice(0, 100)}...
            </p>
            <main onClick={videoControls} style={{ width: "450px" }}>
              {play ? (
                <aside className={Styles.videoAside}>
                  <FaPause className={Styles.videoPause} />
                  <span style={{ padding: "16px" }}>Pause</span>{" "}
                </aside>
              ) : (
                <aside className={Styles.videoAside}>
                  <FaPlay className={Styles.videoPlay} />

                  <span style={{ padding: "16px" }}>Play</span>
                </aside>
              )}
              <Link to="/user/movie">watch now </Link>
            </main>
          </div>
          <video
            src={Movies[Movies.length - 1].movieVal.downloadURLVideo}
            autoPlay
            muted
            ref={videoRef}
            className={Styles.videoBlockPlayer}
          ></video>
        </Fragment>
      )}
    </section>
  );
};

export default PreloadedVideo;
