import { z } from "zod";

export const vacancySchema = z.object({
  title: z
    .string({ message: "judul mengandung karakter yang tidak valid" })
    .min(2, { message: "judul harus memiliki minimal 2 karakter" })
    .max(255, { message: "judul harus memiliki maksimal 255 karakter" }),
  description: z.string({
    message: "deskripsi mengandung karakter yang tidak valid",
  }),
  registration_link: z
    .string({
      message: "link pendaftaran mengandung karakter yang tidak valid",
    })
    .optional(),
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

export type VacancySchema = z.infer<typeof vacancySchema>;
