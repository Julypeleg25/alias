import { createTheme, type Theme } from "@mui/material/styles";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import createCache from "@emotion/cache";

export const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: "'Assistant', sans-serif", // or 'Rubik', etc.
  },
  palette: {
    primary: {
      main: "#cd2c56", // Example primary color
      contrastText: "#000", // Example contrast text color
    },
    secondary: {
      main: "#f2af8e", // Example secondary color 
      contrastText: "#000", // Example contrast text color
    },
    background: {
      default: "#f2af8e", // Example background color
      paper: "#ededed", // Example paper color
    },
    text: {
      primary: "#000", // Example primary text color  
    },
    error: {
      main: "#d32f2f", // Example error color
      contrastText: "#fff", // Example contrast text color for error
  }
}

});

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
