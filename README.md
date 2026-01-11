# SafeCoast

AI-powered coastal safety monitoring and community reporting system for India.

## Features

- 🗺️ Real-time hazard map with severity indicators
- 📝 Community hazard reporting with AI verification
- 📊 Analytics dashboard with trends and insights
- 🔔 Push notifications for hazard alerts
- 📱 Progressive Web App (PWA) support
- 🔐 Google Sign-In authentication

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v4
- NextAuth.js
- Zustand (State Management)
- Leaflet (Maps)

## License

© 2026 SafeCoast. All rights reserved.
