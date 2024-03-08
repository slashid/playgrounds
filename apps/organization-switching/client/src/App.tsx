import "@slashid/react/style.css";
import "@slashid/ui/style.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import ReactGTM from "react-gtm-module";

const gtmId = import.meta.env.VITE_GTM_ID;
if (gtmId) {
  ReactGTM.initialize({
    gtmId,
  });
}

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
