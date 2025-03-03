import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_homeLayout/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="p-4 m-3 border w-fit">TEST</div>
      <div>Hello "/about"!</div>
    </>
  );
}
