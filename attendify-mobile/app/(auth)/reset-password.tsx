import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { passwordStyles } from "./forgot-password";
import AsyncStorage from "@react-native-async-storage/async-storage";
import resetPassword from "../../api/auth/resetPassword";
import { useRouter } from "expo-router";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const isEmpty =
    password.trim().length == 0 || confirmPassword.trim().length == 0;

  async function handleClick() {
    setIsLoading(true);
    const email = (await AsyncStorage.getItem("email"))!;
    const code = (await AsyncStorage.getItem("passwordCode"))!;
    await resetPassword(email, code, password);
    router.push("/(auth)/login");
    setIsLoading(false);
  }
  return (
    <View style={passwordStyles.container}>
      <Text style={passwordStyles.title}>Change Password</Text>
      <Text style={passwordStyles.desc}>
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

      <Pressable
        style={({ pressed }) => [
          passwordStyles.button,
          pressed && passwordStyles.buttonPressed,
        ]}
        disabled={isLoading || isEmpty}
        onPress={handleClick}
      >
        {isLoading ? (
          <ActivityIndicator size={16} color="lightblue" />
        ) : (
          <Text style={passwordStyles.buttonText}>Reset Password</Text>
        )}
      </Pressable>
    </View>
  );
}
