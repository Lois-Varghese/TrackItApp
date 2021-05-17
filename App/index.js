import "react-native-gesture-handler";
import React from "react";
import { AppContextProvider } from "./util/AppContext";
import { Home } from "./screens/Home";

export default function App() {
  return (
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  );
}
