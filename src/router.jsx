// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import SpinnerLoader from "./components/SpinnerLoader.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import BecomeBusinessPage from "./pages/BecomeBusinessPage.jsx";
import CreateCoffeeshopPage from "./pages/CreateCoffeeshopPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> }, // The main\HomePage hub at "/"
  {path: "/about", element: <AboutPage />}, //The "about us" page
  {path: "features", element: <FeaturesPage />}, //The heart of the application, where we can do the different functions to find the perfect coffee shop
  { path: "/login", element: <LoginPage /> }, //LoginPage path at "/login"
  { path: "/register", element: <RegisterPage /> }, //RegisterPage path at "/register"
  { path: "/becomeBusiness", element: <BecomeBusinessPage /> }, //RegisterPage path at "/register"
  { path: "/createCoffeeshop", element: <CreateCoffeeshopPage /> }, //RegisterPage path at "/register"
  { path: "*", element: <div style={{padding: 16}}>Not found</div> }, //The rest pages who don't exist get 404 fallback
]);

export default router;
