import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactElement } from "react";
import { DataModeProvider } from "../../contexts/DataModeProvider";

export function renderWithProviders(ui: ReactElement, initialRoute = "/") {
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
        <MemoryRouter initialEntries={[initialRoute]}>{ui}</MemoryRouter>
      </DataModeProvider>
    </QueryClientProvider>,
  );
}
