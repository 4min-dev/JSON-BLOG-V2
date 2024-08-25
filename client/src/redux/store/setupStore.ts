import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "../reducers/slices/notificationSlice";
import { userAuthService } from "../services/userAuthService";
import sessionUserSlice from "../reducers/slices/sessionUserSlice";
import { postsService } from "../services/postsService";
import { commentsService } from "../services/commentsService";
import { albumService } from "../services/albumService";
import { todosService } from "../services/todosService";

export default function setupStore() {
    return configureStore({
        reducer:{
            notificationSlice:notificationSlice,
            sessionUserSlice:sessionUserSlice,
            [userAuthService.reducerPath]:userAuthService.reducer,
            [postsService.reducerPath]:postsService.reducer,
            [commentsService.reducerPath]:commentsService.reducer,
            [albumService.reducerPath]:albumService.reducer,
            [todosService.reducerPath]:todosService.reducer
        },
        middleware:(getDefaultMiddleware) => 
            getDefaultMiddleware()
            .concat(
                userAuthService.middleware,
                postsService.middleware,
                commentsService.middleware,
                albumService.middleware,
                todosService.middleware)
    })
}