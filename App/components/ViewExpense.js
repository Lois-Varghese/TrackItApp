import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import {AppContext} from '../util/AppContext';
import {deleteItem} from '../core/itemFunctions';
import dayjs from 'dayjs';

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

  const onEdit = id => {
    if (trackItInfo !== '[]' || trackItInfo.length > 0) {
      const editedData = trackItInfo.filter(item => item.id === id)[0];
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
          }}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={[
          styles.expenseValue,
          {color: listItem.type === 'Income' ? colors.green : colors.red},
        ]}>{`$${listItem.amount}`}</Text>
      <Text style={styles.description}>{listItem.desc}</Text>
      <Text style={styles.dateValue}>
        {dayjs(listItem.date).format('MMMM D, YYYY')}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setOpenModal(true);
          setEditId(listItem.id);
          setModalType('edit');
          onEdit(listItem.id);
        }}>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          deleteItem(listItem.id, setTrackItInfo);
          setOpenModal(false);
        }}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 20,
    height: 20,
    fontWeight: 'bold',
    color: colors.lightBlack,
    paddingRight: 50,
  },
  contentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  expenseHeader: {
    marginLeft: 165,
    fontSize: 20,
  },
  expenseValue: {
    fontSize: 32,
    marginTop: 60,
    marginLeft: 170,
    fontWeight: 'bold',
  },
  description: {
    color: colors.lightBlack,
    fontSize: 18,
    marginLeft: 162,
    marginTop: 40,
  },
  dateValue: {
    color: colors.lightBlack,
    fontSize: 14,
    marginLeft: 170,
    marginTop: 20,
  },
  editButton: {
    color: colors.headerColor,
    fontSize: 18,
    marginLeft: 190,
    marginTop: 60,
  },
  deleteButton: {
    color: colors.lightBlack,
    fontSize: 18,
    marginLeft: 185,
    marginTop: 30,
  },
});
