# Weather Intelligence App

## Overview
This repository contains a modern "Weather Intelligence App" featuring a clean SaaS-style dashboard, search module, 7-day forecast cards, and smart planning recommendations.

## 🚀 Cloudflare Pages Deployment (Web Version)

⚠️ **CRITICAL: You are seeing a "workers.dev" error because Cloudflare is trying to deploy this as a Worker instead of a Pages project.**

To deploy this static website correctly, you must use **Cloudflare Pages**, not Cloudflare Workers.

### Step-by-Step Instructions for Cloudflare Dashboard:
1. Log into your Cloudflare Dashboard.
2. Go to **Workers & Pages** in the left sidebar.
3. Click the **Create application** button.
4. **IMPORTANT**: Click on the **Pages** tab at the top (Do *not* stay on the Workers tab).
5. Click **Connect to Git** and select this repository.
6. In the build settings, use these EXACT configurations:
   - **Framework Preset**: `None`
   - **Build Command**: *(Leave completely blank!)*
   - **Build Output Directory**: `public`

Because the `public` folder physically exists in the repository, Cloudflare Pages will deploy its contents directly without needing to run any complex build commands, and you will not get any `workers.dev` subdomain errors.

## 📱 Android Version (AI Studio Native)
*Note: This repository was originally generated in AI Studio as an Android application using Kotlin and Jetpack Compose. The Android source code is safely preserved in the `/app` directory.*
- If you are running this inside AI Studio, you will see the Android app running in the Streaming Emulator. 
- You can build the Android APK via Gradle: `./gradlew assembleDebug`

## API Usage
Both the Web and Android apps connect directly to the client-side public APIs:
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`
No custom API keys or GCP billing are required for weather functionality.
