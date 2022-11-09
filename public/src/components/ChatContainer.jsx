import React, { useEffect, useRef, useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const messages = [
  { fromSelf: true, message: "Kio Mia Ki koitasen" },
  { fromSelf: false, message: "Thik e to koitasen" },
  { fromSelf: true, message: "Kio Mia Ki koitasen" },
  { fromSelf: false, message: "Thik e to koitasen" },
  { fromSelf: true, message: "Kio Mia Ki koitasen" },
  { fromSelf: false, message: "Thik e to koitasen" },
  { fromSelf: true, message: "Kio Mia Ki koitasen" },
  { fromSelf: false, message: "Thik e to koitasen" },
  { fromSelf: true, message: "Kio Mia Ki koitasen" },
  { fromSelf: false, message: "Thik e to koitasen" },
  { fromSelf: true, message: "Kio Mia Ki koitasen" },
  { fromSelf: false, message: "Thik e to koitasen" },
  { fromSelf: true, message: "Kio Mia Ki koitasen" },
  { fromSelf: false, message: "Thik e to koitasen" },
];
export default function ChatContainer({ currentChat }) {
  const bottomOfChat = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)
    )._id;
    localStorage.clear();
    navigate("/login");
    // const data = await axios.get(`${logoutRoute}/${id}`);
    // if (data.status === 200) {
    //   localStorage.clear();
    //   navigate("/login");
    // }
  };

  useEffect(() => {
    setTimeout(
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
      100
    );
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className="h-[10%] md:h-[15%] flex items-center justify-between px-4 md:px-12">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <img
              src="/logo.png"
              //   src={`data:image/svg+xml;base64,${currentChat.userImage}`}
              className="h-6 md:h-8"
              alt={currentChat.name}
            />
          </div>
          <div className="username">
            <h3>{currentChat.name}</h3>
          </div>
        </div>
        {/* <Logout /> */}
        <div>
          <button
            onClick={handleClick}
            className="flex items-center justify-center p-2 border-none cursor-pointer text-primary  text-xl"
          >
            <BiPowerOff />
          </button>
        </div>
      </div>
      <div className="px-3 overflow-y-scroll h-[80%] md:h-[70%] flex flex-col gap-3 ">
        {messages.map((message, i) => {
          return (
            <div
              key={i}
              className={`w-fit px-3 py-1 md:py-2 rounded-md text-white  ${
                message.fromSelf ? "bg-black ml-auto" : "bg-primary "
              }`}
            >
              <div className="content ">
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomOfChat} />
      </div>
      {/* <ChatInput handleSendMsg={handleSendMsg} /> */}
      <div className="h-[10%] md:h-[15%]  w-full bg-red-400 bottom-0">
        Chat Footer
      </div>
    </div>
  );
}
const styles = {};
styles.container = `overflow-hidden col-span-2 `;
