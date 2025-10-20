import React from "react";
import { Message } from "./chat";

interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-3 py-2 rounded-2xl shadow text-sm transition-all duration-200 ease-in-out  ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-black rounded-bl-none"
        }`}>
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
