# GameBox 🎮

A **[RAWG.io](https://rawg.io/)-inspired game discovery app** that lets users browse, search, filter, and sort video games across genres and platforms, with dark/light theme support and a responsive layout.

GameBox is built with **React and TypeScript**, using **Zustand for client-side state management**, **TanStack React Query for server state and caching**, and the **RAWG API** for game data.
<br><br>

<table>
  <tr>
    <td><img src="src/assets/screenshot-home.png" alt="Home Page" width="600"/></td>
    <td><img src="src/assets/screenshot-mobile.png" alt="Mobile Home Page" width="200"/></td>
  </tr>
</table>

Live demo: https://game-box-omega.vercel.app

## Features

- **Search** games by name
- **Filter** by genre and platform
- **Sort** games by different criteria
- **Dark / Light theme toggle** (persisted in localStorage)
- **Responsive layout** across devices
  - Desktop: sidebar genre list
  - Mobile: bottom horizontal genre list
- **Loading skeletons** for better UX
- **Error handling** and request cancellation

## Tech Stack

- React 18
- TypeScript
- Zustand
- TanStack React Query
- Axios
- RAWG Video Games Database API
- CSS Modules
- react-loading-skeleton

## Architecture & Key Concepts

- **Centralized client state management** with Zustand for search, genre, platform, and sorting selections
- **Server state management** with TanStack React Query for fetching and caching games, genres, and platforms
- **Custom hooks** (`useGames`, `useGenres`, `usePlatforms`) to encapsulate data fetching logic
- **Type-safe data handling** with shared TypeScript types
- **Reusable components** with CSS Modules and theme-aware variables

## Project Structure (Simplified)

```text
src/
├── assets/       # images and media
├── components/   # presentational and container components
├── hooks/        # custom data-fetching hooks
├── services/     # API client and utilities
├── store.ts      # Zustand game query store
├── App.tsx       # main application layout
├── main.tsx      # app entry point
└── types.ts      # shared TypeScript types
```

## Possible Improvements

- Add pagination or infinite scrolling
- Add game detail pages
- Improve accessibility
