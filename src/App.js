import { Suspense, lazy, useState, useEffect } from "react";
import "../src/style.css";
import ToasterProvider from "./components/providers/toaster-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlockRoute from "./routes/blockRoute";
import NavigateController from "./components/navigation/NavigateController/NavigateController";
import { main_routes } from "./routes/routes";
import MyPosts from "./components/pages/MyPosts/MyPosts";
import Notifications from "./components/pages/notifications/Notifications";
import { Spinner } from "react-bootstrap";

const LoginPage = lazy(() => import("./components/pages/LoginPage/LoginPage"));
const ForumsPage = lazy(() =>
  import("./components/pages/ForumsPage/ForumPage")
);
const ForumsList = lazy(() =>
  import("./components/pages/ForumsPage/helpers/ForumList")
);
const SignUpPage = lazy(() =>
  import("./components/pages/SignUpPage/SignUpPage")
);
const HomePage = lazy(() => import("./components/pages/HomePage/HomePage"));
const CreateForumPage = lazy(() =>
  import("./components/forms/CreateForumForm")
);
const ProfilePage = lazy(() =>
  import("./components/pages/ProfilePage/ProfilePage")
);
const SingleForumPage = lazy(() =>
  import("./components/pages/singleForum/ForumItemPage")
);
const ForgetPasswordPage = lazy(() =>
  import("./components/pages/ForgetPasswordPage/ForgetPasswordPage")
);
const ResetPasswordPage = lazy(() =>
  import("./components/pages/ResetPasswordPage/ResetPasswordPage")
);
const Appointment = lazy(() =>
  import("./components/pages/AppointmentPage/AppointmentPage")
);
function App() {
  const [pathname, setPathname] = useState();
  const [navarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navbar = document.getElementById("app-navbar");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "300px",
          }}
        >
          <Spinner
            variant="primary"
            animation="grow"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      }
    >
      <BrowserRouter>
        <div
          className={`d-flex justify-content-center align-items-center 
                        ${
                          main_routes.includes(pathname)
                            ? "flex-column"
                            : "flex-row"
                        }`}
          style={{ minHeight: "100vh", overflow: "hidden" }}
        >
          <NavigateController setPathname={setPathname} />
          <main
            // className=" flex-grow-1 "
            style={
              {
                // minHeight: `calc(-70px + 100vh)`,
                // minWidth: "70%",
                // maxWidth: "100%",
                // display: "flex",
                // justifyContent: "center",
                // justifyItems: "center",
              }
            }
          >
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
              <Route path="/myposts" element={<MyPosts />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/createforum" element={<CreateForumPage />} />
              <Route path="/forums" element={<ForumsPage />} />
              {/* <Route path="/forums/forumlist" element={<ForumsList />} /> */}
              <Route path="/forums/forumlist" element={<ForumsPage />} />
              <Route path="/forums/:postId" element={<SingleForumPage />} />
              <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
              <Route
                path="/forgetpassword/resetpassword"
                element={<ResetPasswordPage />}
              />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
          </main>
        </div>
        <ToasterProvider />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
