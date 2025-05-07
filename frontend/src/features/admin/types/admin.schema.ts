import { z } from "zod";

export const adminSchema = z
  .object({
    name: z
      .string({ message: "nama mengandung karakter yang tidak valid" })
      .min(2, { message: "nama harus memiliki minimal 1 karakter" })
      .max(255, { message: "nama harus memiliki maksimal 255 karakter" }),
    email: z
      .string({ message: "email mengandung karakter yang tidak valid" })
      .email({ message: "email tidak valid" }),
    password: z
      .string({ message: "password mengandung karakter yang tidak valid" })
      .min(6, { message: "password harus memiliki minimal 6 karakter" })
      .regex(/[A-Z]/, { message: "minimal mengandung satu huruf kapital" })
      .regex(/[a-z]/, { message: "minimal mengandung satu huruf kecil" }),
    password_confirmation: z
      .string({ message: "password mengandung karakter yang tidak valid" })
      .min(6, { message: "password harus memiliki minimal 6 karakter" })
      .regex(/[A-Z]/, { message: "minimal mengandung satu huruf kapital" })
      .regex(/[a-z]/, { message: "minimal mengandung satu huruf kecil" }),
  })
  .required()
  .refine((data) => data.password === data.password_confirmation, {
    message: "password tidak sama dengan konfirmasi password",
    path: ["confirmation_password"],
  });

export type AdminSchema = z.infer<typeof adminSchema>;
