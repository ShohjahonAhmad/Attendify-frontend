import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Button,
  Pressable,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.login}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={styles.title}>Login</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="e.g. example@example.com"
          placeholderTextColor="#9ca3af" // gray-400
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="e.g. password123!"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.buttonWrapper}>
          <Pressable
            style={({ pressed }) => [
              { backgroundColor: pressed ? "9395f6" : "#6366F1" },
            ]} // Indigo-500
            onPress={() => console.log(email, password)}
          >
            <Text>Log in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f", // pure dark
    alignItems: "center",
    justifyContent: "center",
  },

  login: {
    paddingVertical: 25,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#6366F1", // indigo-500 border
    backgroundColor: "#1a1a1a", // dark card
    gap: 12,
    width: "80%",
    borderRadius: 12,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    alignSelf: "center",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#6366F1", // indigo
    color: "white",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },

  buttonWrapper: {
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 8,
  },
});
