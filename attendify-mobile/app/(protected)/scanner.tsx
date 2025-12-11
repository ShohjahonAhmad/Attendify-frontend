import { CameraView } from "expo-camera";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Overlay from "../../components/Overlay";

export default function Scanner() {
  return (
    <SafeAreaView style={style.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          console.log("Scanned data:", data);
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
