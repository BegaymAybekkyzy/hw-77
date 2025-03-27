import  {promises as fs}from "node:fs";
import {randomUUID} from "node:crypto";
import multer from "multer";
import path from "path";
import config from "./config";

const imageStorage = multer.diskStorage({
   destination: async (req, _file, callback) => {
       const destDir = path.join(config.publicPath, "images");
       await fs.mkdir(destDir, { recursive: true });
       callback(null, destDir);
   },

    filename: (_req, file, callback) => {
        const extension = path.extname(file.originalname);
        callback(null, randomUUID() + extension);
    }
});

export const ImageUpload = multer({storage: imageStorage});