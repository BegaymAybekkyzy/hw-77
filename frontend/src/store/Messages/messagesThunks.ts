import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IMessage, IMessageAPI} from "../../types";

export const fetchAllMessages = createAsyncThunk<IMessageAPI[], void>(
    "messages/fetchAllMessages",
    async () => {
        const response = await axiosAPI("messages");
        return response.data;
    }
);

export const submitNewMessage = createAsyncThunk<void, IMessage>(
    "messages/submitNewMessage",
    async (newMessage) => {
        if (!newMessage.image) {
            newMessage.image = null;
        }

        const formData = new FormData();
        const keys = Object.keys(newMessage) as (keyof IMessage)[];

        keys.forEach(key => {
            const value = newMessage[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosAPI.post("messages", formData);
    }
);