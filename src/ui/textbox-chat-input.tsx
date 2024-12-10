"use client";

import IconButton from "@mui/material/IconButton";
import { alpha, styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import { FormEventHandler, useState } from "react";
import { isAscii } from "validator";
import Box from "@mui/material/Box";
import { useChatContext } from "@/lib/chat-context-provider";


export const StyledChatTextInput = styled((props: TextFieldProps) => (
    <TextField
        fullWidth
        multiline
        maxRows={4}
        enterKeyHint="send"
        {...props}
    />
))(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: alpha(theme.palette.secondary.main, 0.5),
        },
        "&:hover fieldset": {
            borderColor: theme.palette.secondary.main,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary.main,
        },
    },
    "& .MuiFormHelperText-root": {
        color: theme.palette.secondary.main,
    },
    "& .MuiInputBase-root": {
        padding: theme.spacing(1.5),
    },
    "& .MuiInputLabel-root": {
        color: theme.palette.secondary.main,
    },
    "& .MuiInputBase-input": {
        color: theme.palette.text.primary,
        ...theme.typography.body1
    },
}));

const TextBoxChatInput = (props: TextFieldProps) => {
    const [prompt, setPrompt] = useState("");
    const [inputError, setInputError] = useState("");
    const isSubmitEnabled = prompt.length > 0 && inputError.length === 0;

    const { submitPrompt } = useChatContext();

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === "" || isAscii(value)) {
            setInputError("");
        } else {
            setInputError("Only ASCII characters allowed");
        }
        setPrompt(value);
    }

    const onSubmitHandler: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        if (isSubmitEnabled) {
            submitPrompt(prompt);
            setPrompt("");
        }
    }

    return (
        <Box component="form" onSubmit={onSubmitHandler}>
            <StyledChatTextInput
                placeholder="Type your message here..."
                value={prompt}
                error={inputError.length > 0}
                helperText={inputError}
                onChange={onChangeHandler}
                slotProps={{
                    input: {
                        endAdornment: (
                            <IconButton type="submit" disabled={!isSubmitEnabled}>
                                <SendIcon />
                            </IconButton>
                        )
                    }
                }}
                {...props}
            />
        </Box>
    );
};

export default TextBoxChatInput;
