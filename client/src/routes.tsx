import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

export default function AppRoutes() {
    return (
        <>
        <Routes>
            <Route path="/" element={<Signup />} />
        </Routes>
        </>
    )
}
