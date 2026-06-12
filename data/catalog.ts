export type Category =
  | "Movies"
  | "Short Films"
  | "Assamese Content"
  | "AI Movies"
  | "Documentaries";

export type Title = {
  id: string;
  name: string;
  year: number;
  rating: string;
  duration: string;
  category: Category;
  genres: string[];
  description: string;
  accent: [string, string, string];
  featured?: boolean;
  progress?: number;
};

export const categories: Category[] = [
  "Movies",
  "Short Films",
  "Assamese Content",
  "AI Movies",
  "Documentaries",
];

export const catalog: Title[] = [
  {
    id: "red-horizon",
    name: "Red Horizon",
    year: 2026,
    rating: "U/A 13+",
    duration: "2h 08m",
    category: "Movies",
    genres: ["Sci-Fi", "Drama"],
    description: "When the sky turns crimson, one astronomer discovers a signal that could rewrite humanity's future.",
    accent: ["#541017", "#050505", "#dd2632"],
    featured: true,
  },
  {
    id: "river-song",
    name: "River Song",
    year: 2025,
    rating: "U",
    duration: "1h 47m",
    category: "Assamese Content",
    genres: ["Drama", "Music"],
    description: "A gifted singer returns to her village and finds an old melody waiting to be completed.",
    accent: ["#103334", "#050809", "#d3a74e"],
    progress: 62,
  },
  {
    id: "zero-hour",
    name: "Zero Hour",
    year: 2026,
    rating: "U/A 16+",
    duration: "1h 55m",
    category: "AI Movies",
    genres: ["Thriller", "AI"],
    description: "An autonomous city has sixty minutes to decide whether its creator is a threat.",
    accent: ["#1c1248", "#04040a", "#805cff"],
  },
  {
    id: "wild-assam",
    name: "Wild Assam",
    year: 2024,
    rating: "U",
    duration: "52m",
    category: "Documentaries",
    genres: ["Nature", "Travel"],
    description: "An intimate journey through the wetlands, forests and resilient wildlife of Assam.",
    accent: ["#16381e", "#050805", "#e9a83d"],
    progress: 31,
  },
  {
    id: "after-rain",
    name: "After the Rain",
    year: 2025,
    rating: "U/A 13+",
    duration: "24m",
    category: "Short Films",
    genres: ["Romance", "Drama"],
    description: "Two strangers share a bus shelter, a cup of tea and a moment neither expected.",
    accent: ["#183143", "#060707", "#e18e6c"],
  },
  {
    id: "brahmaputra",
    name: "Brahmaputra",
    year: 2025,
    rating: "U",
    duration: "1h 14m",
    category: "Documentaries",
    genres: ["Culture", "Nature"],
    description: "The stories carried by one of Asia's great rivers, told by the people along its banks.",
    accent: ["#15334a", "#050709", "#6cc8db"],
  },
  {
    id: "memory-code",
    name: "Memory Code",
    year: 2026,
    rating: "U/A 16+",
    duration: "1h 42m",
    category: "AI Movies",
    genres: ["Mystery", "Sci-Fi"],
    description: "A memory architect finds a hidden message inside a client's impossible childhood.",
    accent: ["#33123d", "#050407", "#ee4cc9"],
  },
  {
    id: "the-mask-maker",
    name: "The Mask Maker",
    year: 2024,
    rating: "U/A 13+",
    duration: "18m",
    category: "Short Films",
    genres: ["Culture", "Drama"],
    description: "An apprentice races to finish his first traditional mask before the village festival.",
    accent: ["#4a2411", "#070504", "#efb449"],
  },
  {
    id: "midnight-ferry",
    name: "Midnight Ferry",
    year: 2025,
    rating: "U/A 16+",
    duration: "1h 39m",
    category: "Assamese Content",
    genres: ["Mystery", "Drama"],
    description: "The final ferry of the night carries one passenger who should not exist.",
    accent: ["#102838", "#040607", "#7dbbd5"],
  },
  {
    id: "orbit-seven",
    name: "Orbit Seven",
    year: 2026,
    rating: "U/A 13+",
    duration: "2h 01m",
    category: "Movies",
    genres: ["Adventure", "Sci-Fi"],
    description: "A salvage crew discovers an abandoned station still broadcasting a human heartbeat.",
    accent: ["#261a44", "#050407", "#ef735b"],
  },
  {
    id: "the-last-letter",
    name: "The Last Letter",
    year: 2025,
    rating: "U",
    duration: "29m",
    category: "Short Films",
    genres: ["Family", "Drama"],
    description: "A postman delivers one final letter to a house that has been empty for years.",
    accent: ["#43331e", "#070605", "#e2c484"],
  },
  {
    id: "tea-country",
    name: "Tea Country",
    year: 2024,
    rating: "U",
    duration: "46m",
    category: "Assamese Content",
    genres: ["Culture", "Documentary"],
    description: "Generations of workers reveal the craft and community behind Assam's tea gardens.",
    accent: ["#23391a", "#050705", "#b9d46b"],
  },
];

