# Weather Intelligence App

## Overview
This repository contains a modern "Weather Intelligence App" featuring a clean SaaS-style dashboard, search module, 7-day forecast cards, and smart planning recommendations.

## 🚀 Cloudflare Pages Deployment (Web Version)

To guarantee a successful Cloudflare Pages deployment and avoid any build environment errors (`Missing entry-point`, `directory does not exist`, or `Asset too large`), the project has been fully restructured as a standard Vite Single Page Application (SPA).

When configuring Cloudflare Pages for this GitHub repository, simply use these settings:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`

Because `wrangler.toml` and worker configurations have been completely removed, Cloudflare Pages will build the static frontend perfectly without attempting to deploy a Cloudflare Worker.

## 📱 Android Version (AI Studio Native)
*Note: This repository was originally generated in AI Studio as an Android application using Kotlin and Jetpack Compose. The Android source code is safely preserved in the `/app` directory.*
- If you are running this inside AI Studio, you will see the Android app running in the Streaming Emulator. 
- You can build the Android APK via Gradle: `./gradlew assembleDebug`

## API Usage
Both the Web and Android apps connect directly to the client-side public APIs:
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`
No custom API keys or GCP billing are required for weather functionality.
