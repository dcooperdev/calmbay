<div align="center">

# ⛵ Calmbay

**A browser-based boating game built with React, PixiJS and Firebase.**

Take the helm, open the throttle and steer your vessel across the bay, using either the keyboard or a gamepad.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![PixiJS](https://img.shields.io/badge/PixiJS-8-E72264?logo=pixiv&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Hosting-FFCA28?logo=firebase&logoColor=black)

</div>

---

## ✨ Features

- 🚤 **Arcade boat physics**: acceleration, drag, a top speed, half-speed reverse and steering with angular momentum.
- 🎮 **Keyboard and gamepad input**: WASD controls plus analog stick support with a configurable dead zone.
- 🔐 **Authentication**: email/password sign-in through Firebase Auth, with protected routes.
- 🧭 **Menu flow**: Login → Main Menu → Play / Profile / Settings.
- 🖼️ **Fullscreen WebGL canvas**: rendered with PixiJS 8, resizes with the window.
- 🚀 **CI/CD**: automatic deploys to Firebase Hosting on every push to `main`, plus preview channels for pull requests.

> 🚧 **Work in progress.** The boat is a placeholder rectangle for now, and the Profile and Settings pages are still stubs.

---

## 🎮 Controls

| Action          | Keyboard | Gamepad                 |
| --------------- | :------: | ----------------------- |
| Throttle ahead  |   `W`    | Left stick ↑            |
| Reverse         |   `S`    | Left stick ↓            |
| Steer left      |   `A`    | Left stick ←            |
| Steer right     |   `D`    | Left stick →            |

The boat keeps a small minimum speed while you steer, so it can always turn from a standstill.

---

## 🛠️ Tech Stack

| Layer      | Technology                                             |
| ---------- | ------------------------------------------------------ |
| UI         | [React 19](https://react.dev) + CSS Modules            |
| Routing    | [React Router 7](https://reactrouter.com)              |
| Rendering  | [PixiJS 8](https://pixijs.com)                         |
| Language   | [TypeScript](https://www.typescriptlang.org)           |
| Build tool | [Vite](https://vite.dev)                               |
| Backend    | [Firebase](https://firebase.google.com) (Auth, Firestore, Hosting) |
| Quality    | ESLint + Husky pre-commit hooks                        |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 20+ and npm
- A Firebase project with **Email/Password** authentication enabled

### 1. Clone and install

```bash
git clone <your-repo-url> calmbay
cd calmbay
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root with your Firebase web app credentials:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 3. Run the dev server

```bash
npm run dev
```

Then open the URL that Vite prints (usually http://localhost:5173) and sign in with a user from your Firebase project.

---

## 📜 Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR             |
| `npm run build`   | Type-check and build for production (`dist/`) |
| `npm run preview` | Serve the production build locally           |
| `npm run lint`    | Run ESLint on the whole project               |

> 🪝 A **Husky pre-commit hook** runs `lint` and `build`, so a commit only goes through if both pass.

---

## 🗂️ Project Structure

```
src/
├── components/        # React pages (Login, MainMenu, Play, Profile, Settings) + ProtectedRoute
├── context/           # AuthContext & AuthProvider (Firebase auth state)
├── game/              # Game engine logic
│   ├── boat.ts        #   Boat entity: movement physics & rendering
│   ├── input.ts       #   Keyboard + gamepad input → { throttle, steering }
│   └── world.ts       #   World container that owns and updates entities
├── constants/         # Tunables: vessel config, dead zone, colors
├── services/          # Firebase initialization
├── types/             # Shared TypeScript types (InputState, Position, VesselConfig)
├── utils/             # Helpers (clamp)
├── App.tsx            # Route definitions
└── main.tsx           # App entry point
```

---

## ⚙️ How the Game Loop Works

```
PlayPage ──► PixiJS Application ──► ticker (every frame)
                                       │
                                       ▼
                                 World.update(delta)
                                       │
                                       ▼
                                 Boat.update(delta) ◄── getInput()  (keyboard + gamepad)
```

1. `PlayPage` creates a PixiJS `Application` that fills the window and attaches its canvas.
2. A `Boat` is spawned at the center of the screen and added to a `World`.
3. On every tick, `World.update()` calls `Boat.update()` with the frame delta.
4. The boat reads the current input, applies acceleration and drag to its linear and angular speed, then moves its sprite along its heading.

### Tuning the vessel

Boat handling is driven by a `VesselConfig` defined in [`src/constants/constants.ts`](src/constants/constants.ts):

```ts
export const VESSEL_CONFIG: VesselConfig = {
    acceleration: 0.05,     // speed gained per tick at full throttle
    drag: 0.02,             // speed lost per tick when coasting
    maxSpeed: 3,            // top forward speed (reverse is capped at half)
    turnMaxSpeed: 0.03,     // max angular velocity (radians/tick)
    turnAcceleration: 0.005,
    turnDrag: 0.005,
    minTurnSpeed: 0.5       // minimum forward speed while steering
};
```

You can pass a custom config to `new Boat(position, config)` to create vessels that handle differently.

---

## ☁️ Deployment

The project deploys to **Firebase Hosting** through GitHub Actions:

- **Push to `main`**: builds and deploys to the live channel.
- **Pull request**: builds and deploys to a temporary preview channel.

Both workflows read the `VITE_FIREBASE_*` variables from **GitHub repository secrets**, so add them there before you deploy.

To deploy by hand:

```bash
npm run build
npx firebase deploy --only hosting
```

---

## 🗺️ Roadmap

- [ ] Replace the placeholder boat with a sprite
- [ ] Water, coastline and a scrolling camera
- [ ] Profile page backed by Firestore
- [ ] Settings (controls, audio, graphics)
- [ ] Multiple vessel types with different configs

---

<div align="center">

Made with ☕ and 🌊 by **David Cooper**

</div>
