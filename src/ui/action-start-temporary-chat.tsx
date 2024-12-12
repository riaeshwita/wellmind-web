import ClearAllIcon from '@mui/icons-material/ClearAll';
import ButtonBase from "@mui/material/ButtonBase";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FC } from "react";


const StartTemporaryChatAction: FC = () => {
    return (
        <Paper variant="outlined">
            <ButtonBase LinkComponent={Link} href="/chat/default" sx={{ p: 2, borderRadius: "inherit" }}>
                <Stack alignItems="center" spacing={1}>
                    <ClearAllIcon fontSize="large" />
                    <Typography variant="body2">Start a temporary chat</Typography>
                </Stack>
            </ButtonBase>
        </Paper>
    )
}

export default StartTemporaryChatAction;
