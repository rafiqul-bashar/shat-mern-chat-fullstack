import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";

export default function MessageInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
    handleEmojiPickerhideShow();
  };

  const sendChat = () => {
    if (msg.length > 0) {
      //   handleSendMsg(msg);
      console.log(msg);
      setMsg("");
    }
  };
  return (
    <div className={styles.container}>
      <div className="flex items-center gap-3 w-full">
        <button className="flex-none ">
          {showEmojiPicker && (
            <div className="absolute bottom-0 ">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <BsEmojiSmileFill
            onClick={handleEmojiPickerhideShow}
            className="text-primary text-xl md:text-3xl"
          />
        </button>
        <input
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          className={styles.input}
          placeholder="Enter message ..."
          value={msg}
        />
        <button onClick={sendChat} className="flex-none">
          <IoMdSend className="text-primary text-xl md:text-3xl" />
        </button>
      </div>
    </div>
  );
}
const styles = {};
styles.container = `w-full h-full flex px-4 md:px-8 bg-gray-300`;
styles.input = `grow py-2  px-3 w-full focus:outline-none bg-gray-100 focus:bg-white`;
