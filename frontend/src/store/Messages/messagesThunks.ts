import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IMessage} from "../../types";

export const fetchAllMessages = createAsyncThunk<IMessage[], void>(
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

        if (!newMessage.author || newMessage.author.trim().length === 0) {
            newMessage.author = "Anonymous";
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