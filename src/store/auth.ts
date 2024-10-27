import { createMapperHooksStore } from "@extremelyjs/store";
import { apiPostLogin } from "../api/request";
import { LoginParams } from "../types/Login";
import { Auth } from "../types/Auth";

const authStore = createMapperHooksStore<Auth,LoginParams>(undefined, {withLocalStorage: 'isAuth'});

export const useAuth = authStore.useStoreValue;

export const getAuth = authStore.getStoreValue;

export const loadAuth = authStore.loadStoreValue(
    params => params,
    apiPostLogin,
);