import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosLocal, registerRoute } from "../utils/routes";
export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, fullName, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (fullName.length < 3) {
      toast.error("Does not looks like a valid name.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { email, fullName, password } = values;

      const { data } = await axiosLocal.post(registerRoute, {
        fullName,
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
              Register Now and join Shat!
            </h1>
          </div>
          <input
            className={styles.input}
            type="text"
            placeholder="Full Name"
            name="fullName"
            onChange={(e) => handleChange(e)}
          />
          <input
            className={styles.input}
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button className={styles.button} type="submit">
            Create User
          </button>
          <span className={styles.span}>
            Already have an account ?{" "}
            <Link to="/login" className="text-primary">
              Login.
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
styles.form = `flex flex-col gap-2 bg-gray-100 py-8 sm:py-12 px-10`;
styles.input = `bg-transparent p-4 w-full text-md focus:outline-none border-2 `;
styles.button = `bg-primary text-white font-bold cursor pointer py-3 px-7 rounded-full uppercase hover:bg-[#4e0eff] transition-all duration-200 ease-out`;
styles.span = `uppercase font-bold text-gray-600 w-fit mx-auto cursor-pointer mt-2`;
