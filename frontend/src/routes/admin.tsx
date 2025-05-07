import { useAuthStore } from "@/stores/auth.store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({location, context}) => {
    if(context.isChecked){
      return;
    }
    context.isChecked = true
    const isAuthenticated = await useAuthStore.getState().isAuthenticated();
    if (!isAuthenticated) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

// function RouteComponent() {
//   return <div>Hello "/admin"!</div>;
// }
