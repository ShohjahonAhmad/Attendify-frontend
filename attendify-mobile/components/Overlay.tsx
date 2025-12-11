import React from "react";
import { StyleSheet, View } from "react-native";

const Overlay: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlayTop} />
      <View style={styles.middleRow}>
        <View style={styles.overlaySide} />
        <View style={styles.cameraFrame} />
        <View style={styles.overlaySide} />
      </View>
      <View style={styles.overlayBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayTop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  middleRow: {
    flexDirection: "row",
    height: 200,
  },
  overlaySide: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  cameraFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#fff",
  },
  overlayBottom: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default Overlay;
