import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({ message: "Email mengandung karakter tidak valid" })
      .email({ message: "Email tidak valid" }),
    password: z
      .string({ message: "Password mengandung karakter tidak valid" })
      .min(6, { message: "Password harus memiliki minimal 6 karakter" }),
  })
  .required();

export type LoginSchema = z.infer<typeof loginSchema>;
