import { Text, TextInput, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { passwordStyles } from "./forgot-password";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default function VerifyResetCode() {
  const [code, setCode] = useState<string>("");
  const isEmpty = code.trim().length == 0;
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  async function handleClick() {
    setError(null);
    const cachedCode = await AsyncStorage.getItem("passwordCode");
    if (cachedCode == code) {
      router.push("reset-password");
    } else {
      setError("Invalid verification code");
    }
  }
  return (
    <View style={passwordStyles.container}>
      <Text style={passwordStyles.title}>
        A verification code has been sent to your email address.
      </Text>
      <Text style={passwordStyles.desc}>
        Please check your inbox and spam folder for the code.
      </Text>
      {error && (
        <View style={passwordStyles.errorContainer}>
          <Ionicons name="alert-circle" size={20} color="#EF4444" />
          <Text style={passwordStyles.errorText}>{error}</Text>
        </View>
      )}
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Verification Code"
        placeholderTextColor="#9ca3af"
        style={passwordStyles.input}
      />
      <Pressable
        style={({ pressed }) => [
          passwordStyles.button,
          pressed && passwordStyles.buttonPressed,
        ]}
        accessibilityLabel="Enter verification code"
        onPress={handleClick}
        disabled={isEmpty}
      >
        <Text style={passwordStyles.buttonText}>Verify Code</Text>
      </Pressable>
    </View>
  );
}
