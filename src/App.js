import { Suspense, lazy } from "react";
import "../src/style.css";
// // import LoginPage from "./components/LoginPage";
// import SignUpPage from "./components/SignUpPage";
import ToasterProvider from "./components/providers/toaster-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlockRoute from "./routes/blockRoute";
import Navbar from "./components/navigation/NavBar/navbar";
import Sidebar from "./components/navigation/SideBar/sidebar";

const LoginPage = lazy(() => import("./components/pages/LoginPage/LoginPage"));
const ForumsPage = lazy(() =>
  import("./components/pages/ForumsPage/ForumPage")
);
const SignUpPage = lazy(() =>
  import("./components/pages/SignUpPage/SignUpPage")
);
const HomePage = lazy(() => import("./components/pages/HomePage/HomePage"));
const UserPage = lazy(() => import("./components/pages/UserPage/UserPage"));

function App() {
  const main_routes = ["/", "/login", "/signup"];
  const pathname = window.location.pathname;
  console.log(pathname);
  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        {main_routes.includes(pathname) ? <Navbar /> : <Sidebar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <BlockRoute>
                <LoginPage />
              </BlockRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <BlockRoute>
                <SignUpPage />
              </BlockRoute>
            }
          />
          <Route path="/user" element={<UserPage />} />
          <Route path="/forums" element={<ForumsPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <ToasterProvider />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
