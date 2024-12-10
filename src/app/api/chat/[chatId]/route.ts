import { NextResponse } from "next/server";
import { ChatRequestHandler } from "../chat";
import withRequestBodyValidator, { RequestBodyValidationError } from "./with-request-body";
import fetchModelResponse from "@/lib/fetch-model-response";


export interface ModelResponse {
    readonly content: string;
}

export type ModelRequestResponse =
    | { data: ModelResponse; }
    | { error: string | RequestBodyValidationError["errors"] };

export const POST: ChatRequestHandler<ModelRequestResponse> = async (request, { params }) => {
    try {
        const body = await withRequestBodyValidator(request);
        const modelResponse = await fetchModelResponse(body);

        return NextResponse.json({ data: { content: modelResponse.content } }, { status: 300 });
    } catch (error) {
        if (error instanceof RequestBodyValidationError) {
            return NextResponse.json({error: error.errors}, { status: error.status });
        }
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
