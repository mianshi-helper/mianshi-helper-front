import { createMapperHooksStore } from "@extremelyjs/store";
import { apiPostCreateDialoag } from "../api/request";

export interface SessionId {
    sessionId: string;
}

const sessionIdStore = createMapperHooksStore<SessionId,void>();

export const useSessionId = sessionIdStore.useStoreValue;

export const loadSessionId = sessionIdStore.loadStoreValue(
    params => params,
    apiPostCreateDialoag
);