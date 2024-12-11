import ChatContextProvider from "@/lib/chat-context-provider";
import ChatBubblesRenderer from "@/ui/chat-bubbles-renderer";
import TextBoxChatInput from "@/ui/textbox-chat-input";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
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
