import React from "react";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../config/colors";

const styles = StyleSheet.create({
  date: {
    height: 200,
    color: colors.white,
  },
});

export default function DatePicker({ dateStyle, onChange, date }) {
  return (
    <DateTimePicker
      value={date}
      mode="date"
      is24Hour={true}
      display="spinner"
      style={[dateStyle, styles.date]}
      textColor={colors.lightBlack}
      onChange={onChange}
    />
  );
}
