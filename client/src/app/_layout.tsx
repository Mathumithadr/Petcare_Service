import "../global.css";
import { Stack } from "expo-router";
import { useFonts, JotiOne_400Regular } from "@expo-google-fonts/joti-one";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { BookingsProvider } from "../context/BookingsContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    JotiOne_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <BookingsProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </BookingsProvider>
  );
}