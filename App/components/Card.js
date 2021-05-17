import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";
import LineSeparator from "../common/LineSeparator";
import { AppContext } from "../util/AppContext";

export default function Card() {
  const { calculateIncomeExpense } = useContext(AppContext);
  const [totalIncome, totalExpense] = calculateIncomeExpense();

  return (
    <View styles={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Balance</Text>
          <Text style={styles.balanceValue}>{`$${
            totalIncome - totalExpense
          }`}</Text>
        </View>
        <LineSeparator />
        <View style={styles.innerWrapper}>
          <Text style={styles.text}>Income</Text>
          <Text style={styles.incomeValue}>{`$${totalIncome}`}</Text>
          <Text style={styles.expenseValue}>{`$${totalExpense}`}</Text>
          <Text style={styles.text}>Expense</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    height: 156,
  },
  container: {
    borderColor: colors.lightGreyColor,
    borderWidth: 1,
    width: "90%",
    height: 128,
    marginTop: 14,
    marginBottom: 14,
    flexDirection: "row",
    borderRadius: 8,
    marginLeft: "5%",
    marginRight: "5%",
  },
  innerContainer: {
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  innerWrapper: {
    width: "57%",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceValue: {
    color: colors.blue,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  incomeValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.green,
    marginBottom: 12,
  },
  expenseValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.red,
  },
  text: {
    color: colors.lightBlack,
  },
});
