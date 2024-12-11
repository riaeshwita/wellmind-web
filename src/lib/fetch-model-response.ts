import { z } from "zod";


export const ModelContextItem = z.object({
    role: z.enum(["user", "assistant"], { message: "Invalid role" }),
    content: z.string()
})

export const ModelInputRequest = z.object({
    context: z.array(ModelContextItem).max(1000),
    prompt: z.string().min(1).max(1000),
});
export type ModelInputRequest = z.infer<typeof ModelInputRequest>;

export const ModelResponse = ModelContextItem;
export type ModelResponse = z.infer<typeof ModelResponse>;

export default async function fetchModelResponse(input: ModelInputRequest) {
    const modelChatEndpoint = process.env["MODEL_ENDPOINT_CHAT"];
    if (!modelChatEndpoint)
        throw new ReferenceError("MODEL_ENDPOINT_CHAT is not defined");
    const url = new URL(modelChatEndpoint);

    const body = ModelInputRequest.parse(input);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
    return await response.json() as ModelResponse;
}
