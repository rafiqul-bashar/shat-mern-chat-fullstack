import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Contacts } from "../components";
import { io } from "socket.io-client";
import { allUsersRoute, host } from "../utils/routes";
export default function Home() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    const func = async () => {
      if (!localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
          )
        );
      }
    };
    func();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const func = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          // navigate("/setAvatar");
        }
      }
    };
    func();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    const func = async () => {
      setFullName(
        await JSON.parse(
          localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
        ).username
      );
    };
    func();
  }, []);
  return (
    <div className={styles.container}>
      <div className="h-[85vh] w-[85vw] grid grid-cols-3">
        <div className="col-span-1">
          <Contacts />
        </div>
        <div className={styles.startChatContainer}>
          <img className="h-80" src="/logo.png" alt="as" />
          <h1>
            Welcome, <span className="primary">{fullName}!</span>
          </h1>
          <h3>Please select a chat to Start messaging.</h3>
        </div>
      </div>
    </div>
  );
}
let styles = {};

styles.container = `h-screen w-screen flex flex-col justify-center gap-4 `;
styles.startChatContainer = `flex flex-col items-center justify-center col-span-2`;
