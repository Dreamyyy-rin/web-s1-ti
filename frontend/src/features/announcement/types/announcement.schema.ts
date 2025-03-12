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
    .instanceof(File, { message: "File harus diupload" })
    .refine((file) => file.size <= 1024 * 1024 * 5, {
      message: "Ukuran file maksimal 5MB",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
          file.type,
        ),
      { message: "File harus berformat gambar" },
    )
    .optional(),
});

export type AnnouncementSchema = z.infer<typeof announcementSchema>;
