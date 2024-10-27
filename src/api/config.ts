import { createFactory } from "@extremelyjs/fetch-interface"
import { TOKEN } from "../contstants/tokens";

const option = {
    protocol: import.meta.env.VITE_PROTOCOL,
    host: import.meta.env.VITE_HOST,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
}

const baseOptions = {
    protocol: import.meta.env.VITE_PROTOCOL,
    host: import.meta.env.VITE_HOST,
}

const tokenOption = {
    ...option,
    headers: {
        ...option.headers,
        Authorization: TOKEN,
    },
}

export const {createInterface:createCommonInterface} = createFactory(option);

export const {createInterface:createAuthInterface} = createFactory(tokenOption);

export const {createInterface:createBaseInterface} = createFactory(baseOptions);