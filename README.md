# Weather Intelligence App

## Overview
This repository contains a modern "Weather Intelligence App" built for deployment. It features a clean SaaS-style dashboard, search module, 7-day forecast cards, and trend charts.

## Important Note on Cloudflare Deployment
*Note: As this project is built within the Android ecosystem using Kotlin and Jetpack Compose (instead of React/Vite), it compiles into an Android application (APK/AAB) rather than static web assets. To deploy an Android app, you would publish it to the Google Play Store or distribute the APK directly, rather than using Cloudflare Pages.*

If you export this codebase to GitHub, the CI/CD pipeline would focus on Android builds using Gradle (`./gradlew assembleRelease`) rather than npm static builds.

## Features
- **Search Module:** Lookup global cities using the Open-Meteo Geocoding API.
- **Current Weather:** View current temperature, wind speed, humidity, and condition.
- **7-Day Forecast:** Detailed daily summary for the upcoming week.
- **Analytics Charts:** Responsive data visualization for temperature trends.
- **Smart Planning Recommendations:** Simple business/travel advice based on the forecast.

## API Usage
This app connects directly to the client-side public APIs:
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Forecast: `https://api.open-meteo.com/v1/forecast`
No custom API keys or GCP billing are required for weather functionality.
