import React, { useContext, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import colors from "../config/colors";
import { AppContext } from "../util/AppContext";
import { List } from "../common/List";
import { convertToSectionDataFormat } from "../core/itemFunctions";
import dayjs from "dayjs";

const screen = Dimensions.get("window");

export default function ListItems() {
  const {
    setOpenModal,
    setModalType,
    setListItem,
    trackItInfo,
    parsedData,
    setParsedData,
  } = useContext(AppContext);

  useEffect(() => {
    setParsedData(convertToSectionDataFormat(trackItInfo));
  }, [trackItInfo]);

  const dateTitle = (date) => {
    const currentDate = dayjs().format("MMMM D, YYYY");
    const formattedDate = dayjs(date).format("MMMM D, YYYY");
    return currentDate === formattedDate ? "Today" : formattedDate;
  };

  return (
    <View style={styles.container}>
      {parsedData === null || parsedData === "[]" ? (
        []
      ) : (
        <List
          sections={parsedData}
          keyExtractor={(_item, index) => index}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.title}>{dateTitle(title)}</Text>
          )}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                  setOpenModal(true), setModalType("view"), setListItem(item);
                }}
              >
                <Text style={styles.itemText}>{item.desc}</Text>
                <Text
                  style={[
                    styles.itemValue,
                    {
                      color: item.type === "Income" ? colors.green : colors.red,
                    },
                  ]}
                >{`$${item.amount}`}</Text>
              </TouchableOpacity>
            </>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.greyColor,
    height: screen.height * 0.55,
    width: screen.width,
  },
  title: {
    marginTop: 24,
    color: colors.lightBlack,
    textAlign: "center",
  },
  listItem: {
    backgroundColor: colors.white,
    width: screen.width * 0.9,
    height: 48,
    marginTop: 10,
    flexDirection: "row",
    borderRadius: 8,
    marginLeft: screen.width * 0.05,
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    color: colors.lightBlack,
    paddingHorizontal: 15,
  },
  itemValue: {
    marginRight: 5,
    paddingHorizontal: 15,
  },
});
