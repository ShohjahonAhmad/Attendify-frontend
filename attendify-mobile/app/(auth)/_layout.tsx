import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <StatusBar barStyle="light-content" />
        <Stack.Screen name="login" />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: true,
            title: "Forgot Password",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0f0f0f" },
          }}
        />
        <Stack.Screen
          name="verify-reset-code"
          options={{
            headerShown: true,
            title: "Verify code",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0f0f0f" },
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            headerShown: true,
            title: "Reset Password",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#0f0f0f" },
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
