# 🌻 Sunflower Weather

A weather application built with Next.js

[![Vercel](https://vercelbadge.vercel.app/api/kadanersWorkspace/sunflower-weather)](https://sunflower-weather.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 📦 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Package Manager**: npm

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sunflower-weather
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will automatically redirect to the dashboard page (`/dashboard`).

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Writing Tests

Tests are located alongside components with `.test.tsx` extension:

```tsx
import { render, screen } from "@/test-utils";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

## 🎨 Styling

The project uses Tailwind CSS for styling. Global styles are in `src/app/globals.css`.

## 🔧 Configuration

- **Next.js**: `next.config.ts`
- **TypeScript**: `tsconfig.json`
- **ESLint**: `eslint.config.mjs`
- **Jest**: `jest.config.js`

## 📄 License

This project is licensed under the MIT License.
