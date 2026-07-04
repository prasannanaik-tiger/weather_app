# Weather Intelligence App

## Overview
This repository contains a modern "Weather Intelligence App" featuring a clean SaaS-style dashboard, search module, 7-day forecast cards, and smart planning recommendations.

## 🚀 Cloudflare Pages Deployment (Web Version)
To resolve the Cloudflare `Could not detect a directory containing static files` error, **a web-compatible SPA (Single Page Application) has been added to the root of this repository.**

When configuring Cloudflare Pages for this GitHub repository:
- **Framework Preset**: `Vite` (or `None`)
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`

Cloudflare will automatically detect the `package.json` and `index.html` at the root and build the static frontend.

## 📱 Android Version (AI Studio Native)
*Note: This repository was originally generated in AI Studio as an Android application using Kotlin and Jetpack Compose. The Android source code is safely preserved in the `/app` directory.*
- If you are running this inside AI Studio, you will see the Android app running in the Streaming Emulator. 
- You can build the Android APK via Gradle: `./gradlew assembleDebug`

## API Usage
Both the Web and Android apps connect directly to the client-side public APIs:
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`
No custom API keys or GCP billing are required for weather functionality.
