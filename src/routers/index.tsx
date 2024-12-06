import { Navigate, Routes, Route } from "react-router";
import Index from "../pages/Index";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";


function RouterIndex() {
    return (
            <Routes>
                <Route path="/" element={<Navigate to="/index" />} />
                <Route path="/index" element={
                    <PrivateRoute>
                        <Index />
                    </PrivateRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Login />} />
                <Route path="*" element={<Navigate to="/index" />} />
            </Routes>
    );
}

export default RouterIndex;