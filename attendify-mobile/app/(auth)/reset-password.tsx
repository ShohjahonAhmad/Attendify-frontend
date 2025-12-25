import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.desc}>
        Enter your new password below to reset your account password.
      </Text>

      <View style={{ marginTop: 24, gap: 16 }}>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="New Password"
          placeholderTextColor="#9ca3af"
        />
        <PasswordInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#9ca3af"
        />
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
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
  //   input: {
  //     backgroundColor: "#111111",
  //     borderWidth: 1,
  //     borderColor: "#6366F1",
  //     color: "white",
  //     padding: 12,
  //     borderRadius: 8,
  //     fontSize: 16,
  //     marginTop: 24,
  //   },
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
