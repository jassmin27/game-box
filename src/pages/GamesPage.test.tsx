import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse, delay } from "msw";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import GamesPage from "./GamesPage";
import NotFoundPage from "./NotFoundPage";
import { server } from "../test/mocks/server";
import { renderWithProviders } from "../test/utils/renderWithProviders";

const gamesURL = "https://api.rawg.io/api/games";

const mockGames = [
  {
    id: 1,
    slug: "the-witcher-3",
    name: "The Witcher 3",
    background_image: "",
    parent_platforms: [],
    metacritic: 92,
    rating_top: 5,
  },
  {
    id: 2,
    slug: "cyberpunk-2077",
    name: "Cyberpunk 2077",
    background_image: "",
    parent_platforms: [],
    metacritic: 86,
    rating_top: 4,
  },
];

const gamesResponse = (results = mockGames, next: string | null = null) => ({
  count: results.length,
  next,
  previous: null,
  results,
});

// Test-only component to verify navigation.
function LocationDisplay() {
  const location = useLocation();

  return <p>Current path: {location.pathname}</p>;
}

// Renders GameBox with the routes required for navigation tests.
function renderWithRoutes(initialRoute = "/") {
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
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<GamesPage />} />
          <Route path="/games/:slug" element={<LocationDisplay />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("Game discovery", () => {
  it("displays games returned by the API", async () => {
    // Open homepage → fetch games → display game cards.
    renderWithProviders(<GamesPage />);

    expect(await screen.findByText("The Witcher 3")).toBeInTheDocument();

    expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
  });

  it("shows skeletons while games are loading", async () => {
    // Delay API response → show loading status → display games.
    server.use(
      http.get(gamesURL, async () => {
        await delay(300);
        return HttpResponse.json(gamesResponse());
      }),
    );

    renderWithProviders(<GamesPage />);

    expect(
      screen.getByRole("status", { name: "Loading games" }),
    ).toBeInTheDocument();

    expect(await screen.findByText("The Witcher 3")).toBeInTheDocument();

    expect(
      screen.queryByRole("status", { name: "Loading games" }),
    ).not.toBeInTheDocument();
  });

  it("shows an empty state when no games are found", async () => {
    // API returns empty results → display empty state.
    server.use(
      http.get(gamesURL, () => {
        return HttpResponse.json(gamesResponse([]));
      }),
    );

    renderWithProviders(<GamesPage />);

    expect(await screen.findByText("No games found.")).toBeInTheDocument();
  });

  it("shows an error when loading games fails", async () => {
    // API returns 500 → display error and Retry button.
    server.use(
      http.get(gamesURL, () => {
        return HttpResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
      }),
    );

    renderWithProviders(<GamesPage />);

    expect(
      await screen.findByText("Unable to load games."),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
  });

  it("retries loading games successfully", async () => {
    // First request fails → click Retry → games appear.
    let requestCount = 0;

    server.use(
      http.get(gamesURL, () => {
        requestCount++;

        if (requestCount === 1) {
          return HttpResponse.json({ error: "Server Error" }, { status: 500 });
        }

        return HttpResponse.json(gamesResponse());
      }),
    );

    const user = userEvent.setup();

    renderWithProviders(<GamesPage />);

    expect(
      await screen.findByText("Unable to load games."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(await screen.findByText("The Witcher 3")).toBeInTheDocument();

    expect(screen.queryByText("Unable to load games.")).not.toBeInTheDocument();
  });
});

describe("Game search", () => {
  it("displays games matching a search term", async () => {
    // Open search URL → API receives term → display results.
    let requestedSearch: string | null = null;

    server.use(
      http.get(gamesURL, ({ request }) => {
        requestedSearch = new URL(request.url).searchParams.get("search");

        return HttpResponse.json(gamesResponse([mockGames[0]]));
      }),
    );

    renderWithProviders(<GamesPage />, "/?search=witcher");

    expect(await screen.findByText("The Witcher 3")).toBeInTheDocument();

    expect(requestedSearch).toBe("witcher");

    expect(
      screen.queryByRole("combobox", { name: "Sort games" }),
    ).not.toBeInTheDocument();
  });

  it("shows an empty state for a search with no matches", async () => {
    // Search for unknown game → API returns empty results.
    server.use(
      http.get(gamesURL, () => {
        return HttpResponse.json(gamesResponse([]));
      }),
    );

    renderWithProviders(<GamesPage />, "/?search=unknown-game");

    expect(await screen.findByText("No games found.")).toBeInTheDocument();
  });
});

describe("Game pagination", () => {
  it("loads additional games when Load More is clicked", async () => {
    // Page 1 loads → click Load More → append page 2.
    server.use(
      http.get(gamesURL, ({ request }) => {
        const page = new URL(request.url).searchParams.get("page");

        if (page === "1") {
          return HttpResponse.json(
            gamesResponse([mockGames[0]], `${gamesURL}?page=2`),
          );
        }

        if (page === "2") {
          return HttpResponse.json(gamesResponse([mockGames[1]]));
        }

        return HttpResponse.json({ error: "Unexpected page" }, { status: 400 });
      }),
    );

    const user = userEvent.setup();

    renderWithProviders(<GamesPage />);

    expect(await screen.findByText("The Witcher 3")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Load More" }));

    expect(await screen.findByText("Cyberpunk 2077")).toBeInTheDocument();

    expect(screen.getByText("The Witcher 3")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Load More" }),
    ).not.toBeInTheDocument();
  });

  it("hides Load More when no additional pages exist", async () => {
    // API returns next = null → Load More is hidden.
    renderWithProviders(<GamesPage />);

    expect(await screen.findByText("The Witcher 3")).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Load More" }),
    ).not.toBeInTheDocument();
  });
});

describe("Game navigation", () => {
  it("opens the correct game details route", async () => {
    // Load games → click Witcher → navigate to its details URL.
    const user = userEvent.setup();

    renderWithRoutes();

    const gameLink = await screen.findByRole("link", {
      name: /the witcher 3/i,
    });

    expect(gameLink).toHaveAttribute("href", "/games/the-witcher-3");

    await user.click(gameLink);

    expect(
      await screen.findByText("Current path: /games/the-witcher-3"),
    ).toBeInTheDocument();
  });

  it("opens the correct route for another game", async () => {
    // Click Cyberpunk 2077 → navigate to its own details URL.
    const user = userEvent.setup();

    renderWithRoutes();

    const gameLink = await screen.findByRole("link", {
      name: /cyberpunk 2077/i,
    });

    await user.click(gameLink);

    expect(
      screen.getByText("Current path: /games/cyberpunk-2077"),
    ).toBeInTheDocument();
  });

  it("displays the Not Found page for an unknown route", () => {
    // Open an invalid URL → display 404 page.
    renderWithRoutes("/unknown-page");

    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();

    expect(
      screen.getByText(/Whoops!.*We couldn't find that page\./s),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Back to Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
