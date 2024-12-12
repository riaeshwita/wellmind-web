import StartTemporaryChatAction from "@/ui/action-start-temporary-chat";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";


export default function Home() {
    return (
        <Stack flexGrow={1} spacing={4} justifyContent="center">
            <Box>
                <Typography variant="h3" component="h1" textAlign="center" gutterBottom>
                    <Box component="span" sx={{ color: "success.main" }}>Well</Box>Mind
                </Typography>
                <Typography variant="body1" component="h2" textAlign="center">How&apos;s your life treating you today?</Typography>
            </Box>
            <Stack direction="row" spacing={1} justifyContent="center">
                <StartTemporaryChatAction />
            </Stack>
        </Stack>
    );
}
