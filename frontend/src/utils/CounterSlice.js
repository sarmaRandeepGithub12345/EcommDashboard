import {createSlice} from "@reduxjs/toolkit"
import { getLocalItem } from "./local_storage_helpers"

const initialState = {
    token : getLocalItem("token") || null,
    user: getLocalItem("user") || null
}
export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers: {
        changeToken: (state,action)=>{
        state.token = state.token?null:action.payload
        },
        changeUserData:(state,action)=>{
            state.user=action.payload
        }
    }
})
export const {changeToken,changeUserData} = counterSlice.actions
export default counterSlice.reducer