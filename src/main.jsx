import { StrictMode } from 'react' // Lets JSX work.
import { createRoot } from 'react-dom/client' // Mounts React into the real web page.
import './index.css'
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from './context/AuthProvider.jsx' //The actual map of routes.
import router from "./router.jsx"; //This is the file of the route maps I created

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
