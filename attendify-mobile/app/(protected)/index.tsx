import { View, Text, Pressable, StyleSheet, Modal, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import getUser from "../../api/user/getUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../contexts/AuthContext";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  uniqueIdentifier: string;
  institution?: string;
  createdAt: string;
  updatedAt: string;
};

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();
  const isPermissionGranted = permission?.granted;
  const [me, setMe] = useState<User | null>(null);
  const [cachedUser, setCachedUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const { logout }: any = useAuth();

  async function handleLogout() {
    try {
      await logout(); // This handles token removal and navigation
      setShowLogoutModal(false);
    } catch (err) {
      console.error("Logout error:", err);
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  }

  useEffect(() => {
    const fetchCachedUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          setCachedUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error("Failed to fetch cached user data:", err);
      }
    };
    fetchCachedUser();

    getUser()
      .then((userData) => {
        setMe(userData);
        AsyncStorage.setItem("userData", JSON.stringify(userData));
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
        setError(err.statusText || "Failed to fetch user data");
      });
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.innerContainer}>
        <View style={style.welcomeContainer}>
          <Pressable
            onPress={() => setShowLogoutModal(true)}
            style={{ position: "absolute", top: 25, right: 20 }}
          >
            <FontAwesome5 name="sign-out-alt" size={20} color="#EF4444" />
          </Pressable>
          <Text style={style.userGreetingText}>
            Welcome,{" "}
            {me
              ? `${me?.firstName} ${me?.lastName}`
              : cachedUser
              ? `${cachedUser.firstName} ${cachedUser.lastName}`
              : "Student"}
            !
          </Text>
        </View>
        <View style={style.buttonContainer}>
          <Pressable
            disabled={isPermissionGranted}
            style={({ pressed }) => [
              style.button,
              isPermissionGranted && style.disabledButton,
              pressed && style.pressedButton,
            ]}
            onPress={requestPermission}
          >
            <Text style={style.buttonText}>
              {!isPermissionGranted ? (
                "Click to permit camera!"
              ) : (
                <FontAwesome5 name="ban" size={20} color="red" />
              )}
            </Text>
          </Pressable>

          <Pressable
            disabled={!isPermissionGranted}
            style={({ pressed }) => [
              style.button,
              { opacity: isPermissionGranted ? 1 : 0.5 },
              pressed && style.pressedButton,
            ]}
            onPress={() => router.push("scanner")}
          >
            <Text style={style.buttonText}>Mark my attendance</Text>
          </Pressable>
        </View>
        {/* Logout Modal */}
        <Modal
          transparent={true}
          visible={showLogoutModal}
          animationType="fade"
          onRequestClose={() => setShowLogoutModal(false)}
        >
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              <Text style={style.modalTitle}>Confirm Logout</Text>
              <Text style={style.modalMessage}>
                Are you sure you want to log out?
              </Text>
              <View style={style.modalButtons}>
                <Pressable
                  style={[style.button, style.cancelButton]}
                  onPress={() => setShowLogoutModal(false)}
                >
                  <Text style={style.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[style.button, style.logoutButton]}
                  onPress={handleLogout}
                >
                  <Text style={style.buttonText}>Logout</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },

  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  welcomeContainer: {
    marginBottom: 40,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  userGreetingText: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 80,
    textAlign: "center",
  },

  buttonContainer: {
    gap: 20,
    flex: 2,
    justifyContent: "flex-start",
  },

  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  disabledButton: {
    backgroundColor: "#4b4b4b",
  },

  pressedButton: {
    transform: [{ scale: 0.96 }],
    backgroundColor: "#9395f6", // indigo-400
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },

  cancelButton: {
    backgroundColor: "#9CA3AF",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
