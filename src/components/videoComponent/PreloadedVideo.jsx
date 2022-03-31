import React, { useRef, useState } from "react";
import video from "./arabic_kuthu.mp4";
import Styles from "./video.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
const PreloadedVideo = () => {
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
      <div className={Styles.videoDesc}>
        <h1
          style={{
            color: "#ffc107",
            fontSize: "3rem",
            textShadow: "2px 2px #ffff",
          }}
        >
          Unlimited movies, TV shows and more.
        </h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          ducimus unde sed aperiam? Ipsam autem ab odio numquam aliquam
          architecto.
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
        </main>
      </div>
      <video
        src={video}
        autoPlay
        muted
        ref={videoRef}
        className={Styles.videoBlockPlayer}
      ></video>
    </section>
  );
};

export default PreloadedVideo;
