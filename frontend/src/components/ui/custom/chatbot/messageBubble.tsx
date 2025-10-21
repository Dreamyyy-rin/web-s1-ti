import React from "react";
import { Message } from "./chat";
import { marked } from "marked";

interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex mb-4 ${isUser ? "justify-end items-end" : "justify-start items-end"}`}>
      {!isUser && (
        <div className="flex flex-col items-center gap-1 mr-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-md ring-2 ring-indigo-100">
            <img
              src="/src/assets/chatbot-icon.png"
              alt="Chatbot Icon"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-gray-600 font-medium font-poppins">
            TIMate
          </span>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 ease-in-out font-poppins leading-relaxed ${
          isUser
            ? "bg-[#020817] text-white rounded-br-none max-w-xs shadow-blue-200/50"
            : "bg-[#F3F4F6] text-gray-800 rounded-tl-none max-w-md shadow-gray-200/80 border border-gray-100"
        }`}>
        {message.text && (
          <div
            dangerouslySetInnerHTML={{
              __html: marked(message.text),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
