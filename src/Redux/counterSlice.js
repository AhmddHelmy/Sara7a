import { createSlice } from "@reduxjs/toolkit";


let counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 0
    },
    reducers: {
        increment: (state) => {
            state.counter += 1
        },
        decrement: (state) => {
            state.counter -= 1
        },
        incrementByAmount: (state, action) => {
            state.counter += action.payload
        }
    }
})

export let counterReducer = counterSlice.reducer

export let {increase, decrease} = counterSlice.actions 