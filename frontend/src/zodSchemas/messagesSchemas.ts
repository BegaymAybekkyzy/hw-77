import {z} from "zod";

export const messageSchema = z.object({
    message: z.string()
        .min(1, "Please enter a message"),
    author: z.string().optional(),
    image: z.instanceof(File).nullable().optional(),
});