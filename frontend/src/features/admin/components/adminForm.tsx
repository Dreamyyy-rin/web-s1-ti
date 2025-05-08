import React from "react";
import { adminSchema, AdminSchema } from "../types/admin.schema";
import { User } from "@/features/user/types/user.type";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConfirmationAlert from "@/components/ui/custom/alert/confirmationAlert";
import { useRouter } from "@tanstack/react-router";

const AdminForm = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    onSave: (data: AdminSchema) => Promise<void>;
    data?: User;
  }
>(({ onSave, data, className, ...props }, ref) => {
  const router = useRouter();

  const handleOnSubmit = (data: AdminSchema) => {
    onSave(data);
  };

  const form = useForm<AdminSchema>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: data?.name ?? "",
      email: data?.email ?? "",
      password: "",
      password_confirmation: "",
    },
  });

  return (
    <div
      className={cn("flex flex-col items-center gap-6 p-3 md:p-6", className)}
      ref={ref}
      {...props}
    >
      <div className="flex w-full  flex-col ">
        <div className="container flex flex-col  mx-auto ">
          <Card>
            <CardHeader className="flex items-center">
              <CardTitle>Akun Admin</CardTitle>
              <CardDescription>Silakan mengisi data admin</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama lengkap</FormLabel>
                        <FormControl>
                          <Input
                            required
                            type="text"
                            placeholder="Sang penakluk"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            required
                            type="email"
                            placeholder="admin@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            required
                            type="password"
                            placeholder="Masukkan password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi password</FormLabel>
                        <FormControl>
                          <Input
                            required
                            type="password"
                            placeholder="Masukkan konfirmasi password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full justify-center gap-2 pt-8">
                    <ConfirmationAlert
                      description="Data yang Anda masukkan sebelumnya akan hilang."
                      onConfirmation={() => router.history.back()}
                    >
                      <Button size="sm" variant="outline" className="w-full">
                        Batal
                      </Button>
                    </ConfirmationAlert>
                    <ConfirmationAlert
                      description="Periksa kembali data Anda sebelum disimpan."
                      onConfirmation={form.handleSubmit(handleOnSubmit)}
                    >
                      <Button size="sm" type="button" className="w-full">
                        Simpan
                      </Button>
                    </ConfirmationAlert>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
});

export default AdminForm;
