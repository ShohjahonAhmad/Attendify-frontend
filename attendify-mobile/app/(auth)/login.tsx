import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView
          style={{
            flex: 1,
            width: "100%",
            paddingHorizontal: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.login}>
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

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]} // Indigo-500
              onPress={() => console.log(email, password)}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="lightblue" />
              ) : (
                <Text style={styles.buttonText}>Log in</Text>
              )}
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f", // pure dark
  },

  login: {
    paddingVertical: 25,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "#6366F1", // indigo-500 border
    backgroundColor: "#1a1a1a", // dark card
    gap: 12,
    width: "100%",
    maxWidth: 400,
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

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  button: {
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#6366F1", // indigo-500
  },

  buttonPressed: {
    transform: [{ scale: 0.96 }],
    backgroundColor: "#9395f6", // indigo-400
  },
});
