import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerColor,
    alignItems: "center",
    height: 50,
  },
  headerText: {
    marginTop: 16,
    fontSize: 18,
    color: colors.white,
    fontWeight: "bold",
  },
});

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>TrackIt</Text>
    </View>
  );
}
