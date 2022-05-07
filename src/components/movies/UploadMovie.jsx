// import React, { useState } from "react";
// import Styles from "./movie.module.css";
// const UploadMovie = () => {
//   let [state, setState] = useState({
//     title: "",
//     genre: "",
//     release: "",
//     description: "",
//     ratings: "",
//     language: "",
//     cast: "",
//   });
//   let [file, setFile] = useState({ photo: "", video: "" });
//   let [loading, setLoading] = useState(false);
//   let { title, genre, release, description, ratings, language, cast } = state;
//   let handleChange = e => {
//     let { name, value } = e.target;
//     setState({ ...state, [name]: value });
//   };
//   let handleFile = e => {
//     let { name, value } = e.target;
//     setFile({ ...file, [name]: value });
//   };
//   let handleSubmit = e => {
//     e.preventDefault();
//     setLoading(true);

//     setLoading(false);
//   };
//   return (
//     <main id={Styles.movieBlock}>
//       <aside className={Styles.movieArticle}>
//         <h2
//           style={{ color: "#ffc107", padding: "20px 0", textAlign: "center" }}
//         >
//           Movie Details
//         </h2>
//         <div className={Styles.formBlock}>
//           <form className={Styles.formMovie}>
//             <div className="formGroup">
//               <label htmlFor="title" className={Styles.formLabel}>
//                 Movie Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 onChange={handleChange}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className="formGroup">
//               <label htmlFor="genre" className={Styles.formLabel}>
//                 Movie Genre
//               </label>
//               <input
//                 type="text"
//                 id="genre"
//                 name="genre"
//                 onChange={handleChange}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className="formGroup">
//               <label htmlFor="release" className={Styles.formLabel}>
//                 Year of Release
//               </label>
//               <input
//                 type="text"
//                 id="release"
//                 name="release"
//                 onChange={handleChange}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className="formGroup">
//               <label htmlFor="description" className={Styles.formLabel}>
//                 Description
//               </label>
//               <input
//                 type="text"
//                 id="description"
//                 name="description"
//                 onChange={handleChange}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className="formGroup">
//               <label htmlFor="ratings" className={Styles.formLabel}>
//                 Ratings
//               </label>
//               <input
//                 type="range"
//                 min={1}
//                 max={10}
//                 id="ratings"
//                 name="ratings"
//                 placeholder="enter 0 to 10"
//                 onChange={handleChange}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className="formGroup">
//               <label htmlFor="photo" className={Styles.formLabel}>
//                 Movie Photo
//               </label>
//               <input
//                 type="file"
//                 id="photo"
//                 name="photo"
//                 onChange={handleFile}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className="formGroup">
//               <label htmlFor="video" className={Styles.formLabel}>
//                 Movie Video
//               </label>
//               <input
//                 type="file"
//                 id="video"
//                 name="video"
//                 onChange={handleFile}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className="formGroup">
//               <label htmlFor="language" className={Styles.formLabel}>
//                 Movie Language
//               </label>
//               <input
//                 type="text"
//                 id="language"
//                 name="language"
//                 onChange={handleChange}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className={Styles.formGroup}>
//               <label htmlFor="cast" className={Styles.formLabel}>
//                 Movie Cast
//               </label>
//               <input
//                 type="text"
//                 id="cast"
//                 name="cast"
//                 value={cast}
//                 onChange={handleChange}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className={Styles.formGroup}>
//               <button className={Styles.submitMovie}>Submit</button>
//             </div>
//           </form>
//         </div>
//       </aside>
//     </main>
//   );
// };

// export default UploadMovie;

import React, { useState } from "react";
import { toast } from "react-toastify";
import Styles from "./movie.module.css";
import { auth, database, storage } from "../../api/firebase";
import {
  ref as MovieRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { set, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { v4 as movieID } from "uuid";
const UploadMovie = () => {
  let [title, setTitle] = useState("");
  let [genre, setGenre] = useState("");
  let [yol, setYol] = useState("");
  let [description, setDescription] = useState("");
  let [ratings, setRatings] = useState("");
  let [photo, setPhoto] = useState("");
  let [video, setVideo] = useState("");
  let [language, setLanguage] = useState("");
  let [cast, setCast] = useState("");
  let [progress, setProgress] = useState(0);
  let [barstatus, setBarstatus] = useState(false);
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [id, setId] = useState(movieID());
  let handleSubmit = e => {
    e.preventDefault();
    try {
      setLoading(true);
      let storageRefPhoto = MovieRef(storage, `/movie/poster/${photo.name}`);
      let storageRefVideo = MovieRef(storage, `/movie/video/${video.name}`);
      let uploadPoster = uploadBytesResumable(storageRefPhoto, photo);
      let uploadMovie = uploadBytesResumable(storageRefVideo, video);
      uploadMovie.on(
        "state_changed",
        snapShot => {
          //progress bar
          let progressBar =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setProgress(progressBar);
          setBarstatus(true);
          setLoading(true);
        },
        error => {
          //error
        },
        async () => {
          //completion task
          let downLoadURLPoster = await getDownloadURL(storageRefPhoto);
          let downloadURLVideo = await getDownloadURL(storageRefVideo);
          setBarstatus(false);
          setLoading(false);
          await set(ref(database, "movie-data/" + Date.now()), {
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
          });
          navigate("/");
          toast.success("movie added");
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  let ProgressUI = () => {
    return (
      // <progress value={progress} min={0} max={100}>
      //   {progress}
      // </progress>
      <div class="progress">
        <div class="bar" style={{ width: `${progress}%` }}>
          <p class="percent">{Math.round(progress)}</p>
        </div>
      </div>
    );
  };
  return (
    <main id={Styles.movieBlock}>
      <header>
        <span>{barstatus === true ? <ProgressUI /> : ""}</span>
        <span>{barstatus == true ? Math.round(progress) : ""}</span>
      </header>
      <aside className={Styles.movieArticle}>
        <h2
          style={{ color: "#ffc107", padding: "20px 0", textAlign: "center" }}
        >
          Movie Details
        </h2>

        <form className={Styles.movieFormBlock} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="title">
              Movie Title
            </label>
            <input
              type="text"
              className={Styles.formControl}
              id="title"
              name="title"
              placeholder="Enter Movie Title"
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="genre">
              Movie Genre
            </label>
            <select id="genre" onChange={e => setGenre(e.target.value)}>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
              <option value="mystery">Mystery</option>
              <option value="scifi">Science fiction</option>
              <option value="thriller">Thriller</option>
            </select>
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="yor">
              Year of Release
            </label>
            <input
              type="date"
              id="yor"
              className={Styles.formControl}
              name="yor"
              placeholder="Enter Year of Release"
              onChange={e => setYol(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="ratings">
              Ratings &nbsp;&nbsp;&nbsp;&nbsp;<span>{ratings}</span>
            </label>

            <input
              type="range"
              min={0}
              max={5}
              id="ratings"
              className={Styles.formControl}
              name="ratings"
              placeholder="Enter Ratings"
              onChange={e => setRatings(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="photo">
              Movie Photo
            </label>
            <input
              type="file"
              id="photo"
              className={Styles.formControl}
              name="photo"
              onChange={e => setPhoto(e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label className={Styles.formLabel} htmlFor="video">
              Movie Video
            </label>
            <input
              type="file"
              id="video"
              className={Styles.formControl}
              name="video"
              onChange={e => setVideo(e.target.files[0])}
            />
          </div>

          <div className={Styles.language}>
            <label className={Styles.formLabel} htmlFor="lang">
              Movie Language
            </label>
            <input
              type="text"
              id="lang"
              className={Styles.formControl}
              name="lang"
              onChange={e => setLanguage(e.target.value)}
            />
          </div>

          <div className={Styles.cast}>
            <label className={Styles.formLabel} htmlFor="cast">
              Movie Cast
            </label>
            <input
              type="text"
              className={Styles.formControl}
              id="cast"
              name="cast"
              onChange={e => setCast(e.target.value)}
            />
          </div>

          <div className={Styles.movie_description}>
            <label className={Styles.formLabel} htmlFor="descp">
              Description
            </label>
            <textarea
              type="text"
              id="descp"
              className={Styles.formControl}
              name="descp"
              placeholder="Enter Description"
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button className={Styles.btn}>
              {loading ? "loading" : "submit"}
            </button>
          </div>
        </form>
      </aside>
    </main>
  );
};

export default UploadMovie;
