import express from "express";
import {IMessage} from "../types";
import fileDb from "../frileDb";
import {ImageUpload} from "../multer";

const messageRouter = express.Router();

messageRouter.post("/", ImageUpload.single("image"), async (req, res) => {
    if (!req.body.message || req.body.message.trim() === "") {
        res.status(400).send({error: "Please enter a message"});
        return;
    }

    let newMessage: IMessage;

    if (!req.body.author|| req.body.author.trim() === "" ) {
        newMessage = {
            author: "Anonymous",
            message: req.body.message,
            image: req.file ? req.file.filename : null,
        };

    } else {
        newMessage = {
            author: req.body.author,
            message: req.body.message,
            image: req.file ? req.file.filename : null,
        };
    }

    const savedMessage = await fileDb.addNewMessage(newMessage);
    res.send(savedMessage);
});

export default messageRouter;