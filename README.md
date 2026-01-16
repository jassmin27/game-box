# GameBox 🎮

A **RAWG.io–inspired game discovery app** that lets users browse, search, filter, and sort video games across genres and platforms, with support for dark and light themes and a mobile-friendly layout.

This project was built as a hands-on exercise to practice **React and TypeScript**, with a focus on **centralized state management, built-in and custom hooks, API integration, and reusable component architecture** in a real-world, API-driven application.
<br><br>

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

## Possible Improvements

* Add pagination or infinite scrolling
* Add game detail pages
* Improve accessibility

---

**Built as a React learning project**

---