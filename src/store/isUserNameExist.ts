import { createMapperHooksStore } from "@extremelyjs/store";
import {apiGetVerifyUserName} from "../api/request"

const isUserNameExistStore = createMapperHooksStore<boolean,{userName: string}>(false);

export const useIsUserNameExist = isUserNameExistStore.useStoreValue;

export const loadIsUserNameExist = isUserNameExistStore.loadStoreValue(
    params => params,
    apiGetVerifyUserName,
)