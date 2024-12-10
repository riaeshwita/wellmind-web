"use client";

import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";
import { ChatBubble } from "./chat-bubble";
import Fade from "@mui/material/Fade";
import { useChatContext } from "@/lib/chat-context-provider";


type ChatBubblesRendererProps = Omit<StackProps, "children">

const ChatBubblesRenderer: FC<ChatBubblesRendererProps> = ({ ...props }) => {
    const { conversation } = useChatContext();
    return (
        <Stack justifyContent="flex-end" spacing={2} {...props}>
            {conversation.map((message, index) => (
                <Fade in mountOnEnter key={index}>
                    <ChatBubble role={message.role}>{message.content}</ChatBubble>
                </Fade>
            ))}
        </Stack>
    );
};

export default ChatBubblesRenderer;
