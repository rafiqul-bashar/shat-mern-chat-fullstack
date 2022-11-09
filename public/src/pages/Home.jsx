import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContainer, Contacts } from "../components";
import { io } from "socket.io-client";
import { allUsersRoute, axiosLocal, host } from "../utils/routes";
import axios from "axios";
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
        if (currentUser.userImage.public_id) {
          const data = await axiosLocal.get(
            `${allUsersRoute}/${currentUser._id}`
          );
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
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
        ).fullName
      );
    };
    func();
  }, []);
  return (
    <div className={styles.container}>
      <div className="grid grid-cols-3">
        <div className=" md:w-xl">
          <Contacts changeChat={handleChatChange} />
        </div>
        {currentChat === undefined ? (
          <div className={styles.startChatContainer}>
            <img className="h-40 md:52" src="/logo.png" alt="as" />
            <h1>
              Welcome, <span className="primary">{fullName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
          </div>
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </div>
  );
}
let styles = {};

styles.container = `h-screen w-screen flex flex-col justify-center `;
styles.startChatContainer = `flex flex-col items-center justify-center col-span-2 text-center `;
