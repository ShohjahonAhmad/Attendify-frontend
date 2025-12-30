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
import requestVerificationCode from "../../api/auth/requestVerificationCode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isEmail from "../../utils/isEmail";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isEmpty = email.trim().length == 0;

  async function handleClick() {
    try {
      setIsLoading(true);
      setError(null);

      if (!email.trim()) {
        throw {
          statusText: "Please fill in the field",
        };
      }

      if (!isEmail(email)) {
        throw {
          statusText: "Invalid email",
        };
      }
      await requestVerificationCode(email);
      setIsLoading(false);
      await AsyncStorage.setItem("email", email);
      router.push("verify-reset-code");
    } catch (err: any) {
      if (err.statusText?.error) {
        setError(err.statusText.error);
      } else {
        setError(err.statusText || "An error occured, try again later");
      }
      console.error("Error in sending email: ", err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <View style={passwordStyles.container}>
      <Text style={passwordStyles.title}>Forgot your password?</Text>
      <Text style={passwordStyles.desc}>
        We'll send you a verification code to reset your password
      </Text>

      {error && (
        <View style={passwordStyles.errorContainer}>
          <Ionicons name="alert-circle" size={20} color="#EF4444" />
          <Text style={passwordStyles.errorText}>{error}</Text>
        </View>
      )}

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
        placeholderTextColor="#9ca3af"
        style={passwordStyles.input}
      />

      <Pressable
        style={({ pressed }) => [
          passwordStyles.button,
          pressed && passwordStyles.buttonPressed,
        ]}
        accessibilityLabel="Send verification code"
        onPress={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="lightblue" />
        ) : (
          <Text style={passwordStyles.buttonText}>Send</Text>
        )}
      </Pressable>
    </View>
  );
}

export const passwordStyles = StyleSheet.create({
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
  buttonPressed: {
    transform: [{ scale: 0.96 }],
    backgroundColor: "#9395f6", // indigo-400
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2", // Light red background
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444", // Red accent
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
    gap: 8,
  },
  errorText: {
    color: "#991B1B", // Dark red text
    fontSize: 14,
    flex: 1,
    fontWeight: "500",
  },
});
