# Weather Intelligence App

## Overview
This repository contains a modern "Weather Intelligence App" featuring a clean SaaS-style dashboard, search module, 7-day forecast cards, and smart planning recommendations.

## 🚀 Cloudflare Pages Deployment (Web Version)
To guarantee a successful Cloudflare Pages deployment and avoid any build environment errors (`Missing entry-point`, `directory does not exist`, or `Asset too large`), **I have pre-built the web files into a `dist/` directory directly within this repository** and configured `wrangler.toml` to automatically use it.

When configuring Cloudflare Pages for this GitHub repository, simply use these settings:
- **Framework Preset**: `None`
- **Build Command**: *(Leave completely blank!)*
- **Build Output Directory**: `dist`

Because the `dist` folder now physically exists in the repository, Cloudflare will no longer fail looking for it, and you won't need to run any NPM build commands that might fail.

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
