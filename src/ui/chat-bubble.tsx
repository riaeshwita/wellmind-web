import Paper, { PaperProps } from "@mui/material/Paper";
import { styled } from "@mui/material/styles";


export interface ChatBubbleProps extends PaperProps {
    readonly role: string;
}

export const ChatBubble = styled((props: ChatBubbleProps) => (
    <Paper elevation={0} {...props} />
), { shouldForwardProp: prop => prop !== "role" })<ChatBubbleProps>(({ theme, role }) => ({
    ...theme.typography.body1,
    backgroundColor: "transparent",
    padding: theme.spacing(2),
    maxWidth: "85%",
    ...(role === "user" ? {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        alignSelf: "flex-end",
        maxWidth: "85%",
    } : {})
}));
