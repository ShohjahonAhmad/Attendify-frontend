import { Stack } from "expo-router";

export const isLoggedIn = false;
//   localStorage.getItem("isLoggedIn") === "true" || false;
export default function RootTabNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(protected)" options={{ headerTitle: "Home" }} />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" options={{ headerTitle: "Auth" }} />
      </Stack.Protected>
    </Stack>
  );
}
