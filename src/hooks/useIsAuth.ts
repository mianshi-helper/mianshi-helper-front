import { useMemo } from "react";
import { useAuth } from "../store/auth";
import { message } from "antd";

export function useIsAuth(): boolean {
    const auth = useAuth();
    const isAuth = useMemo(() => {
        if (!auth?.token) {
            message.error("请先登录");
            return false;
        }
        const isTokenValid = Number(auth?.expirationTime) > (+Date.now());
        if (!isTokenValid) {
            message.error("登录已过期，请重新登录");
            return false;
        }
        return true;
    }, [auth]);
    return isAuth;
}