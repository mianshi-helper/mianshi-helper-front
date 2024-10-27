import { useMemo } from "react";
import { useAuth } from "../store/auth";

export function useIsAuth(): [boolean] {
    const auth = useAuth();
    console.log('isAuth', auth);
    const isAuth = useMemo(() => {
        return auth?.token !== '' && Number(auth?.expirationTime) > (+Date.now() / 1000);
    },[auth]);
    return [isAuth];
}