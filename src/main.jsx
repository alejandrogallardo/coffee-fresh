import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {QuioscoProvider} from "./context/QuioscoProvider.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QuioscoProvider>
        <RouterProvider router={router} />
      </QuioscoProvider>
  </StrictMode>,
)
