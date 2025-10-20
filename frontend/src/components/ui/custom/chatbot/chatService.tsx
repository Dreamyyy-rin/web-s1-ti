import { ENV } from "@/env";
import axios from "axios";
import { Message } from "./chat";

export const listChat: Message[] = [];

export async function startChat(): Promise<string> {
  let session = localStorage.getItem("chat_session_id");
  if (!session) {
    const res = await axios.post(`${ENV.APP.CHATBOT_URL}/start_chat`);
    const sessionId: string | undefined = res.data.session_id;
    if (!sessionId) {
      throw new Error("Failed to create chat session");
    }
    session = sessionId;
    localStorage.setItem("chat_session_id", session);
  }
  return session as string;
}

export function getChat(): Message[] {
  const saved = localStorage.getItem("chat_history");
  return saved ? JSON.parse(saved) : [];
}

export function saveChat(messages: Message[]) {
  localStorage.setItem("chat_history", JSON.stringify(messages));
}

export async function sendMessage(message: string): Promise<string> {
  const sessionId =
    localStorage.getItem("chat_session_id") || (await startChat());

  const res = await axios.post(`${ENV.APP.CHATBOT_URL}/chat`, {
    session_id: sessionId,
    message,
  });

  const reply = res.data.reply;
  const chat = getChat();
  chat.push({ text: message, role: "user" });
  chat.push({ text: reply, role: "bot" });
  saveChat(chat);

  return reply;
}

export async function resetChat() {
  localStorage.removeItem("chat_session_id");
  localStorage.removeItem("chat_history");
}
