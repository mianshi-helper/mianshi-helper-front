import { createMapperHooksStore } from "@extremelyjs/store";

const countStore = createMapperHooksStore<number>(0);

// 订阅count value的hooks
export const useCount = countStore.useStoreValue;

// 直接获取count value（获取当前值，没有订阅的效果）
export const getCount = countStore.getStoreValue;

// 类似setState
export const setCount = countStore.setStoreValue;

export const resetCount = countStore.reset;

// 还可以和网络请求结合异步更新，或者订阅loading状态，详情可以参考 @extremelyjs/store 文档