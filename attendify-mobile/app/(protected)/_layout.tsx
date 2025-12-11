import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function ProtectedLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <StatusBar barStyle="light-content" />
        <Stack.Screen name="index" />
      </Stack>
    </SafeAreaProvider>
  );
}
