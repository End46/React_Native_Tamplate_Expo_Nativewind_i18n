import "@/constants/global.css";
import "@/i18n";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useTranslation } from "react-i18next";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const { t } = useTranslation();
  const scheme = colorScheme ?? "light";
  const navigationTheme = scheme === "dark" ? DarkTheme : DefaultTheme;
  const palette = Colors[scheme];

  return (
    <ThemeProvider
      value={{
        ...navigationTheme,
        colors: {
          ...navigationTheme.colors,
          primary: palette.tint,
          background: palette.background,
          card: palette.card,
          text: palette.text,
          border: palette.border,
        },
      }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: t("navigation.modal") }}
        />
      </Stack>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}
