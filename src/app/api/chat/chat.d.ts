import { Context, RequestHandler } from "../api";

interface ChatContext extends Context {
    params: Promise<{
        chatId: string;
    }>
}

export type ChatRequestHandler<B = unknown> = RequestHandler<ChatContext, B>;
