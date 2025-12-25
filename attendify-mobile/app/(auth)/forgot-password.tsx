import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot your password?</Text>
      <Text style={styles.desc}>
        We'll send you a verification code to reset your password
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
        placeholderTextColor="#9ca3af"
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        accessibilityLabel="Send verification code"
        onPress={() => {
          router.push("verify-reset-code");
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="lightblue" />
        ) : (
          <Text style={styles.buttonText}>Send</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  desc: {
    color: "white",
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#6366F1",
    color: "white",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 24,
  },
  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
