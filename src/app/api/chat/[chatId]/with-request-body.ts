import { ModelInputRequest } from "@/lib/fetch-model-response";
import { NextRequest } from "next/server";
import { z } from "zod";


export const ChatRequestBody = z.object({
    modelInput: ModelInputRequest
});
export type ChatRequestBody = z.infer<typeof ChatRequestBody>;

export default async function withRequestBodyValidator(request: NextRequest): Promise<ChatRequestBody> {
    const formData = await request.json();
    return ChatRequestBody.parse(formData);
};
