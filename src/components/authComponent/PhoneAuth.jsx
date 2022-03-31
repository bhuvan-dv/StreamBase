// import React, { useState } from "react";
// import Styles from "./auth.module.css";
// import { auth } from "../../api/firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// const PasswordReset = () => {
//   let [phone, setPhone] = useState("");
//   let [loading, setLoading] = useState(false);
//   let navigate = useNavigate();
//   let handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       let recaptchaContainer = new RecaptchaVerifier("captcha-container", {
//         size: "invisble",
//         callback: response => {},
//         auth,
//       });
//       //send otp
//       let sendOTP = await signInWithPhoneNumber(
//         auth,
//         phone,
//         recaptchaContainer
//       );
//       //confirmation message
//       let confirmationMessage = window.prompt("please enter OTP");
//       await sendOTP.confirm(confirmationMessage);
//       console.log(phone);
//       navigate("/");
//       toast.success("logged in using phone");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };
//   return (
//     <section id={Styles.authSection}>
//       <article className={Styles.authArticle}>
//         <h2 style={{ padding: "20px 0" }}>Sign in with phone number</h2>
//         <div className={Styles.formBlock}>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="phone" className={Styles.formLabel}>
//                 Phone
//               </label>
//               <input
//                 type="number"
//                 value={phone}
//                 onChange={e => setPhone(e.target.value)}
//                 className={Styles.formControl}
//               />
//             </div>
//             <div className="form-group">
//               <p style={Styles.gotoAuth}>
//                 {" "}
//                 go back to stream base
//                 <Link to="/login" className={Styles.gotoAuthLink}>
//                   login
//                 </Link>
//               </p>
//             </div>
//             <div className="captcha-container"></div>
//             <div className="form-group">
//               <button className={Styles.btn}>
//                 {loading ? "loading..." : "send otp"}
//               </button>
//               <p
//                 style={{
//                   clear: "both",
//                   padding: "3px 0",
//                   fontSize: "13px",
//                   textDecoration: "none",
//                   textTransform: "capitalize",
//                 }}
//               >
//                 <Link to="/password-reset" className={Styles.gotoAuthLink}>
//                   Sign in using phone
//                 </Link>
//               </p>
//             </div>
//             <div className="form-group">
//               <button className={Styles.btn}>Send OTP</button>
//             </div>
//           </form>
//         </div>
//       </article>
//     </section>
//   );
// };

// export default PasswordReset;


import React, { useState } from "react";
import Styles from "./auth.module.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../api/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PhoneAuth = () => {
  let navigate = useNavigate();
  let [phone, setPhone] = useState("");

  let [loading, setLoading] = useState(false);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      let recaptchaVerifier = new RecaptchaVerifier(
        "captcha-container",
        {
          size: "invisible",
          callback: response => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
      // send otp
      let sendOTP = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      let confirmationMessage = window.prompt("please enter OTP");
      await sendOTP.confirm(confirmationMessage);
      toast.success("successfully logged in");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Sign in with Phone number</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone" className={Styles.formLabel}>
                phone number
              </label>
              <input
                type="text"
                className={Styles.formControl}
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <p className={Styles.gotoAuth}>
                go back to Stream base{" "}
                <Link to="/login" className={Styles.gotoAuthLink}>
                  login
                </Link>
              </p>
            </div>
            <div id="captcha-container"></div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "send"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default PhoneAuth;