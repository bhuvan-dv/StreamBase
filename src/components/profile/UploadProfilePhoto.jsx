// import React, { useState } from "react";
// import Styles from "../authComponent/auth.module.css";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// const UploadProfilePhoto = () => {
//   let [loading, setLoading] = useState(false);

//   let [photo, setPhoto] = useState("");
//   let handleSubmit = e => {
//     e.prevenDefault();
//     try {
//       setLoading(true);
//       console.log(photo);
//     } catch (error) {
//       toast.error(error.message);
//     }
//     setLoading(false);
//   };
//   return (
//     <section id={Styles.authSection}>
//       <article className={Styles.authArticle}>
//         <h2 style={{ padding: "20px 0" }}>Upload Photo</h2>
//         <div className={Styles.formBlock}>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="username" className={Styles.formLabel}>
//                 Upload photo
//               </label>
//               <input
//                 type="file"
//                 className={Styles.formControl}
//                 onChange={e => setPhoto(e.target.files[0])}
//               />
//             </div>
//             <div className="form-group">
//               <p className={Styles.gotoAuth}>
//                 go back to
//                 <Link to="/myprofile" className={Styles.gotoAuthLink}>
//                   my profile
//                 </Link>
//               </p>
//             </div>
//             <div className="form-group">
//               <button className={Styles.btn}>
//                 {loading ? "loading..." : "Upload Photo"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </article>
//     </section>
//   );
// };

// export default UploadProfilePhoto;

import React, { useState, useContext } from "react";
import Styles from "../authComponent/auth.module.css";
import { Link } from "react-router-dom";
import { storage, auth } from "../../api/firebase";
import {
  ref as photoRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../api/AuthContext";
import { toast } from "react-toastify";

const UploadProfilePhoto = () => {
  let USER = useContext(AuthContext);
  let [loading, setLoading] = useState(false);
  let [photo, setPhoto] = useState("");
  let [progress, setProgress] = useState(0);
  let [barstatus, setBarstatus] = useState(false);
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      let storageRef = photoRef(storage, `/profile-photo/${photo.name}`);
      let uploadTask = uploadBytesResumable(storageRef, photo);
      // console.log(uploadTask);
      // console.log(photo);
      //firebase event to upload photoURL
      uploadTask.on(
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
          let downLoadURL = await getDownloadURL(storageRef);
          console.log(downLoadURL);
          updateProfile(USER, {
            photoURL: downLoadURL,
          });
          toast.success("photo updated");
          window.location.assign("/");
        }
      );
    } catch (error) {
      console.log(error);
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
    <section id={Styles.authSection}>
      <header>
        <span>{barstatus === true ? <ProgressUI /> : ""}</span>
        <span>{barstatus == true ? Math.round(progress) : ""}</span>
      </header>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "10px 0" }}>Upload Photo</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className={Styles.formLabel}>
                Upload Photo
              </label>
              <input
                type="file"
                className={Styles.formControl}
                onChange={e => setPhoto(e.target.files[0])}
              />
            </div>

            <div className="form-control">
              <p className={Styles.gotoAuth}>
                Photo Uploaded already?{""}
                <Link to="/user" className={Styles.gotoAuthLink}>
                  Profile
                </Link>
              </p>
            </div>

            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default UploadProfilePhoto;
