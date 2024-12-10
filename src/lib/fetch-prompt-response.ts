import { ModelResponse } from "@/app/api/chat/[chatId]/route";


export interface ModelRequestContext {
    prompt: string;
}

export default async function fetchPromptResponse(chatId: string, context: ModelRequestContext) {
    const url = new URL(`/api/chat/${chatId}`, window.location.origin);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(context)
    });
    return await response.json() as ModelResponse;
}
