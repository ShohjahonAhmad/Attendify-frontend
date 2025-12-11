import { CameraView } from "expo-camera";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Overlay from "../../components/Overlay";
import { useState } from "react";
import markUser from "../../api/user/markUser";
import Success from "../../components/Success";

export default function Scanner() {
  const [isScanned, setIsScanned] = useState<boolean>(false);
  return (
    <SafeAreaView style={style.container}>
      {!isScanned ? (
        <>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            onBarcodeScanned={async ({ data }) => {
              try {
                setIsScanned(true);
                const jsonData = JSON.parse(data);

                console.log(jsonData);

                await markUser(jsonData);
              } catch (err) {
                console.error("Failed to parse QR code data: ", err);
                Alert.alert("Error", "Invalid QR code", [
                  {
                    text: "OK",
                    onPress: () => setIsScanned(false),
                  },
                ]);
              }
            }}
          />
          <Overlay />
        </>
      ) : (
        <Success />
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
});
