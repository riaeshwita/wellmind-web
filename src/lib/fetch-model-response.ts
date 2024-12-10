import { ModelResponse } from "@/app/api/chat/[chatId]/route";


export interface ModelRequestContext {
    prompt: string;
}

export default async function fetchModelResponse(context: ModelRequestContext) {
    const modelChatEndpoint = process.env["MODEL_ENDPOINT_CHAT"];
    if (!modelChatEndpoint) {
        throw new ReferenceError("MODEL_ENDPOINT_CHAT is not defined");
    }
    const url = new URL(modelChatEndpoint);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(context)
    });
    return await response.json() as ModelResponse;
}
