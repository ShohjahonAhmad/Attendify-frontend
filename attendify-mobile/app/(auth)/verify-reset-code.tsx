import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function VerifyResetCode() {
  const [code, setCode] = useState<string>("");
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        A verification code has been sent to your email address.
      </Text>
      <Text style={styles.desc}>
        Please check your inbox and spam folder for the code.
      </Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Verification Code"
        placeholderTextColor="#9ca3af"
        style={styles.input}
      />
      <Pressable
        style={styles.button}
        accessibilityLabel="Enter verification code"
        onPress={() => router.push("reset-password")}
      >
        <Text style={styles.buttonText}>Verify Code</Text>
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
