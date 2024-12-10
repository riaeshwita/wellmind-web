import ChatContextProvider from "@/lib/chat-context-provider";
import ChatBubblesRenderer, { ChatBubblesRendererProps } from "@/ui/chat-bubbles-renderer";
import TextBoxChatInput from "@/ui/textbox-chat-input";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";



const sampleChatMessages: ChatBubblesRendererProps['conversation'] = [
    {
        role: "bot",
        content: "Hi, I'm WellMind, your personal AI health coach. I'm here to help you on your journey to better health.",
    },
    {
        role: "bot",
        content: "Let's get started! What are your health goals?",
    },
    {
        role: "user",
        content: "I want to lose weight and improve my mood.",
    },
    {
        role: "bot",
        content: "Great! I can help you with that. Let's start by understanding your health goals.",
    }
];

interface ChatPageProps {
    readonly params: {
        readonly chatId: string;
    };
}

export default function ChatPage({ params }: ChatPageProps) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chatId = params.chatId;
    // TODO: Validate chatId to be a UUID/CUID once accounts and chat persistence is enabled.

    return (
        <ChatContextProvider chatId={chatId}>
            <Box component="main" sx={{ height: "100vh" }}>
                <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <Grid2 container direction="column" flex={1} spacing={2}>
                        <Grid2 size="grow">
                            <ChatBubblesRenderer sx={{ height: "100%", overflowY: "auto" }} />
                        </Grid2>
                        <Grid2 sx={{ py: 2 }}>
                            <TextBoxChatInput />
                            <Typography variant="caption" component="p" textAlign="center" color="text.secondary" sx={{ mt: 1 }}>
                                Crafted by <strong>Ando the Great</strong>
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Container>
            </Box>
        </ChatContextProvider>
    )
}
