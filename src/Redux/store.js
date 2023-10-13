import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice";
import messagesSlice from "./messagesSlice";

let store = configureStore ({
    reducer: {
        bl7 : counterReducer,
        messages: messagesSlice
    }
})

export default store;