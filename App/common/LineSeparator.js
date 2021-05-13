import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGreyColor,
    width: 1,
    marginBottom: 6,
    marginTop: 6,
  },
});

export default function LineSeparator() {
  return <View style={styles.container} />;
}
