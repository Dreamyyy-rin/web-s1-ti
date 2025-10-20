import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatbotWindow from "./ChatbotWindow";
import { Button } from "@/components/ui/button";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl bg-blue-500 hover:bg-blue-600 transition-all hover:scale-110"
          size="icon"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      <ChatbotWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Chatbot;
