import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import colors from "../config/colors";
import { AppContext } from "../util/AppContext";
import AppModal from "../common/Modal";
import Icon from "react-native-remix-icon";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerColor,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    width: 56,
    borderRadius: 20,
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
          <Icon name="add-fill" size="30" color={colors.white} />
        </TouchableOpacity>
      )}
    </>
  );
}
