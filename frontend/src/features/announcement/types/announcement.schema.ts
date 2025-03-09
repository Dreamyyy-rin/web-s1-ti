import { z } from "zod";

export const announcementSchema = z.object({
  title: z
    .string({ message: "judul mengandung karakter yang tidak valid" })
    .min(2, { message: "judul harus memiliki minimal 2 karakter" })
    .max(255, { message: "judul harus memiliki maksimal 255 karakter" }),
  content: z.string({
    message: "deskripsi mengandung karakter yang tidak valid",
  }),
  file: z
    .string({ message: "file mengandung karakter yang tidak valid" })
    .optional(),
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;
