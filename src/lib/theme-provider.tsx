"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { alpha, createTheme, PaletteMode, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import localFont from "next/font/local";
import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from "react";


const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

/** Application-wide width for the `Drawer` component */
export const DRAWER_WIDTH = 280;

/** Application-wide border radius for material components */
export const BORDER_RADIUS = 8;

/** Application-wide theme context */
export interface ThemeContext {
    /** Current theme mode */
    readonly mode: PaletteMode;
    /** Toggle the theme mode */
    readonly toggle: (mode?: PaletteMode) => void;
}

/** Application-wide theme provider context */
export const ThemeProviderContext = createContext<ThemeContext>({
    mode: "dark",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggle(_mode) {},
});

/** Theme context provider hook */
export const useThemeContext = () => useContext(ThemeProviderContext);

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>("dark");
    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            background: {
                // Brighter white for light mode, deeper dark for dark mode
                default: mode === "light" ? "#F7F6F3" : "#121212", // Softer light, deeper dark
                paper: mode === "light" ? "#FFFFFF" : "#1F1B24", // Lighter dark mode for paper
            },
            primary: {
                main: "#6750A4",
                light: mode === "light" ? "#7F67BE" : "#9570DE", // Slightly lighter shades for hover states
                dark: mode === "light" ? "#4B377A" : "#4A2C71", // Deeper and richer
                contrastText: "#FFFFFF", // Keep white text for contrast
            },
            secondary: {
                main: "#625B71", // Darker and more balanced
                light: mode === "light" ? "#918DA1" : "#A39DB5", // More subtle light shades
                dark: mode === "light" ? "#4D425F" : "#5B5268", // Richer dark for hover states
                contrastText: "#FFFFFF",
            },
            error: {
                main: "#D32F2F", // More standard error red
                light: mode === "light" ? "#FF6659" : "#E57373", // Brighter error in light mode
                dark: mode === "light" ? "#9A0007" : "#C62828", // More intense dark red
                contrastText: "#FFFFFF", // Keep white for readability
            },
        },
        breakpoints: {
            values: {
                xs: 320,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200
            }
        },
        typography: {
            fontFamily: geistSans.style.fontFamily,
            fontWeightBold: 700,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
        },
        shape: {
            borderRadius: BORDER_RADIUS,
        },
        components: {
            MuiAppBar: {
                defaultProps: {
                    color: "transparent",
                    elevation: 0,
                },
                styleOverrides: {
                    root: {
                        backdropFilter: "saturate(120%) blur(12px)",
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        borderRadius: BORDER_RADIUS,
                        backgroundColor: alpha(theme.palette.background.default, 0.9),
                        backdropFilter: "saturate(120%) blur(7px)",
                    })
                }
            },
            MuiDrawer: {
                styleOverrides: {
                    root: {
                        width: DRAWER_WIDTH,
                        height: "100vh",
                        flexShrink: 0,
                    },
                    paper: {
                        width: DRAWER_WIDTH,
                        borderRight: "none",
                        padding: 16,
                    }
                },
                defaultProps: {
                    anchor: "left",
                    elevation: 0,
                    variant: "temporary",
                }
            },
            MuiLink: {
                defaultProps: {
                    underline: "none",
                },
                styleOverrides: {
                    root: ({ theme }) => ({
                        color: theme.palette.primary.main,
                        "&:hover": {
                            color: theme.palette.primary.dark,
                        }
                    })
                }
            }
        }
    }), [mode]);

    const toggle = (mode?: PaletteMode) => {
        setMode(current => mode ? mode : current === "light" ? "dark" : "light");
    };

    return (
        <ThemeProviderContext.Provider value={{ mode, toggle }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeProviderContext.Provider>
    );
};

export default ThemeProvider;
