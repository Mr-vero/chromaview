# ChromaView: Real-Time Color Detector

A web application that uses your device's camera to detect colors in real-time. Point your camera at any object to instantly see its color values in both hex and RGB formats.

## Features

- Real-time color detection using device camera
- Displays color values in hex (#RRGGBB) and RGB formats
- Cross-hair target for precise color sampling
- Responsive design that works on desktop and mobile devices
- No external API dependencies - runs entirely in the browser

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development server (typically http://localhost:5173)

4. Grant camera permissions when prompted

## How It Works

The app uses the Web MediaDevices API to access your device's camera. It continuously samples the color at the center of the video feed and displays the color information in real-time.
