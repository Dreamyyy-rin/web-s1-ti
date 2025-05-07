import { User } from "@/features/user/types/user.type";

export interface Announcement {
  id: number;
  judul: string;
  isi: string;
  file: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: Omit<User, "email" | "role" | "created_at" | "updated_at">;
}
