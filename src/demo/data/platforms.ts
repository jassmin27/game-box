import type { Platform } from "../../types";

export const PC: Platform = {
  id: 1,
  name: "PC",
  slug: "pc",
};

export const PLAYSTATION: Platform = {
  id: 2,
  name: "PlayStation",
  slug: "playstation",
};

export const XBOX: Platform = {
  id: 3,
  name: "Xbox",
  slug: "xbox",
};

export const IOS: Platform = {
  id: 4,
  name: "iOS",
  slug: "ios",
};

export const demoPlatforms: Platform[] = [PC, PLAYSTATION, XBOX, IOS];
