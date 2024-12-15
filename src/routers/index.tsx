import { Navigate, Routes, Route } from "react-router";
import Interview from "../pages/interview";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Index from "../pages/Index";


function RouterIndex() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/index" />} />
            <Route path="/index" element={
                <PrivateRoute>
                    <Index />
                </PrivateRoute>
            } />
            <Route path="/interview" element={
                <PrivateRoute>
                    <Interview />
                </PrivateRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="*" element={<Navigate to="/index" />} />
        </Routes>
    );
}

export default RouterIndex;