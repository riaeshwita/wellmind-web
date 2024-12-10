"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import fetchPromptResponse from "./fetch-prompt-response";

interface IChatContext {
    readonly conversation: Record<"role" | "content", string>[];
    submitPrompt: (prompt: string) => void;
}

const initialContext: IChatContext = {
    conversation: [],
    submitPrompt: () => { },
};

export const ChatContext = createContext<IChatContext>(initialContext);

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChatContext must be used within a ChatContextProvider");
    }
    return context;
};

export interface ChatContextProviderProps {
    readonly chatId: string;
}

const ChatContextProvider: FC<PropsWithChildren<ChatContextProviderProps>> = ({ chatId, children }) => {
    const [conversation, setConversation] = useState<IChatContext["conversation"]>([]);
    const q = useQuery({
        queryKey: ["chat", chatId],
        queryFn: () => fetchPromptResponse(chatId, ),
        enabled: false,
        refetchOnWindowFocus: false,
    })

    const submitPrompt: IChatContext["submitPrompt"] = prompt => {
        setConversation(prev => [...prev, { role: "user", content: prompt }]);
    };

    return (
        <ChatContext.Provider value={{ conversation, submitPrompt }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
