import { http, HttpResponse } from "msw/http";
import { delay } from "msw/utils/delay";

const baseURL = "https://api.rawg.io/api";

export const handlers = [
  // Mock games
  http.get(`${baseURL}/games`, async () => {
    await delay();

    return HttpResponse.json({
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          id: 1,
          slug: "the-witcher-3",
          name: "The Witcher 3",
        },
        {
          id: 2,
          slug: "cyberpunk-2077",
          name: "Cyberpunk 2077",
        },
      ],
    });
  }),

  // Mock genres
  http.get(`${baseURL}/genres`, () => {
    return HttpResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          id: 4,
          name: "Action",
          slug: "action",
        },
      ],
    });
  }),

  // Mock parent platforms
  http.get(`${baseURL}/platforms/lists/parents`, () => {
    return HttpResponse.json({
      count: 2,
      next: null,
      previous: null,
      results: [
        {
          id: 1,
          name: "PC",
          slug: "pc",
        },
        {
          id: 2,
          name: "PlayStation",
          slug: "playstation",
        },
      ],
    });
  }),
];
