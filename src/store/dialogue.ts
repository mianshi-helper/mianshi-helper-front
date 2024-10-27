import { createMapperHooksStore } from "@extremelyjs/store";

const dialogueStore = createMapperHooksStore<string[]>([]);

export const useDialouge = dialogueStore.useStoreValue;

export const setDialouge = dialogueStore.setStoreValue;