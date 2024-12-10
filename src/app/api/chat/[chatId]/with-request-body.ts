import { NextRequest } from "next/server";
import { isAscii, isEmpty, isLength } from "validator";


type FormEntryName = "prompt";

interface ValidatedData {
    readonly prompt: string;
}

type RequestBodyValidationErrorType = { [K in FormEntryName]?: string | string[] };

export class RequestBodyValidationError extends Error {

    private _errors: RequestBodyValidationErrorType;
    public get errors(): RequestBodyValidationErrorType {
        return this._errors;
    }

    public readonly status = 400;

    constructor() {
        super("Validation Error");
        this.name = "RequestBodyValidationError";
        this._errors = {};
    }

    public addError(field: FormEntryName, error: string) {
        if (this._errors[field]) {
            if (Array.isArray(this._errors[field])) {
                (this._errors[field] as string[]).push(error);
            } else {
                this._errors[field] = [this._errors[field] as string, error];
            }
        } else {
            this._errors[field] = error;
        }
    }

    public get hasErrors(): boolean {
        return Object.keys(this._errors).length > 0;
    }
}

export default async function withRequestBodyValidator(request: NextRequest): Promise<ValidatedData> {
    const formData = await request.formData();
    const formErrors = new RequestBodyValidationError();
    const validatedData: ValidatedData = { prompt: "" };

    // Validate email
    if (formData.has("prompt")) {
        const value = formData.get("prompt")!.toString()!;
        if (isEmpty(value))
            formErrors.addError("prompt", "Prompt cannot be empty");
        if (!isAscii(value))
            formErrors.addError("prompt", "Prompt cannot have non-ASCII characters");
        if (isLength(value, { min: 1, max: parseInt(process.env["NEXT_PUBLIC_PROMPT_TOKEN_LIMIT"]!) }))
            formErrors.addError("prompt", "Prompt must be between 1 and 1000 characters");
        Object.assign(validatedData, { prompt: value });
    } else {
        formErrors.addError("prompt", "Prompt is required");
    }

    if (formErrors.hasErrors) {
        throw formErrors;
    }

    return validatedData;
};
