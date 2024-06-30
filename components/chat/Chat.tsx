// @ts-nocheck
"use client";
import "./Chat.css";
import { useChat } from "../../hooks/useChat";

export default function Chat(room: any) {
  const { nameID, messages, currMessage, setCurrMessage, sendMessage, router } =
    useChat(room.room);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="title">Let &apos;s Chat</div>
        <button onClick={() => router.push("/")} className="leave">
          Leave Chat
        </button>
      </div>

      <div className="chat-body">
        {messages?.map((message: any, index: any) => (
          <div key={index}>
            <span className="name">{message.name}:</span>
            {message.messages}
          </div>
        ))}
      </div>

      <div className="chat-message">
        <form onSubmit={sendMessage}>
          <input
            value={currMessage}
            onChange={(e) => setCurrMessage(e.target.value)}
            type="text"
            name="message"
            placeholder="Type a message..."
          />
          <button className="send-message">
            send
            <svg
              className="arrow"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0737 3.06325C12.8704 2.65671 12.4549 2.3999 12.0004 2.3999C11.5459 2.3999 11.1304 2.65671 10.9271 3.06325L2.52709 19.8632C2.31427 20.2889 2.37308 20.8001 2.67699 21.1663C2.98091 21.5325 3.4725 21.6845 3.93007 21.5537L9.93006 19.8395C10.4452 19.6923 10.8004 19.2214 10.8004 18.6856V13.1999C10.8004 12.5372 11.3376 11.9999 12.0004 11.9999C12.6631 11.9999 13.2004 12.5372 13.2004 13.1999V18.6856C13.2004 19.2214 13.5556 19.6923 14.0707 19.8394L20.0707 21.5537C20.5283 21.6845 21.0199 21.5325 21.3238 21.1663C21.6277 20.8001 21.6865 20.2889 21.4737 19.8632L13.0737 3.06325Z"
                fill="#373B4D"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
