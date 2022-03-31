import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import StreamBaseRoutes from "./routes/StreamBaseRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./api/AuthContext";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <ToastContainer pauseOnHover />
          <StreamBaseRoutes />
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
