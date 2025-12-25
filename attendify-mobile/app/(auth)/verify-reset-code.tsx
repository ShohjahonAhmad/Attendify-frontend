import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { passwordStyles } from "./forgot-password";

export default function VerifyResetCode() {
  const [code, setCode] = useState<string>("");
  const isEmpty = code.trim().length == 0;
  const router = useRouter();
  return (
    <View style={passwordStyles.container}>
      <Text style={passwordStyles.title}>
        A verification code has been sent to your email address.
      </Text>
      <Text style={passwordStyles.desc}>
        Please check your inbox and spam folder for the code.
      </Text>
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
        onPress={() => router.push("reset-password")}
        disabled={isEmpty}
      >
        <Text style={passwordStyles.buttonText}>Verify Code</Text>
      </Pressable>
    </View>
  );
}
