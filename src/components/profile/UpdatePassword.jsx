import React, { useState, useContext } from "react";
import Styles from "../../components/authComponent/auth.module.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { auth } from "../../api/firebase";
import { updatePassword } from "firebase/auth";
import { AuthContext } from "../../api/AuthContext";
const UpdatePassword = () => {
  let USER = useContext(AuthContext);
  let [password, setPassword] = useState("");
  let [showPassword, setShowPassword] = useState(false);
  let [toggle, setToggle] = useState(false);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let iconChange = () => {
    setToggle(!toggle);
    setShowPassword(!showPassword);
  };
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await updatePassword(USER, password);
      toast.success("successfulyy password updated");
      navigate("/myprofile");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
    setPassword("");
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Update Password</h2>
        <div className={Styles.formBlock}>
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group">
              <label htmlFor="email" className={Styles.formLabel}>
                Update Password
              </label>
              <input
                type="password"
                id="email"
                name="email"
                required
                value={password}
                placeholder="enter email"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                className={Styles.formControl}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="password" className={Styles.formLabel}>
                new Password
              </label>
              <input
                type={showPassword === true ? "text" : "password"}
                id="Password"
                name="password"
                required
                value={password}
                placeholder="enter password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                className={Styles.formControl}
              />
              <span className={Styles.eyeIcon} onClick={iconChange}>
                {toggle ? (
                  <FaEye className={Styles.eyeIconSVG} />
                ) : (
                  <FaEyeSlash className={Styles.eyeIconSVG} />
                )}
              </span>
            </div>
            <div className="form-group">
              <p className={Styles.gotoAuth}>
                new to StreamBase?
                <Link to="/signup" className={Styles.gotoAuthLink}>
                  Signup
                </Link>
                <br />
              </p>
              <p
                style={{
                  clear: "both",
                  padding: "3px 0",
                  fontSize: "13px",
                  textDecoration: "none",
                  textTransform: "capitalize",
                }}
              >
                <Link to="/myprofile" className={Styles.gotoAuthLink}>
                  go back to my profile
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "update Password"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default UpdatePassword;
