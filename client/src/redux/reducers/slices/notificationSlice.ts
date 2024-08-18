import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INotificationMessage } from "../../../ts/interfaces/notifications/INotificationMessage";

type TInitialState = {
    notifications:INotificationMessage[]
}

const initialState:TInitialState = {
    notifications:[]
}

const notificationSlice = createSlice({
    name:'notifications',
    initialState,
    reducers: {
        newNotification(state,action:PayloadAction<INotificationMessage>) {
            state.notifications.push(action.payload)
        },
        filterInvalidNotifications(state,action:PayloadAction<string | number>) {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload)
        }
    }
})

export const { newNotification,filterInvalidNotifications } = notificationSlice.actions
export default notificationSlice.reducer