"use client";

import { useChatContext } from "@/lib/chat-context-provider";
import Fade from "@mui/material/Fade";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC } from "react";
import ChatBubble from "./chat-bubble";


type ChatBubblesRendererProps = Omit<StackProps, "children">

const ChatBubblesRenderer: FC<ChatBubblesRendererProps> = ({ ...props }) => {
    const { conversation } = useChatContext();
    return (
        <Stack spacing={2} {...props}>
            {conversation.map((message, index) => (
                <Fade in mountOnEnter key={index}>
                    <ChatBubble message={message} />
                </Fade>
            ))}
        </Stack>
    );
};

export default ChatBubblesRenderer;
