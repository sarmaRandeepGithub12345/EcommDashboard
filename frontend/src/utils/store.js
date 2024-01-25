import { configureStore } from "@reduxjs/toolkit";
import counterSliceReducer from "./CounterSlice"
export const store = configureStore({
    reducer:{
        counter:counterSliceReducer,
    },
})