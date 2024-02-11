import { Suspense, lazy, useState } from "react";
import "../src/style.css";
// // import LoginPage from "./components/LoginPage";
// import SignUpPage from "./components/SignUpPage";
import ToasterProvider from "./components/providers/toaster-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlockRoute from "./routes/blockRoute";
import Navbar from "./components/navigation/NavBar/navbar";
import Sidebar from "./components/navigation/SideBar/sidebar";
import NavigateController from "./components/navigation/NavigateController/NavigateController";
import { main_routes } from "./routes/routes";

const LoginPage = lazy(() => import("./components/pages/LoginPage/LoginPage"));
const ForumsPage = lazy(() =>
  import("./components/pages/ForumsPage/ForumPage")
);
const SignUpPage = lazy(() =>
  import("./components/pages/SignUpPage/SignUpPage")
);
const HomePage = lazy(() => import("./components/pages/HomePage/HomePage"));
const ProfilePage = lazy(() =>
  import("./components/pages/ProfilePage/ProfilePage")
);

function App() {
  const [pathname, setPathname] = useState();
  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <div
          className={`d-flex justify-content-center align-items-center w-100
                        ${
                          main_routes.includes(pathname)
                            ? "flex-column"
                            : "flex-row"
                        }`}
        >
          <NavigateController setPathname={setPathname} />
          <main className="w-100 flex-grow-1 p-2">
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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/forums" element={<ForumsPage />} />
              {/* <Route path="*" element={<Navigate to={"/"} />} /> */}
            </Routes>
          </main>
        </div>
        <ToasterProvider />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
