import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITransferUserData } from "../../../ts/interfaces/users/ITransferUserData";

const initialState:{user:ITransferUserData} = { user: { 
    userId:'', 
    username:'', 
    email:'', 
    avatar:'' 
} }

const sessionUserSlice = createSlice({
    name:'sessionUserSlice',
    initialState,
    reducers: {
        newUserSession(state,action:PayloadAction<ITransferUserData>) {
            state.user = action.payload
        }
    }

})

export const { newUserSession } = sessionUserSlice.actions
export default sessionUserSlice.reducer