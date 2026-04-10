# 📱 DemoApp - Production-Ready React Native MVP

A robust, production-ready React Native (CLI) application demonstrating state-of-the-art mobile development patterns including navigation, global state management, offline persistence, and polished UI/UX.

## 🚀 Features

- **Dynamic Navigation**: Centralized Stack Navigation with Home, Detail, and Favorites views.
- **Global State Management**: Redux Toolkit (RTK) with Async Thunks for complex asynchronous logic.
- **Offline Persistence**: State rehydration using `redux-persist` and `AsyncStorage` (data survives app restarts).
- **Infinite Scrolling**: Automatic pagination using `FlatList` and DummyJSON API.
- **Debounced Search**: Optimized real-time filtering to minimize API load.
- **Boutique UI/UX**: 
  - Custom Design System (Indigo/Emerald theme).
  - Skeleton Shimmer Loader animations.
  - Pull-to-Refresh & Empty State handling.
  - Memoized components for 60FPS list performance.

## 📦 Tech Stack

- **Framework**: React Native (CLI)
- **Language**: TypeScript
- **State**: Redux Toolkit + Redux Persist
- **Navigation**: React Navigation (Native Stack)
- **Networking**: Axios
- **Persistence**: @react-native-async-storage/async-storage
- **Testing**: Jest

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (>= 22)
- Android Studio & SDK Configured
- macOS (for iOS builds)

### Installation
1. **Clone the repo**
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Storage Fix (Optional)**:
   If your emulator reports "Insufficient Storage", run:
   ```bash
   emulator -avd <Your_AVD_Name> -wipe-data
   ```

### Running the App
**Android**:
```bash
npx react-native run-android
```

**Metro Bundler (Resetting Cache)**:
If you encounter module resolution errors, start Metro with:
```bash
npx react-native start --reset-cache
```

## 🏗️ Architecture (`src/`)

- **/components**: Reusable UI (ProductCard, Skeleton, EmptyState).
- **/screens**: Top-level route components.
- **/navigation**: Routing & Navigator configuration.
- **/store**: Redux slices and root store config.
- **/services**: API layer and network configuration.
- **/utils**: Design tokens (theme) and helper functions.

## 🧪 Testing

The project contains a foundation for unit testing logic:
```bash
npm test
```
- `dataSlice.test.ts`: Verifies Redux state transitions.
- `api.test.ts`: Ensures network layer integrity.

---

*Built with ❤️ by Antigravity AI*
