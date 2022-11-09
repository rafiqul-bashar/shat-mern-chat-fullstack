import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosLocal, loginRoute } from "../utils/routes";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleGuestLogin = () => {
    setEmail("jhonbhai@email.com");
    setPassword("guestguest");
  };

  const validateForm = () => {
    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { data } = await axiosLocal.post(loginRoute, {
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          import.meta.env.VITE_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );

        navigate("/");
      }
    }
  };
  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
          <div className="mx-auto mb-5">
            <div className="flex items-center justify-center gap-4 mb-3">
              <img className="h-20" src="/logo.png" alt="logo" />
              <h1 className="uppercase text-gray-800 italic text-4xl font-bold">
                Shat
              </h1>
            </div>
            <h1 className="uppercase mx-auto text-gray-700 font-semibold mt-1">
              Login Now and join Shat!
            </h1>
          </div>

          <input
            className={styles.input}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.button + "bg-gray-600 text-primary "}
            onClick={handleGuestLogin}
          >
            Guest Credentials
          </button>
          <button className={styles.button} type="submit">
            Login
          </button>
          <span className={styles.span}>
            Dont't have an account?{" "}
            <Link to="/register" className="text-primary">
              Register.
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

let styles = {};
styles.formContainer = `h-[100vh] w-screen md:w-1/2 mx-auto flex flex-col gap-4 justify-center  `;
styles.form = `flex flex-col gap-3 bg-gray-100 py-8 sm:py-12 px-10`;
styles.input = `bg-transparent p-3 w-full text-md focus:outline-none border-2 ; `;
styles.button = `bg-primary text-white font-bold cursor pointer py-3 px-7 rounded-full uppercase hover:bg-[#4e0eff] transition-all duration-200 ease-out `;
styles.span = `uppercase font-bold text-gray-600 w-fit mx-auto cursor-pointer mt-2`;
