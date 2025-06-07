import { createFactory } from "@extremelyjs/fetch-interface"
import { getAuth } from "../store/auth";

const baseOptions = {
    protocol: import.meta.env.VITE_PROTOCOL,
    host: import.meta.env.VITE_HOST,
}

const option = {
    ...baseOptions,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
}

const formOptions = {
    ...baseOptions,
    headers: {
        ...getAuthorization(),
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryFIc14z39Lb6Leu6y'
    },
}

export function getAuthorization() {
    return {
        Authorization: `Bearer ${getAuth()?.token}`,
    };
}

const tokenOption = {
    ...option,
    headers: () => ({
        ...(option.headers || {}),
        ...(getAuthorization() || {}),
    }),
};


export const {createInterface:createCommonInterface} = createFactory(option);

export const {createInterface:createAuthInterface} = createFactory(tokenOption);

export const {createInterface:createBaseInterface} = createFactory(baseOptions);

export const {createInterface:createFormInterface} = createFactory(formOptions);