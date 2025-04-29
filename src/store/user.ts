import { createMapperHooksStore } from "@extremelyjs/store";
import { User } from "../types/User";
import { apiGetUser } from "../api/request";

const userStore = createMapperHooksStore<User, void>();

export const useUser = userStore.useStoreValue;

export const loadUser = userStore.loadStoreValue(
    params => params,
    apiGetUser
);