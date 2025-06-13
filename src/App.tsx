import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./components/pages/Home";
import { GroupArrange } from "./components/pages/GroupArrange";
import { cacheRtl } from "./themeCreate";
import { CacheProvider } from "@emotion/react";

export default function App() {
  return (
    <CacheProvider value={cacheRtl}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="groupArrange" element={<GroupArrange />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </CacheProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
