import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMessages = createAsyncThunk('messages/fetchmsgs', async () => {
    let response = await axios.get('https://sara7aiti.onrender.com/api/v1/message').then((data) => {
        console.log(data);
    })
    console.log({ response });
    return response
})

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: []
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            console.log(action.payload);
            state.messages = action.payload
        })
    }
})

export default messagesSlice.reducer