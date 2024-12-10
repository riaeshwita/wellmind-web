import { NextRequest, NextResponse } from "next/server";

export interface Context {
    params?: {
        [key: string]: string;
    };
}

export type RequestHandler<C extends Context = object, B = unknown> = (request: NextRequest, context: C) => NextResponse<B> | Promise<NextResponse<B>>;