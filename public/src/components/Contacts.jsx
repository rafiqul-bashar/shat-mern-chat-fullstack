import React, { useEffect, useState } from "react";

const chats = [
  {
    name: "Elon Mask",
    uid: "55456465",
  },
  {
    name: "Bill Gates",
    uid: "4sad8888998",
  },
  {
    name: "Mark Zuckerberg",
    uid: "566666666",
  },
  {
    name: "Mukesh Ambani",
    uid: "555548",
  },
  {
    name: "Jeff Bhai",
    uid: "33adf4548",
  },
  {
    name: "Bassbaba",
    uid: "4s1111548",
  },
  {
    name: "Mukesh Ambani",
    uid: "4sadqewef4548",
  },
  {
    name: "Jeff Bhai",
    uid: "4sadf454sdf8",
  },
  {
    name: "Mukesh Ambani",
    uid: "4sadf4548",
  },
  {
    name: "Jeff Bhai",
    uid: "4sadf45465",
  },
];

export default function Contacts({ changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const func = async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
      );
      console.log(data);
      setCurrentUserName(data.fullName);
      setCurrentUserImage(data.userImage.url);
    };
    func();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className={styles.container}>
      <div className="flex items-center h-[10%] ">
        <div className="flex items-center gap-3 mx-auto">
          <img src="/logo.png" className="h-6 md:h-8" alt="logo" />
          <h1 className="uppercase text-gray-800 italic text-lg md:text-3xl font-bold ">
            Shat
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 h-[75%] overflow-auto">
        {chats.map((el, i) => (
          <div
            onClick={() => changeCurrentChat(i, el)}
            className={styles.contact}
            key={el.uid}
          >
            <img
              src={currentUserImage}
              className="h-12 w-12 rounded-full mx-auto md:mx-0 md:h-20 md:w-20"
              alt={el.name}
            />
            <h1 className="hidden md:inline-block">{el.name}</h1>
          </div>
        ))}
      </div>
      <div className=" h-[15%] flex items-center justify-center ">
        <div className="flex flex-col md:flex-row items-center gap-3 mx-auto">
          <img
            src={currentUserImage}
            alt="avatar"
            className="h-10 w-10 rounded-full mx-auto"
          />

          <h2>{currentUserName}</h2>
        </div>
      </div>
    </div>
  );
}
const styles = {};
styles.container = `h-screen overflow-hidden `;
styles.contact = `flex items-center gap-2 bg-gray-100 p-2 cursor-pointer`;
