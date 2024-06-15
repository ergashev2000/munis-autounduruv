import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}
