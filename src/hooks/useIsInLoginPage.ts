import { useMemo } from "react";
import { useLocation } from "react-router";

export const useIsInLoginPage = () => {
    const params = useLocation();
    return useMemo(() => {
        return params.pathname.endsWith("/login");
    }, [params])
};