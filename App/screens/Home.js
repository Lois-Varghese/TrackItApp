import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../config/colors";
import Card from "../components/Card";
import ListItems from "../components/ListItems";
import Footer from "../components/Footer";

import { AppContext } from "../util/AppContext";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  footerWrapper: {
    paddingLeft: screen.width * 0.42,
    backgroundColor: colors.greyColor,
  },
  viewStyle: {
    backgroundColor: colors.greyColor,
    height: screen.height,
  },
});

export const Home = ({ appData }) => {
  const { setTrackItInfo } = useContext(AppContext);
  useEffect(() => {
    setTrackItInfo(appData);
  }, [appData]);
  return (
    <View style={styles.viewStyle}>
      <Card />
      {appData !== [] && <ListItems />}
      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </View>
  );
};
