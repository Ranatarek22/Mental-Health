import { Suspense, lazy, useState, useEffect } from "react";
import ToasterProvider from "./components/providers/toaster-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BlockRoute from "./routes/blockRoute";
import NavigateController from "./components/navigation/NavigateController/NavigateController";
import { main_routes } from "./routes/routes";
import MyPosts from "./components/pages/MyPosts/MyPosts";
import { Spinner } from "react-bootstrap";
import MentalHealthTest from "./components/pages/MentalHealthTest/MentalHealthTest";
import DoctorsList from "./components/pages/doctors/Doctors";
import UserAppointments from "./components/pages/UserAppointments/UserAppointments";
import "../src/style.css";
import Reservation from "./components/pages/doctors/Reservation";
import Footer from "./components/pages/HomePage/components/Footer";

const LoginPage = lazy(() => import("./components/pages/LoginPage/LoginPage"));
const ForumsPage = lazy(() =>
  import("./components/pages/ForumsPage/ForumPage")
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
const DoctorSchedule = lazy(() =>
  import("./components/pages/doctors/DoctorSchedule")
);

function App() {
  const [pathname, setPathname] = useState();
  const [navbarHeight, setNavbarHeight] = useState(0);

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
          <main>
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
              <Route path="/depressiontest" element={<MentalHealthTest />} />
              <Route path="/appointments" element={<UserAppointments />} />
              <Route path="/doctors" element={<DoctorsList />} />
              <Route path="/myposts" element={<MyPosts />} />
              <Route path="/reserve" element={<Reservation />} />

              <Route path="/createforum" element={<CreateForumPage />} />
              <Route path="/doctorschedule" element={<DoctorSchedule />} />
              <Route
                path="/reserve/:doctorId/:startTime/:endTime/:duration"
                element={<Reservation />}
              />
              <Route path="/forums" element={<ForumsPage />} />
              <Route path="/forums/forumlist" element={<ForumsPage />} />
              <Route path="/forums/:postId" element={<SingleForumPage />} />
              <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
              <Route
                path="/forgetpassword/resetpassword"
                element={<ResetPasswordPage />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          {main_routes.includes(pathname) && <Footer />}
        </div>
        <ToasterProvider />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
