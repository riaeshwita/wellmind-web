import { ModelRequestResponse } from "@/app/api/chat/[chatId]/route";
import { ChatRequestBody } from "@/app/api/chat/[chatId]/with-request-body";


export default async function fetchPromptResponse(chatId: string, data: ChatRequestBody) {
    const url = new URL(`/api/chat/${chatId}`, window.location.origin);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json() as ModelRequestResponse;
}
