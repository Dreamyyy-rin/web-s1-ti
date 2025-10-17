import { ENV } from "@/env";
import axios from "axios";

export async function startChat(): Promise<string> {
  const res = await axios.post(`${ENV.APP.CHATBOT_URL}/start_chat`);
  localStorage.setItem("chat_session_id", res.data.session_id);
  return res.data.session_id;
}

export async function sendMessage(message: string): Promise<string> {
  const sessionId =
    localStorage.getItem("chat_session_id") || (await startChat());

  const res = await axios.post(
    `${ENV.APP.CHATBOT_URL}/chat`,
    {
      session_id: sessionId,
      message: message,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return res.data.reply;
}

export async function resetChat() {
  localStorage.removeItem("chat_session_id");
}
