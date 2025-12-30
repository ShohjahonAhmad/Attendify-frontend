import { Text, View, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { passwordStyles } from "./forgot-password";
import AsyncStorage from "@react-native-async-storage/async-storage";
import resetPassword from "../../api/auth/resetPassword";
import { useRouter } from "expo-router";
import isPassword from "../../utils/isPassword";
import { Ionicons } from "@expo/vector-icons";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleClick() {
    try {
      setError(null);
      setIsLoading(true);

      if (!password.trim() || !confirmPassword.trim()) {
        throw {
          statusText: "Please fill in all fields",
        };
      }

      if (password !== confirmPassword) {
        throw {
          statusText: "Passwords do not match",
        };
      }
      if (!isPassword(password)) {
        throw {
          statusText:
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
        };
      }
      const email = (await AsyncStorage.getItem("email"))!;
      const code = (await AsyncStorage.getItem("passwordCode"))!;
      await resetPassword(email, code, password);
      router.push("/(auth)/login");
    } catch (err: any) {
      if (err.statusText?.error) {
        setError(err.statusText.error);
      } else {
        setError(err.statusText || "An error occured, try again later");
      }
      console.error("Error in reseting password:", err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <View style={passwordStyles.container}>
      <Text style={passwordStyles.title}>Change Password</Text>
      <Text style={passwordStyles.desc}>
        Enter your new password below to reset your account password.
      </Text>

      {error && (
        <View style={passwordStyles.errorContainer}>
          <Ionicons name="alert-circle" size={20} color="#EF4444" />
          <Text style={passwordStyles.errorText}>{error}</Text>
        </View>
      )}

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
        disabled={isLoading}
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
