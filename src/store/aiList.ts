import { createMapperHooksStore } from "@extremelyjs/store";
import { AiList } from "../types/AiListItem";
import { apiGetAiList } from "../api/request";

const aiListStore = createMapperHooksStore<AiList,void>();

export const useAiList = aiListStore.useStoreValue;

export const loadAiList = aiListStore.loadStoreValue(
    params => params,
    apiGetAiList
)