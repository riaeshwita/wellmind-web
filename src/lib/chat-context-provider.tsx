"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import fetchPromptResponse from "./fetch-prompt-response";
import { Message } from "@prisma/client";
import { ModelInputRequest } from "./fetch-model-response";


interface IChatContext {
    readonly conversation: Message[];
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
    const [prompt, setPrompt] = useState<string>("");

    const modelInput = useMemo<ModelInputRequest>(() => ({
        context: conversation.map(item => ({ role: item.role as "user" | "assistant", content: item.content })),
        prompt: prompt
    }), [conversation, prompt]);

    const { data, refetch } = useQuery({
        queryKey: ["chat", chatId],
        queryFn: () => fetchPromptResponse(chatId, { modelInput }),
        enabled: false,
        refetchOnWindowFocus: false,
    });

    const submitPrompt: IChatContext["submitPrompt"] = prompt => setPrompt(prompt);

    useEffect(() => {
        if (prompt) {
            refetch();
            setPrompt("");
            const message: Message = {
                chatId,
                content: prompt,
                role: "user",
                createdAt: new Date(),
                id: "placeholder",
            };
            setConversation(prev => [...prev, message]);
        }
    }, [chatId, prompt, refetch]);

    useEffect(() => {
        if (data && "data" in data) {
            const message = data.data.message;
            setConversation(prev => [...prev, message]);
        }
    }, [data]);

    return (
        <ChatContext.Provider value={{ conversation, submitPrompt }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
