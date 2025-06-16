import { createTheme, type Theme } from "@mui/material/styles";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import createCache from "@emotion/cache";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#81c784", // light green
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff9800", // orange
      contrastText: "#fff",
    },
    background: {
      default: "#f9fdf9",
      paper: "#ffffff",
    },
    text: {
      primary: "#333",
    },
  },
  typography: {
    fontFamily: "'Rubik', 'Arial', sans-serif",
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "2rem",
          padding: "0.5rem 1.8rem",
          textTransform: "none",
          backgroundColor: "#a5d6a7", // even lighter green
          color: "#fff",
          transition: "all 0.3s ease",
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            backgroundColor: "#81c784", // darker on hover
            boxShadow: "0 5px 12px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
  },
});

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
