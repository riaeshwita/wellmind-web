"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";

const queryClient = new QueryClient();

const ReactQueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryClientProvider;
