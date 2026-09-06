import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import GamesPage from "./pages/GamesPage.tsx";
import GameDetailPage from "./pages/GameDetailPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<GamesPage />} />
            <Route path="games/:slug" element={<GameDetailPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
