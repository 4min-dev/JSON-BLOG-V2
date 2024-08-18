import setupStore from "../../redux/store/setupStore";

const store = setupStore()

export type TRootState = ReturnType<typeof store.getState>