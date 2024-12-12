"use client";

import { ModelRequestResponse } from "@/app/api/chat/[chatId]/route";
import { Message } from "@prisma/client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";
import { ModelInputRequest } from "./fetch-model-response";
import fetchPromptResponse from "./fetch-prompt-response";


interface IChatContext {
    readonly conversation: Message[];
    readonly query: UseQueryResult<ModelRequestResponse, Error>;
    submitPrompt: (prompt: string) => void;
}

const initialContext: IChatContext = {
    conversation: [],
    query: {} as UseQueryResult<ModelRequestResponse, Error>,
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

    const query = useQuery({
        queryKey: ["chat", chatId],
        queryFn: () => fetchPromptResponse(chatId, { modelInput }),
        enabled: false,
        refetchOnWindowFocus: false,
    });

    const submitPrompt: IChatContext["submitPrompt"] = prompt => setPrompt(prompt);

    useEffect(() => {
        if (prompt && prompt.length > 1) {
            query.refetch();
            const message: Message = {
                chatId,
                content: prompt,
                role: "user",
                createdAt: new Date(),
                id: "placeholder",
            };
            setPrompt("");
            setConversation(prev => [...prev, message]);
        }
    }, [chatId, prompt, query]);

    useEffect(() => {
        if (query.data && "data" in query.data) {
            const message = query.data.data.message;
            setConversation(prev => [...prev, message]);
        }
    }, [query.data]);

    return (
        <ChatContext.Provider value={{ conversation, query, submitPrompt }}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
