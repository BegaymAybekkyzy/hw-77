import {IMessage} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAllMessages, submitNewMessage} from "./messagesThunks.ts";
import {RootState} from "../../app/store.ts";

interface IMessagesState {
    messages: IMessage[];
    sendingLoading: boolean;
    fetchingLoading: boolean;
}

const initialState: IMessagesState = {
    messages: [],
    sendingLoading: false,
    fetchingLoading: false,
};

export const selectMessages = (state: RootState) => state.messages.messages;
export const selectSendingLoading = (state: RootState) => state.messages.sendingLoading;
export const selectFetchingLoading = (state: RootState) => state.messages.fetchingLoading;

const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllMessages.pending, state => {
                state.fetchingLoading = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state, {payload}) => {
                state.fetchingLoading = false;
                state.messages = payload;
            })
            .addCase(fetchAllMessages.rejected, state => {
                state.fetchingLoading = false;
            })

            .addCase(submitNewMessage.pending, state => {
                state.sendingLoading = true;
            })
            .addCase(submitNewMessage.fulfilled, state => {
                state.sendingLoading = false;
            })
            .addCase(submitNewMessage.rejected, state => {
                state.sendingLoading = false;
            });
    }
});

export const messageReducer = messageSlice.reducer;