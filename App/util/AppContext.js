import React, { createContext, useState } from "react";
import dayjs from "dayjs";

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
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
