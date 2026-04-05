import { Station, View } from './types';

export const STATIONS: Record<string, Station> = {
  skyz: {
    id: 'skyz',
    name: "Skyz Metro FM",
    freq: "100.3 FM",
    tagline: "The Soul of Bulawayo",
    location: "Bulawayo, Zimbabwe",
    desc: "Bulawayo's first commercial radio station, focusing on urban culture, local news, and the heartbeat of Matabeleland.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2672&auto=format&fit=crop",
    streamUrl: "https://stream.zeno.fm/2634b6n4qy8uv",
    gallery: [],
    hosts: [],
    shows: []
  },
  breeze: {
    id: 'breeze',
    name: "Breeze FM",
    freq: "91.2 FM",
    tagline: "Voices of the Falls",
    location: "Victoria Falls, Zimbabwe",
    desc: "Serving the resort town of Victoria Falls and the Hwange district with tourism updates, community news, and multi-lingual broadcasting.",
    image: "https://images.unsplash.com/photo-1478737270239-2fccd2700fe9?q=80&w=2670&auto=format&fit=crop",
    streamUrl: "https://stream.zeno.fm/ay9at6c7028uv",
    gallery: [],
    hosts: [],
    shows: []
  }
};

export const NAV_ITEMS: { label: string, view: View }[] = [
  { label: 'Home', view: 'home' },
  { label: 'About Us', view: 'about' },
  { label: 'News', view: 'news' },
  { label: 'Contact', view: 'contact' },
];
