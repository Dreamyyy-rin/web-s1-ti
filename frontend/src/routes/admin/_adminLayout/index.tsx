// import { Button } from "@/components/ui/button";
// import { useLogout } from "@/features/auth/hooks/useLogout";
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

  return (
    <>
      {/* <Button onClick={handleOnClickLogout}>Logout</Button>
      <Button onClick={() => router.history.back()}>back</Button> */}
      <div>Hello "/admin/"!</div>
    </>
  );
}
