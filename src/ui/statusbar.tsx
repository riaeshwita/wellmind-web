import FavoriteIcon from '@mui/icons-material/Favorite';
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC } from "react";

const StatusBar: FC<AppBarProps> = props => {
    return (
        <AppBar {...props}>
            <Toolbar>
                <Box flexGrow={1}>
                    <Typography variant="h6">WellMind</Typography>
                </Box>
                <Chip variant="outlined" color="success" icon={<FavoriteIcon sx={{ pl: 0.5 }} />} label="Llama3 8B" />
            </Toolbar>
        </AppBar>
    )
}

export default StatusBar;
