
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Map from '../Components/Map';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Map></Map>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
