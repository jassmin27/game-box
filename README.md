# GameBox 🎮

A **RAWG.io–inspired game discovery app** built with **React and TypeScript**, focused on clean data fetching and a smooth browsing experience across devices.

This project was built primarily to practice **React fundamentals, hooks, API integration, and component-based architecture**.


<table>
  <tr>
    <td><img src="src/assets/screenshot-home.png" alt="Home Page" width="600"/></td>
    <td><img src="src/assets/screenshot-mobile.png" alt="Mobile Home Page" width="200"/></td>
  </tr>
</table>

Live demo: [https://game-box-omega.vercel.app](https://game-box-omega.vercel.app)<br>
Source code: [https://github.com/jassmin27/game-box](https://github.com/jassmin27/game-box)

## Features

* Search games by name
* Filter by genre and platform
* Sort games by different criteria
* Dark / Light theme toggle (persisted in localStorage)
* Responsive layout across devices
  * Desktop: sidebar genre list
  * Mobile: bottom horizontal genre list
* Loading skeletons for better UX
* Error handling and request cancellation

## Tech Stack

* React 18
* TypeScript
* Axios
* RAWG Video Games Database API
* CSS Modules
* react-loading-skeleton

## Architecture & Key Concepts

* Centralized filter and search state (single source of truth) in `App.tsx`
* `GameQuery` object to model and manage filter state
* CSS Modules and theme-aware CSS variables
* Shared TypeScript domain models for consistent, type-safe data handling
* Custom hooks for data fetching (`useGames`, `useGenres`)
* Axios API client with request cancellation
* Responsive UI without UI libraries
* Reusable, well-scoped components

## Project Structure (Simplified)

```
src/
├── assets/       # images and media
├── components/   # presentational and container components
├── hooks/        # custom hooks for API calls and state
├── services/     # API client and utilities
├── App.tsx       # main container and state
├── main.tsx      # app entry point
└── types.ts      # shared TypeScript types
```

## Notes

This project was built as a learning exercise to reinforce practical React patterns, clean component architecture, and state management in a real-world API-driven application.