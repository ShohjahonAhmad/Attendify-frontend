import { Pressable, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Success() {
  const router = useRouter();

  return (
    <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={100} color="white" />
        <Text style={styles.successText}>Success!</Text>
        <Text style={styles.messageText}>
          You have been successfully marked.
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressedButton,
          ]}
          onPress={() => router.push("/")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  successText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
  messageText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#6366F1",
    borderRadius: 8,
  },

  pressedButton: {
    transform: [{ scale: 0.96 }],
    backgroundColor: "#9395f6", // indigo-400
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
