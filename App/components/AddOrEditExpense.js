import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { AppContext } from "../util/AppContext";
import Input from "../common/Input";
import DatePicker from "../common/DatePicker";
import Icon from "react-native-remix-icon";
import dayjs from "dayjs";

export default function AddOrEditExpense() {
  const {
    showCalendar,
    setOpenCalendar,
    setOpenModal,
    formData,
    setFormData,
    modalType,
    saveItem,
    editItem,
  } = useContext(AppContext);

  const setDate = (selectedDate) => {
    const currentDate =
      dayjs(selectedDate).format("MMMM D, YYYY") || formData.date;
    setOpenCalendar(false);
    setFormData({ ...formData, date: currentDate });
  };

  const disableSaveButton =
    formData.desc === "" || formData.amount === "" ? true : false;

  const disabledButton =
    formData.desc === "" || formData.amount === ""
      ? colors.greyColor
      : colors.headerColor;

  const validateAmount = (value) => {
    if (isNaN(value)) {
      alert("Please enter a valid amount.");
    } else {
      setFormData({ ...formData, amount: value });
    }
  };

  const onSave = async () => {
    if (formData.amount === "") {
      alert("Please enter the amount.");
      return false;
    }

    validateAmount(formData.amount);

    if (formData.desc === "") {
      alert("Please enter the description.");
      return false;
    }

    if (modalType === "add") {
      saveItem();
    } else if (modalType === "edit") {
      editItem();
    }
    clearForm();
    setOpenModal(false);

    return true;
  };

  const onModalClose = () => {
    clearForm();
    setOpenModal(false);
  };

  const clearForm = () => {
    setFormData({
      type: "Income",
      amount: "",
      desc: "",
      date: new Date(),
    });
  };

  const modalHeader = modalType === "add" ? "Add" : "Edit";

  return (
    <>
      <View style={styles.contentWrapper}>
        <Text style={styles.text}>{`${modalHeader} Income/Expense`}</Text>
        <TouchableOpacity onPress={() => onModalClose()}>
          <Icon name="close-fill" size="30" color={colors.lightBlack} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[
            styles.incomeWrapper,
            {
              backgroundColor:
                formData.type === "Expense"
                  ? colors.greyColor
                  : colors.headerColor,
            },
          ]}
          onPress={() => {
            setFormData({ ...formData, type: "Income" });
          }}
        >
          <Text
            style={{
              color:
                formData.type === "Expense" ? colors.lightBlack : colors.white,
            }}
          >
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.expenseWrapper,
            {
              backgroundColor:
                formData.type === "Expense"
                  ? colors.headerColor
                  : colors.greyColor,
            },
          ]}
          onPress={() => {
            setFormData({ ...formData, type: "Expense" });
          }}
        >
          <Text
            style={{
              color:
                formData.type === "Expense" ? colors.white : colors.lightBlack,
            }}
          >
            Expense
          </Text>
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Amount"
        keyboardType={"numeric"}
        styleAdd={styles.styleAdd}
        value={formData.amount}
        onChange={(e) => validateAmount(e)}
      />
      <Input
        placeholder="Description"
        styleAdd={[styles.styleAdd, styles.textField]}
        value={formData.desc}
        onChange={(value) => setFormData({ ...formData, desc: value })}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setOpenCalendar(true);
        }}
      >
        <View style={styles.datePicker}>
          <Text style={styles.datePickerValue}>
            {dayjs(formData.date).format("MMMM D, YYYY") || "Date"}
          </Text>
        </View>
      </TouchableOpacity>
      {showCalendar === true && (
        <DatePicker
          dateStyle={styles.dateStyle}
          date={dayjs(formData.date).toDate()}
          onChange={(e, selectedDate) => {
            setDate(selectedDate);
          }}
        />
      )}
      <TouchableOpacity
        disabled={disableSaveButton}
        onPress={() => {
          onSave();
        }}
      >
        <Text style={[styles.saveButton, { color: `${disabledButton}` }]}>
          Save
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 20,
    justifyContent: "space-between",
    paddingLeft: 95,
    paddingRight: 30,
  },
  text: {
    color: colors.lightBlack,
    width: "80%",
    fontSize: 18,
  },
  buttonWrapper: {
    flexDirection: "row",
    width: 148,
    height: 40,
    marginTop: 30,
    marginHorizontal: 120,
  },
  incomeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  expenseWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  styleAdd: {
    width: "80%",
    borderRadius: 8,
    marginTop: 40,
    margin: 40,
    paddingLeft: 20,
  },
  textField: {
    marginTop: 0,
  },
  saveButton: {
    padding: 10,
    fontSize: 20,
    marginLeft: "40%",
  },
  dateStyle: {
    marginLeft: "9%",
    width: "85%",
    marginBottom: 40,
    backgroundColor: colors.white,
  },
  datePicker: {
    borderColor: colors.greyColor,
    padding: 10,
    marginLeft: 40,
    paddingLeft: 20,
    width: "80%",
    marginBottom: 32,
    borderRadius: 8,
    borderWidth: 1,
  },
  datePickerValue: {
    color: colors.lightBlack,
  },
});
