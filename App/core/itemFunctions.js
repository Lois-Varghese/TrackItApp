import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import moment from "moment";

export const saveItem = async ({ formData, setTrackItInfo, trackItInfo }) => {
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
    const updatedFormData = [...existingDataParsed, itemRecord].sort((a, b) => {
      return (
        moment(b.date).format("MMMM D, YYYY") -
        moment(a.date).format("MMMM D, YYYY")
      );
    });
    const sortedData = [...trackItInfo.concat(itemRecord)].sort((a, b) => {
      return (
        moment(b.date).format("MMMM D, YYYY") -
        moment(a.date).format("MMMM D, YYYY")
      );
    });
    await AsyncStorage.setItem("trackItData", JSON.stringify(updatedFormData));
    setTrackItInfo(sortedData);
    return true;
  } catch (err) {
    alert("Could not add the item. Please try again.");
    return false;
  }
};

export const convertToSectionDataFormat = (appData) => {
  if (appData === null || appData === "[]") {
    return [];
  } else {
    let convertedData = [];

    const allDates = appData.map((item) => new Date(item.date).toDateString());
    const uniqueDates = allDates.filter(
      (date, index, self) => self.indexOf(date) === index
    );
    const uniqueDatesDescending = uniqueDates.sort((a, b) => {
      return new Date(b) - new Date(a);
    });

    uniqueDatesDescending.forEach((date) => {
      const itemsWithSameDate = appData.filter(
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

export const calculateIncomeExpense = (appData) => {
  if (appData.length === 0 || appData === "[]") {
    return [0, 0];
  } else {
    const totalIncome = appData
      .filter((item) => item.type === "Income")
      .map((item) => Number(item.amount))
      .reduce((a, b) => a + b, 0);
    const totalExpense = appData
      .filter((item) => item.type === "Expense")
      .map((item) => Number(item.amount))
      .reduce((a, b) => a + b, 0);

    return [totalIncome, totalExpense];
  }
};

export const deleteItem = async (id, setTrackItInfo) => {
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
    return true;
  } catch (err) {
    alert("Could not delete the income/expense. Please try again.");
    return false;
  }
};

export const editItem = async (
  id,
  formData,
  trackItInfo,
  setTrackItInfo,
  setParsedData
) => {
  try {
    const amount = formData.amount;
    const desc = formData.desc;
    const type = formData.type;
    const date = formData.date;

    let editedArray = trackItInfo;

    const indexOfRecordToEdit = trackItInfo.findIndex((item) => item.id === id);
    editedArray[indexOfRecordToEdit] = {
      id,
      amount,
      desc,
      type,
      date,
    };
    setTrackItInfo(editedArray);
    setParsedData(convertToSectionDataFormat(editedArray));

    await AsyncStorage.setItem("trackItData", JSON.stringify(editedArray));
    return true;
  } catch (err) {
    alert("Could not edit income/expense. Please try again.");
    return false;
  }
};
