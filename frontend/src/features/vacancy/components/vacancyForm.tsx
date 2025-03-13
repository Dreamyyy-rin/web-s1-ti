import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageInput, Input } from "@/components/ui/input";
import { MinimalTiptapEditor } from "@/components/ui/custom/minimal-tiptap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import ConfirmationAlert from "@/components/ui/custom/alert/confirmationAlert";
import { useRouter } from "@tanstack/react-router";
import { vacancySchema, VacancySchema } from "../types/vacancy.schema";
import { Vacancy } from "../types/vacancy.type";
import VacancyView from "./vacancyView";
import { fetchFileFromUrl, getUrlFromFile } from "@/lib/helpers";

const VacancyForm = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    onSave: (data: VacancySchema) => Promise<void>;
    data?: Vacancy;
  }
>(({ onSave, data }) => {
  const handleOnSubmit = (data: VacancySchema) => {
    onSave(data);
  };

  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [url, setUrl] = React.useState<string | null>(null);

  const form = useForm<VacancySchema>({
    resolver: zodResolver(vacancySchema),
    // defaultValues: data
    //   ? {
    //       title: data.judul,
    //       description: data.deskripsi,
    //       registration_link: data.link_pendaftaran,
    //       file: undefined,
    //     }
    //   : {
    //       title: "",
    //       description: "",
    //       registration_link: "",
    //       file: undefined,
    //     },
    defaultValues: async () => {
      if (!data) {
        return {
          title: "",
          description: "",
          registration_link: "",
          file: undefined,
        };
      }
      if (!data.file) {
        return {
          description: data.deskripsi,
          registration_link: data.link_pendaftaran,
          title: data.judul,
          file: undefined,
        };
      }
      const file = await fetchFileFromUrl(data.file)
      getUrlFromFile(file, setUrl)
      return {
        description: data.deskripsi,
        registration_link: data.link_pendaftaran,
        title: data.judul,
        file: file,
      };
    },
  });

  const { title, description, registration_link } = form.watch();

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
        <Tabs defaultValue="edit" className="flex flex-col ">
          <TabsList className="ms-auto">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <div className="border rounded-sm py-4 px-2">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormControl>
                      <ImageInput
                        value={field.value}
                        accept="image/jpeg,image/png,image/jpg"
                        onUpload={(file: File) => {
                          getUrlFromFile(file, setUrl)
                          form.setValue("file", file);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="px-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    <FormControl>
                      <Input
                        required
                        type="text"
                        className="outline-none mb-4 border-none shadow-none ring-0 focus-visible:ring-0 file:text-3xl text-3xl md:text-3xl placeholder:font-bold font-bold "
                        placeholder="Masukkan judul di sini..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="px-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MinimalTiptapEditor
                        className="rounded-sm shadow-none ring-0 focus-visible:ring-0 focus-within:border-input border-t border-l-0 border-r-0 border-b-0"
                        value={field.value}
                        onChange={field.onChange}
                        output="html"
                        placeholder="Masukkan konten Anda di sini..."
                        autofocus={true}
                        editable={true}
                        editorContentClassName="p-3 "
                      ></MinimalTiptapEditor>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="registration_link"
              render={({ field }) => (
                <FormItem className="">
                  {/* <FormLabel>Judul</FormLabel> */}
                  <FormControl>
                    <div className="flex flex-row items-center w-full mt-2">
                      <FormLabel className="text-center min-w-56 ">
                        Link Pendaftaran
                      </FormLabel>
                      <Input
                        required
                        type="text"
                        className="rounded-sm"
                        placeholder="Link pendataran"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="px-3" />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="preview">
            <VacancyView
              data={{
                id: 0,
                judul: title,
                file: url,
                deskripsi: description,
                link_pendaftaran: registration_link || "",
                user_id: 0,
                user: {
                  id: 0,
                  name: user?.name || "Anonymous",
                },
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }}
            />
          </TabsContent>
        </Tabs>
        <div className="flex items-center gap-2 justify-end">
          <ConfirmationAlert
            description="Data yang Anda masukkan sebelumnya akan hilang."
            onConfirmation={() => router.history.back()}
          >
            <Button size="sm" variant="outline" className="mt-2">
              Batal
            </Button>
          </ConfirmationAlert>
          <ConfirmationAlert
            description="Periksa kembali data Anda sebelum disimpan."
            onConfirmation={form.handleSubmit(handleOnSubmit)}
          >
            <Button size="sm" type="button" className="mt-2">
              Simpan
            </Button>
          </ConfirmationAlert>
        </div>
      </form>
    </Form>
  );
});

export default VacancyForm;
