import React from "react";
import { useForm } from "react-hook-form";
import {
  announcementSchema,
  AnnouncementSchema,
} from "../types/announcement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MinimalTiptapEditor } from "@/components/ui/custom/minimal-tiptap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnnouncementView from "./announcementView";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import ConfirmationAlert from "@/components/ui/custom/alert/confirmationAlert";
import { useRouter } from "@tanstack/react-router";
import { useCreateAnnouncement } from "../hooks/useCreateAnnouncement";
import { Announcement } from "../types/announcement.type";

const AnnouncementForm = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    onSave: (data: AnnouncementSchema) => Promise<void>;
    data?: Announcement
  }
>(({ onSave,  data }) => {
  const handleOnSubmit = (data: AnnouncementSchema) => {
    onSave(data);
  };

  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const form = useForm<AnnouncementSchema>({
    resolver: zodResolver(announcementSchema),
    defaultValues: data ?{
      content: data.isi,
      title: data.judul,
      file: "",
    } : {
      title: "",
      content: "",
      file: "",
    },
  });

  const { title, content } = form.watch();

  return (
    <Form {...form}>
      <form onSubmit={e => e.preventDefault()} className="space-y-2">
        <Tabs defaultValue="edit" className="flex flex-col ">
          <TabsList className="ms-auto">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <div className="border rounded-sm py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-6">
                    {/* <FormLabel>Judul</FormLabel> */}
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Judul</FormLabel> */}
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
          </TabsContent>
          <TabsContent value="preview">
            <AnnouncementView
              data={{
                id: 0,
                judul: title,
                isi: content,
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
            <Button size="sm" type="button"  className="mt-2">
              Simpan
            </Button>
          </ConfirmationAlert>
        </div>
      </form>
    </Form>
  );
});

export default AnnouncementForm;
