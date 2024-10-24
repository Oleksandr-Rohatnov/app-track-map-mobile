import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

type PropsT = {
  title: string;
  onPress?: () => void;
  styles?: ViewStyle;
};

const CustomButton = ({ title, onPress, styles = {} }: PropsT) => {
  return (
    <TouchableOpacity style={{ ...rootStyles.button, ...styles }} onPress={onPress}>
      <Text style={rootStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const rootStyles = StyleSheet.create({
  button: {
    backgroundColor: '#1976d3',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CustomButton;
