import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import uuid from "react-native-uuid";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState("false");
  const [modalType, setModalType] = useState("add");
  const [showCalendar, setOpenCalendar] = useState("false");
  const [editId, setEditId] = useState("default_id");
  const [formData, setFormData] = useState({
    type: "Income",
    amount: "",
    desc: "",
    date: dayjs().format("MMMM D, YYYY"),
  });
  const [listItem, setListItem] = useState([]);
  const [income, setIncome] = useState("0");
  const [expense, setExpense] = useState("0");
  const [balance, setBalance] = useState("0");
  const [trackItInfo, setTrackItInfo] = useState([]);
  const [parsedData, setParsedData] = useState([]);

  const saveItem = async () => {
    try {
      const amount = formData.amount;
      const desc = formData.desc;
      const type = formData.type;
      const date = formData.date;
      const existingData = await AsyncStorage.getItem("trackItData");
      const existingDataParsed = JSON.parse(existingData);
      const id = uuid.v4();
      const itemRecord = {
        id,
        amount,
        desc,
        type,
        date,
      };
      const updatedFormData = [...existingDataParsed, itemRecord];
      const sortedData = [...trackItInfo.concat(itemRecord)];
      await AsyncStorage.setItem(
        "trackItData",
        JSON.stringify(updatedFormData)
      );
      setTrackItInfo(sortedData);
    } catch (err) {
      alert("Could not add the item. Please try again.");
    }
  };

  const deleteItem = async (id) => {
    try {
      const trackItData = await AsyncStorage.getItem("trackItData");
      const trackItDataParsed = JSON.parse(trackItData);
      const updatedTrackItData = trackItDataParsed.filter(
        (item) => item.id !== id
      );
      await AsyncStorage.setItem(
        "trackItData",
        JSON.stringify(updatedTrackItData)
      );
      setTrackItInfo(updatedTrackItData);
    } catch (err) {
      alert("Could not delete the income/expense. Please try again.");
    }
  };

  const editItem = async () => {
    try {
      const amount = formData.amount;
      const desc = formData.desc;
      const type = formData.type;
      const date = formData.date;

      let editedArray = trackItInfo;

      const indexOfRecordToEdit = trackItInfo.findIndex(
        (item) => item.id === editId
      );
      editedArray[indexOfRecordToEdit] = {
        editId,
        amount,
        desc,
        type,
        date,
      };
      setTrackItInfo(editedArray);
      setParsedData(convertToSectionDataFormat(editedArray));

      await AsyncStorage.setItem("trackItData", JSON.stringify(editedArray));
    } catch (err) {
      alert("Could not edit income/expense. Please try again.");
    }
  };

  const convertToSectionDataFormat = () => {
    if (!trackItInfo) {
      return [];
    } else {
      let convertedData = [];

      const allDates = trackItInfo.map((item) =>
        new Date(item.date).toDateString()
      );
      const uniqueDates = allDates.filter(
        (date, index, self) => self.indexOf(date) === index
      );
      const uniqueDatesDescending = uniqueDates.sort((a, b) => {
        return new Date(b) - new Date(a);
      });

      uniqueDatesDescending.forEach((date) => {
        const itemsWithSameDate = trackItInfo.filter(
          (item) =>
            new Date(item.date).toDateString() === new Date(date).toDateString()
        );

        convertedData.push({
          title: new Date(date).toDateString(),
          data: itemsWithSameDate,
        });
      });

      return convertedData;
    }
  };

  const calculateIncomeExpense = () => {
    if (!trackItInfo) {
      return [0, 0];
    } else {
      const totalIncome = trackItInfo
        .filter((item) => item.type === "Income")
        .map((item) => Number(item.amount))
        .reduce((a, b) => a + b, 0);
      const totalExpense = trackItInfo
        .filter((item) => item.type === "Expense")
        .map((item) => Number(item.amount))
        .reduce((a, b) => a + b, 0);

      return [totalIncome, totalExpense];
    }
  };

  const contextValue = {
    openModal,
    modalType,
    showCalendar,
    formData,
    listItem,
    income,
    expense,
    balance,
    trackItInfo,
    editId,
    parsedData,
    setParsedData,
    setEditId,
    setTrackItInfo,
    setBalance,
    setExpense,
    setIncome,
    setListItem,
    setFormData,
    setOpenCalendar,
    setOpenModal,
    setModalType,
    saveItem,
    deleteItem,
    editItem,
    convertToSectionDataFormat,
    calculateIncomeExpense,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
