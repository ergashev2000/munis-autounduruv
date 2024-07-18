import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/MainRoute";

export default function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}
