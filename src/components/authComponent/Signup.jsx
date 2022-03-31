import React, { useState } from "react";
import Styles from "./auth.module.css";
import { toast } from "react-toastify";
import { auth } from "../../api/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"
import md5 from "md5";
const Signup = () => {
  let navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        toast.error("password does not match");
      } else {
        let userData = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        toast.success(`successfully user created`);
        sendEmailVerification(userData.user);
        updateProfile(userData.user, {
          photoURL:`https://www.gravatar.com/avatar/${md5(email)}q=identicon`,
          displayName: username,
        });
        console.log(userData);
        navigate("/login");
        toast.info(`verification email sent to ${email} address`);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message.slice(9));
    }
    setLoading(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "10px 0" }}>Signup</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className={Styles.formLabel}>
                username
              </label>
              <input
                type="text"
                className={Styles.formControl}
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className={Styles.formLabel}>
                email
              </label>
              <input
                type="email"
                className={Styles.formControl}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className={Styles.formLabel}>
                password
              </label>
              <input
                type="password"
                className={Styles.formControl}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm password" className={Styles.formLabel}>
                confirm password
              </label>
              <input
                type="password"
                className={Styles.formControl}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <p className={Styles.gotoAuth}>
                Already on StreamBase?
                <Link to="/login" className={Styles.gotoAuthLink}>
                  Login
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Signup"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Signup;
