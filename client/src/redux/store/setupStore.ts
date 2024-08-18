import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "../reducers/slices/notificationSlice";
import { userAuthService } from "../services/userAuthService";
import sessionUserSlice from "../reducers/slices/sessionUserSlice";
import { postsService } from "../services/postsService";

export default function setupStore() {
    return configureStore({
        reducer:{
            notificationSlice:notificationSlice,
            sessionUserSlice:sessionUserSlice,
            [userAuthService.reducerPath]:userAuthService.reducer,
            [postsService.reducerPath]:postsService.reducer
        },
        middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(userAuthService.middleware,postsService.middleware)
    })
}