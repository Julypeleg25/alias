import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./components/pages/Home";
import { GroupArrange } from "./components/pages/GroupArrange";
import { cacheRtl, theme } from "./themeCreate";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import { Game } from "./components/pages/MainGame";
import { Cards } from "./components/Cards";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="groupArrange" element={<GroupArrange />} />
              <Route path="game" element={<Game />} />
              <Route path="cards" element={<Cards />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </CacheProvider>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
