import { ThemeOptions } from "@mui/material/styles";

//primary: beige/terracotta tones
//secondary: pastel green tones

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: "Urbanist, sans-serif",
  },
  palette: {
    mode: "light",
    primary: {
      main: "rgba(212, 163, 115, 0.8)",
      light: "rgba(212, 163, 115, 0.5)",
      dark: "rgba(212, 163, 115, 1)",
    },
    secondary: {
      main: "rgba(204, 213, 174, 1)",
      light: "rgba(204, 213, 174, 0.7)",
      dark: "rgba(184, 193, 154, 1)",
    },
  },
};
