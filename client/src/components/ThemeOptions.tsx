import { ThemeOptions } from "@mui/material/styles";

//This is a custom Theme for the application

//primary: beige/pinkish tones
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
    info: {
      main: "rgb(23, 35, 28)",
      light: "rgba(212, 163, 115, 0.8)",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0",
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "0",
        },
      },
    },
  },
};
