import { Button } from "@/components/ui/button";
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
import { useCreateAdmin } from "@/features/admin/hooks/useCreateAdmin";
import { adminSchema, AdminSchema } from "@/features/admin/types/admin.schema";
import { handleAxiosError } from "@/lib/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_adminLayout/admin-account/add")({
  component: RouteComponent,
  beforeLoad: () => {
    return {
      title: "Tambah",
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const form = useForm<AdminSchema>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const { mutate: create } = useCreateAdmin();

  const onSubmit = async (data: AdminSchema) => {
    create(data, {
      onSuccess: () => {
        toast.success("Berhasil", {
          description: `Admin baru berhasil dibuat`,
        });
        navigate({ to: "/admin/admin-account" });
      },
      onError: (error) => {
        const message = handleAxiosError(error)?.message;
        toast.error("Gagal", {
          description: message ?? "Terjadi kesalahan yang tidak diketahui",
        });
      },
    });
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-3 md:p-6">
        <div className="flex w-full  flex-col ">
          <div className="container flex flex-col  mx-auto ">
            <Card>
              <CardHeader className="flex items-center">
                <CardTitle>Akun Admin Baru</CardTitle>
                <CardDescription>
                  Silakan mengisi data admin baru
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
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
                    <div className="flex">
                      <Button type="submit" className="mt-7 w-full">
                        Submit
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
