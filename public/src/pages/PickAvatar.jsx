import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/routes";

export default function PickAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY))
      navigate("/login");
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          import.meta.env.VITE_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };
  useEffect(() => {
    const func = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    func();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className={styles.container}>
          {/* <img src={loader} alt="loader" className="loader" /> */}
          <h1>loading....</h1>
        </div>
      ) : (
        <div className={styles.container}>
          <img src="/logo.png" alt="userAvatar" className={styles.userAvatar} />
          <button className={styles.chooseButton}>Choose Picture</button>
          <div className="">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="flex items-center justify-center gap-3">
            <input
              type="text"
              placeholder="enter username"
              className="border-b-2 border-primary p-1 outline-none focus:outline-none"
            />
            <button className="bg-gray-600 text-lime-400 py-1 px-6">
              Next
            </button>
          </div>
          {/* <div className="flex gap-8">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`${styles.avatar} ${
                    selectedAvatar === index ? "border-[#4e0eff]" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div> */}
          {/* <button onClick={setProfilePicture} className={styles.button}>
            Set as Profile Picture
          </button> */}
          <ToastContainer />
        </div>
      )}
    </>
  );
}
let styles = {};

styles.container = `flex flex-col justify-center items-center  gap-12 h-screen w-screen`;
styles.avatar = `p-1 b-2 border-tranparent rounded-full flex items-center justify-center transition-all duration-500 ease-in-out `;
styles.button = `bg-primary text-white font-bold cursor pointer py-3 px-7 rounded-full uppercase hover:bg-[#4e0eff] transition-all duration-200 ease-out `;
styles.userAvatar = `h-30 p-4 border-2 object-contain border-primary rounded-full`;
styles.chooseButton = `border-2 border-primary p-2`;
