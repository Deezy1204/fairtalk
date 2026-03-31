# Fairtalk Communications - Project Context

## Project Overview
Fairtalk Communications is a modern corporate media website homepage for a Zimbabwean broadcasting company. It is a React-based single-page application (SPA) designed to showcase the company's radio stations, featured shows, and corporate values, featuring a live radio player interface.

### Main Technologies
- **Frontend Framework:** React 19 (TypeScript)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Animations:** Motion (formerly Framer Motion)
- **Icons:** Lucide React
- **AI Integration:** Google Generative AI (`@google/genai`) - available for AI-powered interactions.

### Architecture
The application currently uses a centralized structure with key UI components co-located in `src/App.tsx`:
- `Navbar`: Global navigation and primary CTA.
- `Hero`: Dynamic slider for featured stations and announcements.
- `WhyChooseUs`: Corporate overview and statistics.
- `Stations`: Interactive grid of broadcasting channels (Skyz Metro FM, Breeze FM, etc.).
- `Shows`: Featured programming highlights.
- `Steps`: User guide for the platform.
- `RadioPlayer`: A floating, state-managed audio player interface.

---

## Building and Running

### Prerequisites
- Node.js installed on your system.

### Commands
| Command | Description |
| :--- | :--- |
| `npm install` | Installs project dependencies. |
| `npm run dev` | Starts the Vite development server on port 3000. |
| `npm run build` | Builds the application for production. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs TypeScript type checking. |
| `npm run clean` | Removes the `dist` directory. |

---

## Development Conventions

### Styling & Layout
- **Tailwind CSS 4:** Uses the latest Tailwind version with `@import "tailwindcss"` in `src/index.css`.
- **Responsive Design:** Mobile-first approach using Tailwind's responsive prefixes (`md:`, `lg:`).
- **Aesthetics:** Uses a clean, professional palette (Slate and Steel Blue `#8FA3B4`).

### State Management
- **React Hooks:** Uses `useState` and `useEffect` for local UI state (player visibility, active station, slider animations).
- **Motion:** Utilizes `AnimatePresence` and `motion` components for smooth transitions and interactive elements.

### Environment Configuration
- **Gemini API Key:** Requires `GEMINI_API_KEY` to be set in a `.env` or `.env.local` file. This is exposed to the application via `vite.config.ts` as `process.env.GEMINI_API_KEY`.

### Best Practices
- **Componentization:** While currently in `App.tsx`, complex sub-components should be moved to a `src/components` directory if expanded.
- **Type Safety:** Strict TypeScript usage for props and state.
- **Image Assets:** External images are currently sourced from Unsplash with `referrerPolicy="no-referrer"`.
