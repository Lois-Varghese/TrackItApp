import React, {useState} from 'react';
import { StyleSheet, TextInput} from 'react-native';
import colors from '../config/colors';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
  },
});

export default function Input({
  placeholder,
  styleAdd,
  keyboardType,
  value,
  onChange,
}) {
  const [borderColor, setBorderColor] = useState(colors.greyColor);

  const onFocus = () => {
    setBorderColor(colors.headerColor);
  };

  const onBlur = () => {
    setBorderColor(colors.greyColor);
  };

  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, styleAdd, {borderColor}]}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
