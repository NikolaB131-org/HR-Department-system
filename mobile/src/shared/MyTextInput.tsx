import React, { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { Colors } from '../constants/colors';

type Props = {
  style?: TextInputProps['style'];
  placeholder?: TextInputProps['placeholder'];
  onChangeText?: TextInputProps['onChangeText'];
  value?: TextInputProps['value'];
  onEndEditing?: TextInputProps['onEndEditing'];
  autoFocus?: boolean;
};

function MyTextInput({ style, placeholder, onChangeText, value, onEndEditing, autoFocus }: Props) {
  const ref = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        ref.current?.focus();
      }, 150);
    }
  }, [ref, autoFocus]);

  return (
    <TextInput
      ref={ref}
      style={[styles.input, style]}
      placeholderTextColor={Colors.lightGrey}
      selectionColor={Colors.primary}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      onEndEditing={onEndEditing}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    color: Colors.primaryText,
    padding: 0,
  },
});

export default MyTextInput;
