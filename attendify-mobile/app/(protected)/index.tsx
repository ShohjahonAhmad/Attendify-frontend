import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import getUser from "../../api/user/getUser";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  uniqueIdentifier: string;
  institution?: string;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const isPermissionGranted = permission?.granted;
  const [me, setMe] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUser()
      .then((userData) => setMe(userData))
      .catch((err) => setError(err.statusText || "Failed to fetch user data"));
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.innerContainer}>
        <View style={style.welcomeContainer}>
          <Text style={style.userGreetingText}>
            Welcome, {me?.firstName} {me?.lastName}
          </Text>
        </View>
        <View style={style.buttonContainer}>
          <Pressable
            disabled={isPermissionGranted}
            style={({ pressed }) => [
              style.button,
              isPermissionGranted && style.disabledButton,
              pressed && style.pressedButton,
            ]}
            onPress={requestPermission}
          >
            <Text style={style.buttonText}>
              {!isPermissionGranted ? (
                "Click to permit camera!"
              ) : (
                <FontAwesome5 name="ban" size={20} color="red" />
              )}
            </Text>
          </Pressable>

          <Pressable
            disabled={!isPermissionGranted}
            style={({ pressed }) => [
              style.button,
              { opacity: isPermissionGranted ? 1 : 0.5 },
              pressed && style.pressedButton,
            ]}
            onPress={() => router.push("scanner")}
          >
            <Text style={style.buttonText}>Mark my attendance</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },

  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  welcomeContainer: {
    marginBottom: 40,
    flex: 1,
    paddingHorizontal: 20,
  },

  userGreetingText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 80,
    textAlign: "center",
  },

  buttonContainer: {
    gap: 20,
    flex: 2,
    justifyContent: "flex-start",
  },

  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  disabledButton: {
    backgroundColor: "#4b4b4b",
  },

  pressedButton: {
    transform: [{ scale: 0.96 }],
    backgroundColor: "#9395f6", // indigo-400
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
