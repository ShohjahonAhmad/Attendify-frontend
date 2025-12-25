import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import usePasswordVisibility from "../hooks/usePasswordVisibility";
import { FontAwesome5 } from "@expo/vector-icons";

interface PasswordInputProps extends React.ComponentProps<typeof TextInput> {
  value: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput({
  value,
  onChangeText,
  style,
  ...props
}: PasswordInputProps) {
  const {
    passwordVisible,
    togglePasswordVisibility,
    secureTextEntry,
    iconName,
  } = usePasswordVisibility();
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[styles.input, style]}
        {...props}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        accessibilityLabel={passwordVisible ? "Hide password" : "Show password"}
        style={styles.iconButton}
      >
        <FontAwesome5 name={iconName} size={16} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#6366F1",
    color: "white",
    padding: 12,
    paddingRight: 40,
    borderRadius: 8,
    fontSize: 16,
  },
  iconButton: {
    position: "absolute",
    right: 12,
    top: 13,
  },
});
