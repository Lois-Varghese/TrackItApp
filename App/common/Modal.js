import React, { useContext } from "react";
import { View, StyleSheet, Modal } from "react-native";
import colors from "../config/colors";
import { AppContext } from "../util/AppContext";
import AddOrEditExpense from "../components/AddOrEditExpense";
import ViewExpense from "../components/ViewExpense";

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    height: "100%",
    width: "100%",
    borderRadius: 20,
    top: 70,
  },
});

export default function AppModal() {
  const { openModal, modalType } = useContext(AppContext);
  return (
    <Modal animationType={"slide"} transparent={true} visible={openModal}>
      <View style={styles.modal}>
        {(modalType === "add" || modalType === "edit") && <AddOrEditExpense />}
        {modalType === "view" && <ViewExpense />}
      </View>
    </Modal>
  );
}
