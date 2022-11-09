import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { axiosLocal, host, setAvatarRoute } from "../utils/routes";
import axios from "axios";

export default function PickAvatar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      setUser(
        JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY))
      );
    } else {
      navigate("/login");
    }
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("No photo selected", toastOptions);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("something went wrong!!");
    };
    uploadImage();
  };
  console.log(user);
  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch(`${host}/api/auth/setavatar/${user._id}`, {
        method: "POST",
        body: JSON.stringify({ image: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.userImage.public_id) {
            user.userImage = data.image;
            localStorage.setItem(
              import.meta.env.VITE_LOCALHOST_KEY,
              JSON.stringify(user)
            );
            navigate("/");
          } else {
            toast.error("Something went wrong.Try again", toastOptions);
          }
        });
    } catch (err) {
      console.error(err);
      toast.error("Couldn't upload image", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.container}>
          {/* <img src={loader} alt="loader" className="loader" /> */}
          <h1>loading....</h1>
        </div>
      ) : (
        <div className={styles.container}>
          <h1 className="text-2xl font-medium">Set User name and Photo</h1>

          {previewSource ? (
            <img
              src={previewSource}
              alt="userAvatar"
              className={styles.userAvatar}
            />
          ) : (
            <img
              src={user?.userImage?.url}
              alt="userAvatar"
              className={styles.userAvatar}
            />
          )}

          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="border-b-2 border-gray-600 pb-3 w-[280px]"
          />

          <button onClick={handleSubmitFile} className={styles.nextButton}>
            Next
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
            className={styles.skipButton}
          >
            Skip
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
let styles = {};

styles.container = `flex flex-col justify-center items-center  gap-4 h-screen w-screen`;
styles.avatar = `p-1 b-2 border-tranparent rounded-full flex items-center justify-center transition-all duration-500 ease-in-out `;
styles.userAvatar = `h-28 w-28 p-1 border-2 border-primary rounded-full my-8`;
styles.nextButton = `text-lime-400 hover:text-gray-700 hover:bg-lime-500 w-[280px] bg-gray-600  py-1 font-bold cursor pointer hover:scale-95 duration-200 ease-out border-2 border-gray-600 `;
styles.skipButton = `w-[200px]  py-1 font-bold cursor pointer focus:scale-95  duration-200 ease-out underline`;
