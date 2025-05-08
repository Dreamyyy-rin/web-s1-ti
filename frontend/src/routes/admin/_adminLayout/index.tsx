// import { Button } from "@/components/ui/button";
// import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/stores/auth.store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/_adminLayout/")({
  component: RouteComponent,
});

function RouteComponent() {

  // console.log("navigation history: ", window.history)
  // const router = useRouter();
  // const { mutate: logout } = useLogout();

  // const handleOnClickLogout = () => {
  //   logout();
  // };
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {/* <Button onClick={handleOnClickLogout}>Logout</Button>
      <Button onClick={() => router.history.back()}>back</Button> */}
      <div className="flex flex-col items-center justify-center mt-6">
    <h1 className="flex items-center gap-2 text-center font-normal">
      Halo, {user?.name}
      <span className="wave">👋</span>
    </h1>
  </div>
    </>
  );
}
