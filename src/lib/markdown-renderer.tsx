import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren } from "react";
import Markdown, { Options } from "react-markdown";

const MarkdownRenderer: FC<PropsWithChildren<Options>> = props => {
    return (
        <Markdown
            components={{
                p: ({ children }) => <Typography variant="body1" lineHeight={1.8}>{children}</Typography>,
            }}
            {...props}
        />
    );
}

export default MarkdownRenderer;
