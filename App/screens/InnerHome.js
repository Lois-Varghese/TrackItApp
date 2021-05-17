import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Card from "../components/Card";
import ListItems from "../components/ListItems";
import Footer from "../components/Footer";

const styles = StyleSheet.create({
  footerWrapper: {
    position: "absolute",
    marginLeft: "43%",
    bottom: 5,
  },
  viewStyle: {
    backgroundColor: colors.greyColor,
    height: "100%",
  },
});

export const InnerHome = () => {
  return (
    <View style={styles.viewStyle}>
      <Card />
      <ListItems />
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
};
