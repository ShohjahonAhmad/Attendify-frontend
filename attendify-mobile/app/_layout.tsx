import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

function RootLayoutNav() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or show a loading screen
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(protected)" options={{ headerTitle: "Home" }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" options={{ headerTitle: "Auth" }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootTabNavigator() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
