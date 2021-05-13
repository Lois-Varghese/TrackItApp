import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import { AppContext } from "../util/AppContext";
import AppModal from "../common/Modal";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerColor,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    width: 56,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "bold",
  },
});

export default function Footer() {
  const { openModal, setOpenModal, setModalType } = useContext(AppContext);
  return (
    <>
      {openModal === true ? (
        <AppModal />
      ) : (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            setOpenModal(true), setModalType("add");
          }}
        >
          <Text style={styles.footerText}>+</Text>
        </TouchableOpacity>
      )}
    </>
  );
}
