import { useState } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex p-2 gap-2  w-full bg-transparent">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
        <div
          onClick={() => setCount(count + 1)}
          className="select-none cursor-pointer p-2 rounded-md hover:bg-blue-300 w-fit m-2 hover:text-blue-950 bg-blue-700 text-white"
        >
          count is {count}
        </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export default App;
