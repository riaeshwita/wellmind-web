import dayjs from "@/lib/dayjs";
import MarkdownRenderer from "@/lib/markdown-renderer";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Box from "@mui/material/Box";
import Paper, { PaperProps } from "@mui/material/Paper";
import Stack, { StackProps } from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Message } from "@prisma/client";
import { FC } from "react";


export interface ChatBubbleProps extends StackProps {
    readonly message: Message;
    readonly paperProps?: PaperProps;
}

const BubblePaper = styled(Paper, {
    shouldForwardProp: prop => prop !== "role"
})<PaperProps & { role: Message["role"] }>(({ theme, role }) => ({
    ...theme.typography.body1,
    backgroundColor: "transparent",
    width: "100%",
    paddingBlockEnd: theme.spacing(1),
    ...(role === "user" ? {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        alignSelf: "flex-end",
    } : {})
}));

const ChatBubble: FC<ChatBubbleProps> = ({ message, paperProps, ...props }) => {
    const isUser = message.role === "user";
    return (
        <Stack
            direction={isUser ? "column" : "column-reverse"}
            alignSelf={isUser ? "flex-end" : "flex-start"}
            alignItems={isUser ? "flex-end" : "flex-start"}
            spacing={isUser ? 0 : 1}
            sx={{ maxWidth: message.role === "assistant" ? "85%" : "75%" }}
            {...props}>
            <BubblePaper elevation={0} {...paperProps} role={message.role}>
                <MarkdownRenderer>{message.content}</MarkdownRenderer>
            </BubblePaper>
            <Typography variant="caption" color="text.secondary">
                {!isUser && <Box component="strong" color="success.light">
                    <SmartToyIcon sx={{ fontSize: "inherit", verticalAlign: "middle" }} />
                    &nbsp;&nbsp;WellMind AI&nbsp;&nbsp;•&nbsp;&nbsp;
                </Box>}
                {dayjs(message.createdAt).format("HH:mm")}
            </Typography>
        </Stack>
    );
}

export default ChatBubble;
