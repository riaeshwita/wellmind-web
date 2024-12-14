"use client";

import { useChatContext } from "@/lib/chat-context-provider";
import Fade from "@mui/material/Fade";
import Stack, { StackProps } from "@mui/material/Stack";
import { FC, useRef } from "react";
import ChatBubble, { ChatBubbleSkeleton } from "./chat-bubble";


type ChatBubblesRendererProps = Omit<StackProps, "children">

const ChatBubblesRenderer: FC<ChatBubblesRendererProps> = ({ ...props }) => {
    const { conversation, query: { isLoading }, onConversationUpdate } = useChatContext();
    const stackRef = useRef<HTMLDivElement>(null);

    onConversationUpdate(() => {
        if (stackRef.current) {
            stackRef.current.scrollTo(0, stackRef.current.scrollHeight);
        }
    });

    return (
        <Stack spacing={2} {...props} ref={stackRef}>
            {conversation.map((message, index) => (
                <Fade in mountOnEnter key={index}>
                    <ChatBubble message={message} />
                </Fade>
            ))}
            {isLoading && <ChatBubbleSkeleton />}
        </Stack>
    );
};

export default ChatBubblesRenderer;
