import React, { useState } from "react";
import Styles from "./auth.module.css";
import { auth } from "../../api/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  let [state, setState] = useState({
    email: "",
    password: "",
  });
  let [loading, setLoading] = useState(false);
  let [toggle, setToggle] = useState(false);
  let [showPassword, setShowPassword] = useState(false);
  let { email, password } = state;
  let navigate = useNavigate();
  let iconChange = () => {
    setToggle(!toggle);
    setShowPassword(!showPassword);
  };
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      let userData = await signInWithEmailAndPassword(auth, email, password);
      if (userData.user.emailVerified === true) {
        console.log(userData);
        toast.success("successfully logged in");
        navigate("/");
      } else {
        navigate("/login");
        toast.error("please verify your email address first");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message.slice(9));
    }
    setState({ email: "", password: "" });
    setLoading(false);
  };
  return (
    <section id={Styles.authSection}>
      <article className={Styles.authArticle}>
        <h2 style={{ padding: "20px 0" }}>Login</h2>
        <div className={Styles.formBlock}>
          <Link to="/phone-auth">Try with phone number</Link>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className={Styles.formLabel}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                placeholder="enter email"
                onChange={handleChange}
                className={Styles.formControl}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className={Styles.formLabel}>
                Password
              </label>
              <input
                type={showPassword === true ? "text" : "password"}
                id="Password"
                name="password"
                required
                value={password}
                placeholder="enter password"
                onChange={handleChange}
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
                <Link to="/password-reset" className={Styles.gotoAuthLink}>
                  Forgot password
                </Link>
              </p>
            </div>
            <div className="form-group">
              <button className={Styles.btn}>
                {loading ? "loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </article>
    </section>
  );
};

export default Login;
