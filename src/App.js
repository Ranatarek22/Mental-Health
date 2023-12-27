import { Suspense, lazy } from "react";
import "../src/style.css";
// // import LoginPage from "./components/LoginPage";
// import SignUpPage from "./components/SignUpPage";
import ToasterProvider from "./components/providers/toaster-provider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const LoginPage = lazy(() => import("./components/pages/LoginPage/LoginPage"));
const SignUpPage = lazy(() =>
  import("./components/pages/SignUpPage/SignUpPage")
);
const HomePage = lazy(() => import("./components/pages/HomePage/HomePage"));

function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <ToasterProvider />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
