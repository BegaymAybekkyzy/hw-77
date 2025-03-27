import {existsSync} from "node:fs";
import {promises as fs} from "fs";
import {IMessage} from "./types";
import crypto from "node:crypto";

const fileName = "./messages.json";
let data: IMessage[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(fileName)) {
                await fs.writeFile(fileName, JSON.stringify([]));
            } else {
                const fileContent = await fs.readFile(fileName);
                data = JSON.parse(fileContent.toString()) as IMessage[];
            }
        } catch (e) {
            data = [];
            console.error(e);
        }
    },

    async addNewMessage(message: IMessage) {
        if (!message.author?.trim() || !message.image) {
            message = {
                author: "Anonymous",
                image: null,
                ...message
            };
        }

        data.push(message);
        await this.save();
        return message;
    },

    async getAllMessages() {
        return data;
    },

    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;