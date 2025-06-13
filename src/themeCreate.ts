import { createTheme, type Theme } from "@mui/material/styles";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import createCache from "@emotion/cache";

export const theme = (outerTheme: Theme) =>
  createTheme({
    direction: "rtl",
    palette: {
      mode: outerTheme.palette.mode,
    },
  });

export const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
