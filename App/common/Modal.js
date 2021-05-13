import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import colors from '../config/colors';
import {AppContext} from '../util/AppContext';
import AddOrEditExpense from '../components/AddOrEditExpense';
import ViewExpense from '../components/ViewExpense';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    height: screen.height,
    width: screen.width,
    borderRadius: 20,
    marginTop: 72,
  },
});

export default function AppModal() {
  const {openModal, modalType} = useContext(AppContext);
  return (
    <Modal animationType={'slide'} transparent={true} visible={openModal}>
      <View style={styles.modal}>
        {(modalType === 'add' || modalType === 'edit') && <AddOrEditExpense />}
        {modalType === 'view' && <ViewExpense />}
      </View>
    </Modal>
  );
}
