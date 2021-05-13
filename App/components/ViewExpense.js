import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import colors from "../config/colors";
import { AppContext } from "../util/AppContext";
import { deleteItem } from "../core/itemFunctions";
import dayjs from "dayjs";

const screen = Dimensions.get("window");

export default function ViewExpense() {
  const {
    trackItInfo,
    setOpenModal,
    listItem,
    setTrackItInfo,
    setModalType,
    setEditId,
    setFormData,
  } = useContext(AppContext);

  const onEdit = (id) => {
    if (trackItInfo !== "[]" || trackItInfo.length > 0) {
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
          <Text style={styles.closeButton}>X</Text>
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
          deleteItem(listItem.id, setTrackItInfo);
          setOpenModal(false);
        }}
      >
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 20,
    height: 20,
    fontWeight: "bold",
    marginLeft: screen.width * 0.2,
    color: colors.lightBlack,
  },
  contentWrapper: {
    flexDirection: "row",
    paddingTop: 20,
  },
  expenseHeader: {
    marginHorizontal: screen.width * 0.1,
    paddingLeft: screen.width * 0.3,
    fontSize: 20,
  },
  expenseValue: {
    fontSize: 32,
    marginTop: 60,
    marginHorizontal: screen.width * 0.38,
    width: screen.width * 0.9,
    fontWeight: "bold",
  },
  description: {
    color: colors.lightBlack,
    fontSize: 18,
    marginHorizontal: screen.width * 0.38,
    width: screen.width,
    marginTop: 40,
  },
  dateValue: {
    color: colors.lightBlack,
    fontSize: 14,
    marginHorizontal: screen.width * 0.38,
    width: screen.width * 0.7,
    marginTop: 20,
  },
  editButton: {
    color: colors.headerColor,
    fontSize: 18,
    width: screen.width * 0.3,
    marginHorizontal: screen.width * 0.4,
    marginTop: 60,
  },
  deleteButton: {
    color: colors.lightBlack,
    fontSize: 18,
    marginHorizontal: screen.width * 0.4,
    marginTop: 30,
    width: screen.width * 0.3,
  },
});
