import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { AppContext } from "../util/AppContext";
import dayjs from "dayjs";
import Icon from "react-native-remix-icon";

export default function ViewExpense() {
  const {
    trackItInfo,
    setOpenModal,
    listItem,
    setModalType,
    setEditId,
    setFormData,
    deleteItem,
  } = useContext(AppContext);

  const onEdit = (id) => {
    if (trackItInfo) {
      const editedData = trackItInfo.filter((item) => item.id === id)[0];
      setFormData({
        type: editedData.type,
        amount: editedData.amount,
        desc: editedData.desc,
        date: editedData.date,
      });
    }
  };
  return (
    <>
      <View style={styles.contentWrapper}>
        <Text style={[styles.text, styles.expenseHeader]}>{listItem.type}</Text>
        <TouchableOpacity
          onPress={() => {
            setOpenModal(false);
          }}
        >
          <Icon name="close-fill" size="30" color={colors.lightBlack} />
        </TouchableOpacity>
      </View>
      <Text
        style={[
          styles.expenseValue,
          { color: listItem.type === "Income" ? colors.green : colors.red },
        ]}
      >{`$${listItem.amount}`}</Text>
      <Text style={styles.description}>{listItem.desc}</Text>
      <Text style={styles.dateValue}>
        {dayjs(listItem.date).format("MMMM D, YYYY")}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setOpenModal(true);
          setEditId(listItem.id);
          setModalType("edit");
          onEdit(listItem.id);
        }}
      >
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          deleteItem(listItem.id);
          setOpenModal(false);
        }}
      >
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: "row",
    paddingTop: 20,
    marginRight: 35,
    justifyContent: "space-between",
  },
  expenseHeader: {
    paddingLeft: "44%",
    textAlign: "center",
    fontSize: 20,
  },
  expenseValue: {
    fontSize: 32,
    marginTop: 60,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    color: colors.lightBlack,
    fontSize: 18,
    width: "100%",
    textAlign: "center",
    marginTop: 40,
  },
  dateValue: {
    color: colors.lightBlack,
    fontSize: 14,
    width: "100%",
    textAlign: "center",
    marginTop: 20,
  },
  editButton: {
    color: colors.headerColor,
    fontSize: 18,
    width: "100%",
    textAlign: "center",
    marginTop: 60,
  },
  deleteButton: {
    color: colors.lightBlack,
    fontSize: 18,
    width: "100%",
    textAlign: "center",
    marginTop: 30,
  },
});
