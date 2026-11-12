import { beforeEach, describe, expect, it } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Link,
  MemoryRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router";

import DataModeBanner from "./DataModeBanner";
import GamesPage from "../../pages/GamesPage";
import { DataModeProvider } from "../../contexts/DataModeProvider";
import { useDataMode } from "../../hooks/useDataMode";
import useGameQueryStore from "../../store";
import { server } from "../../test/mocks/server";

const gamesURL = "https://api.rawg.io/api/games";

const liveGamesResponse = {
  count: 1,
  next: null,
  results: [
    {
      id: 1,
      slug: "the-witcher-3",
      name: "The Witcher 3",
      background_image: "",
      parent_platforms: [],
      metacritic: 92,
      rating_top: 5,
    },
  ],
};

function TestLayout() {
  const { dataMode } = useDataMode();
  const location = useLocation();

  return (
    <>
      <DataModeBanner />

      <div data-testid="data-mode">{dataMode}</div>
      <div data-testid="pathname">{location.pathname}</div>

      <Link to="/games/echoes-of-elyria">Open demo game</Link>

      <Outlet />
    </>
  );
}

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <DataModeProvider>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route element={<TestLayout />}>
              <Route index element={<GamesPage />} />
              <Route path="/games/:slug" element={<p>Game detail page</p>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </DataModeProvider>
    </QueryClientProvider>,
  );
}

function mockApiFailure(status = 503) {
  server.use(
    http.get(gamesURL, () =>
      HttpResponse.json({ error: "API unavailable" }, { status }),
    ),
  );
}

function mockApiSuccess() {
  server.use(http.get(gamesURL, () => HttpResponse.json(liveGamesResponse)));
}

beforeEach(() => {
  useGameQueryStore.getState().resetGameQuery();
});

describe("Demo Mode", () => {
  it("automatically switches to Demo Mode when the API fails", async () => {
    mockApiFailure();

    renderApp();

    expect(await screen.findByText(/Demo Mode:/i)).toBeInTheDocument();

    expect(screen.getByTestId("data-mode")).toHaveTextContent("demo");

    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("displays fictional games in Demo Mode", async () => {
    mockApiFailure();

    renderApp();

    expect(await screen.findByText("Echoes of Elyria")).toBeInTheDocument();

    expect(await screen.findByText("Neon Drift")).toBeInTheDocument();

    expect(screen.getByTestId("data-mode")).toHaveTextContent("demo");
  });

  it("stays in Demo Mode when Retry fails", async () => {
    mockApiFailure();

    const user = userEvent.setup();

    renderApp();

    await screen.findByText(/Demo Mode:/i);

    await user.click(screen.getByRole("button", { name: "Retry" }));

    await waitFor(() => {
      expect(screen.getByText(/Demo Mode:/i)).toBeInTheDocument();
    });

    expect(screen.getByTestId("data-mode")).toHaveTextContent("demo");

    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("returns home, resets filters and switches to Live Mode after successful Retry", async () => {
    mockApiFailure();

    const user = userEvent.setup();

    renderApp();

    await screen.findByText(/Demo Mode:/i);

    // Select filters while in Demo Mode.
    const store = useGameQueryStore.getState();

    act(() => {
      store.setGenreId(4);
      store.setPlatformId(1);
      store.setSortOrder("name");
    });

    // Navigate to a fictional game's detail URL.
    await user.click(screen.getByRole("link", { name: "Open demo game" }));

    expect(screen.getByTestId("pathname")).toHaveTextContent(
      "/games/echoes-of-elyria",
    );

    // Simulate RAWG becoming available again.
    mockApiSuccess();

    await user.click(screen.getByRole("button", { name: "Retry" }));

    await waitFor(() => {
      expect(screen.getByTestId("data-mode")).toHaveTextContent("live");
    });

    expect(screen.getByTestId("pathname")).toHaveTextContent("/");

    expect(useGameQueryStore.getState().gameQuery).toEqual({
      genreId: null,
      platformId: null,
      sortOrder: null,
    });

    expect(screen.queryByText(/Demo Mode:/i)).not.toBeInTheDocument();

    expect(await screen.findByText("The Witcher 3")).toBeInTheDocument();
  });

  it("does not switch to Demo Mode for a 401 error", async () => {
    mockApiFailure(401);

    renderApp();

    expect(
      await screen.findByText("Unable to load games."),
    ).toBeInTheDocument();

    expect(screen.getByTestId("data-mode")).toHaveTextContent("live");

    expect(screen.queryByText(/Demo Mode:/i)).not.toBeInTheDocument();
  });
});
