import React from "react";
import { Message } from "./chat";

interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div className={`flex mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* Avatar for bot messages */}
      {!isUser && (
        <div className="flex items-end mr-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
            T
          </div>
        </div>
      )}

      <div
        className={`max-w-xs px-3 py-2 rounded-2xl shadow text-sm transition-all duration-200 ease-in-out  ${
          isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-black rounded-bl-none"
        }`}>
        {message.text}
      </div>

      {/* Reserve space for user's side if needed to keep alignment consistent */}
      {isUser && <div className="w-8 h-8" />}
    </div>
  );
};

export default MessageBubble;
