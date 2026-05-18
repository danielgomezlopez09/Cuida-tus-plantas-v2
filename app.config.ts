import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Cuida tus plantas",
  slug: "cuida-tus-plantas",
  owner: "daniel6661s-organization",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "cuidatusplantas",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  runtimeVersion: "1.0.0",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.app.cuidatusplantas",
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    package: "com.app.cuidatusplantas",
    versionCode: 1,
    permissions: ["POST_NOTIFICATIONS"],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-audio",
      {
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone.",
      },
    ],
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  extra: {
    eas: {
      projectId: "6b28301e-320b-41f1-a825-806ee7f41f8b"
    }
  }
};

export default config;