import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import {
  About,
  Blog,
  Contacts,
  Dashboard,
  Error,
  Home,
  Projects,
} from "./pages/index.jsx";

// Create browser router and routes
const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="about" element={<About />} />
      <Route path="blog" element={<Blog />} />
      <Route path="projects" element={<Projects />} />
      <Route path="contact" element={<Contacts />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={route}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
