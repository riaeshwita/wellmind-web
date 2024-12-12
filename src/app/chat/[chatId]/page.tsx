import ChatContextProvider from "@/lib/chat-context-provider";
import ChatBubblesRenderer from "@/ui/chat-bubbles-renderer";
import TextBoxChatInput from "@/ui/textbox-chat-input";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


interface ChatPageProps {
    readonly params: Promise<{
        readonly chatId: string;
    }>;
}

export default async function ChatPage({ params }: ChatPageProps) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chatId = (await params).chatId;
    // TODO: Validate chatId to be a UUID/CUID once accounts and chat persistence is enabled.

    return (
        <ChatContextProvider chatId={chatId}>
            <Toolbar />
            <Stack component="main" sx={{ position: "relative",  flex: 1 }}>
                <Container maxWidth="md" sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <ChatBubblesRenderer />
                </Container>
                <Box sx={{ position: "sticky", bottom: 0, width: "100%", backgroundColor: "background.paper", py: 2 }}>
                    <Container maxWidth="md">
                        <TextBoxChatInput autoFocus />
                        <Typography variant="caption" component="p" textAlign="center" color="text.secondary" sx={{ mt: 1 }}>
                            Crafted by <strong>Ando the Great</strong>
                        </Typography>
                    </Container>
                </Box>
            </Stack>
        </ChatContextProvider>
    )
}
