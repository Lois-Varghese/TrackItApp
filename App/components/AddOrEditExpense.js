import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import colors from '../config/colors';
import {AppContext} from '../util/AppContext';
import Input from '../common/Input';
import DatePicker from '../common/DatePicker';
import dayjs from 'dayjs';
import {saveItem, editItem} from '../core/itemFunctions';

const screen = Dimensions.get('window');

export default function AddOrEditExpense() {
  const {
    trackItInfo,
    showCalendar,
    setOpenCalendar,
    setOpenModal,
    editId,
    formData,
    setFormData,
    setTrackItInfo,
    modalType,
    setParsedData,
  } = useContext(AppContext);

  const setDate = selectedDate => {
    const currentDate =
      dayjs(selectedDate).format('MMMM D, YYYY') || formData.date;
    setOpenCalendar(false);
    setFormData({...formData, date: currentDate});
  };

  const disableSaveButton =
    formData.desc === '' || formData.amount === '' ? true : false;

  const disabledButton =
    formData.desc === '' || formData.amount === ''
      ? colors.greyColor
      : colors.headerColor;

  const validateAmount = value => {
    if (isNaN(value)) {
      alert('Please enter a valid amount.');
    } else {
      setFormData({...formData, amount: value});
    }
  };

  const onSave = async () => {

    if (formData.amount === '') {
      alert('Please enter the amount.');
      return false;
    }

    validateAmount(formData.amount);

    if (formData.desc === '') {
      alert('Please enter the description.');
      return false;
    }

    if (modalType === 'add') {
      saveItem({formData, setTrackItInfo, trackItInfo});
    } else if (modalType === 'edit') {
      editItem(editId, formData, trackItInfo, setTrackItInfo, setParsedData);
    }
    clearForm();
    setOpenModal(false);

    return true;
  };

  const onModalClose = () => {
    clearForm();
    setOpenModal(false);
  }

  const clearForm = () => {
    setFormData({
      type: 'Income',
      amount: '',
      desc: '',
      date: new Date(),
    });
  }

  const modalHeader = modalType === 'add' ? 'Add' : 'Edit';

  return (
    <>
      <View style={styles.contentWrapper}>
        <Text style={styles.text}>{`${modalHeader} Income/Expense`}</Text>
        <TouchableOpacity
          onPress={() => onModalClose()}>
          <Text style={styles.closeButton}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[
            styles.incomeWrapper,
            {
              backgroundColor:
                formData.type === 'Expense'
                  ? colors.greyColor
                  : colors.headerColor,
            },
          ]}
          onPress={() => {
            setFormData({...formData, type: 'Income'});
          }}>
          <Text
            style={{
              color:
                formData.type === 'Expense' ? colors.lightBlack : colors.white,
            }}>
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.expenseWrapper,
            {
              backgroundColor:
                formData.type === 'Expense'
                  ? colors.headerColor
                  : colors.greyColor,
            },
          ]}
          onPress={() => {
            setFormData({...formData, type: 'Expense'});
          }}>
          <Text
            style={{
              color:
                formData.type === 'Expense' ? colors.white : colors.lightBlack,
            }}>
            Expense
          </Text>
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Amount"
        keyboardType={'numeric'}
        styleAdd={styles.styleAdd}
        value={formData.amount}
        onChange={e => validateAmount(e)}
      />
      <Input
        placeholder="Description"
        styleAdd={[styles.styleAdd, styles.textField]}
        value={formData.desc}
        onChange={value => setFormData({...formData, desc: value})}
      />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setOpenCalendar(true);
        }}>
        <View style={styles.datePicker}>
          <Text style={styles.datePickerValue}>
            {dayjs(formData.date).format('MMMM D, YYYY') || 'Date'}
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
        }}>
        <Text style={[styles.saveButton, {color: `${disabledButton}`}]}>
          Save
        </Text>
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
  text: {
    color: colors.lightBlack,
    marginHorizontal: screen.width * 0.25,
    fontSize: 18,
  },
  buttonWrapper: {
    flexDirection: 'row',
    width: 148,
    height: 40,
    marginTop: 30,
    marginHorizontal: screen.width * 0.28,
  },
  incomeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  expenseWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  styleAdd: {
    width: screen.width * 0.8,
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
    marginLeft: screen.width * 0.4,
  },
  dateStyle: {
    marginLeft: screen.width * 0.07,
    width: screen.width * 0.85,
    marginBottom: 40,
    backgroundColor: colors.white,
  },
  datePicker: {
    borderColor: colors.greyColor,
    padding: 10,
    paddingLeft: 18,
    marginLeft: screen.width * 0.1,
    width: screen.width * 0.8,
    marginBottom: 32,
    borderRadius: 8,
    borderWidth: 1,
  },
  datePickerValue: {
    color: colors.lightBlack,
  },
});
