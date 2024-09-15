import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "@/hooks/useColorScheme";
import App from "./index";
import { Button } from "react-native";
import SignIn from "./sign-in";

const Stack = createNativeStackNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={App}
          options={{ 
            headerShown: true, 
            headerTitle: "Tesla Savings", 
            headerLeft: () =>undefined, 
            headerRight: () =>undefined, 
            headerBackTitle: "Back" 
          }}
        />
        <Stack.Screen
          name="sign-in"
          component={SignIn}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </ThemeProvider>
  );
}
