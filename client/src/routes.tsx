import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login signUpOpen />} />
        <Route
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
          path="/profile/:id"
        />
      </Routes>
    </>
  );
}
