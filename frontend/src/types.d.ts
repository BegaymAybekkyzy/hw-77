export interface IMessage {
    message: string;
    author?: string;
    image?: File | null;
}

export interface IMessageAPI {
    message: string;
    author: string;
    image: string;
}