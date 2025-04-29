import { createMapperHooksStore } from "@extremelyjs/store";
import { apiPostLogin } from "../api/request";
import { LoginParams } from "../types/Login";
import { Auth } from "../types/Auth";
import { message } from "antd";

const authStore = createMapperHooksStore<Auth,LoginParams>(undefined, {withLocalStorage: 'isAuth'});

export const useAuth = authStore.useStoreValue;

export const getAuth = authStore.getStoreValue;

export const loadAuth = authStore.loadStoreValue(
    params => params,
    apiPostLogin,
    {
        beforeEvent: () => {

        },
        afterEvent: () => {
            if (!getAuth()?.token) {
                message.error("登陆失败")
            }
        }
    }
);

export const resetAuth = authStore.reset;