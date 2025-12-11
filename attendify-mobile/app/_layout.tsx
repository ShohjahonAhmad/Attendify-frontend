import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function RootTabNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    async function checkAuth() {
      const token = await AsyncStorage.getItem("authToken");
      setIsLoggedIn(token !== null);
    }

    checkAuth();
  }, []);
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
