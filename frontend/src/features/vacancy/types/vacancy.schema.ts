import { z } from "zod";

export const vacancySchema = z.object({
  title: z
    .string({ message: "judul mengandung karakter yang tidak valid" })
    .min(2, { message: "judul harus memiliki minimal 2 karakter" })
    .max(255, { message: "judul harus memiliki maksimal 255 karakter" }),
  description: z.string({
    message: "deskripsi mengandung karakter yang tidak valid",
  }),
  link_pendaftaran: z
    .string({
      message: "link pendaftaran mengandung karakter yang tidak valid",
    })
    .optional(),
  file: z
    .string({ message: "file mengandung karakter yang tidak valid" })
    .optional(),
});

export type VacancySchema = z.infer<typeof vacancySchema>;
