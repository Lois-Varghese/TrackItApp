import "react-native-gesture-handler";
import React, { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContext } from "../util/AppContext";
import { InnerHome } from "./InnerHome";
import Header from "../components/Header";
import colors from "../config/colors";

const Stack = createStackNavigator();

const screenNames = {
  home: "Home",
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    backgroundColor: colors.headerColor,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: colors.greyColor,
  },
});

export const Home = () => {
  const { setTrackItInfo } = useContext(AppContext);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const trackItData = await AsyncStorage.getItem("trackItData");
        if (trackItData !== null) {
          const trackItDataParsed = JSON.parse(trackItData);
          setTrackItInfo(trackItDataParsed);
        } else {
          await AsyncStorage.setItem("trackItData", JSON.stringify([]));
          setTrackItInfo([]);
        }
      } catch (e) {
        alert("Something went wrong. Please try again.");
      }
    };
    fetchAppData();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.headerContainer} />
      <SafeAreaView style={styles.footerContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.headerColor}
        />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={screenNames.home}
            screenOptions={{
              header: (props) => <Header {...props} />,
            }}
          >
            <Stack.Screen name={screenNames.home} component={InnerHome} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};
