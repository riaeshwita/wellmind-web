import fetchModelResponse from "@/lib/fetch-model-response";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError, ZodIssue } from "zod";
import { ChatRequestHandler } from "../chat";
import withRequestBodyValidator from "./with-request-body";


export interface ModelResponse {
    readonly message: Message;
}

export type ModelRequestResponse =
    | { data: ModelResponse; }
    | { error: string | ZodIssue[] };

export const POST: ChatRequestHandler<ModelRequestResponse> = async (request, { params }) => {
    try {
        const body = await withRequestBodyValidator(request);
        const modelResponse = await fetchModelResponse(body.modelInput);

        // TODO: Replace the following semi-hardcoded block with MongoDB document insertion logic.
        const message: Message = {
            id: "placeholder",
            chatId: (await params).chatId,
            role: modelResponse.role,
            content: modelResponse.content,
            createdAt: new Date(),
        };

        return NextResponse.json({ data: { message } }, { status: 200 });
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
