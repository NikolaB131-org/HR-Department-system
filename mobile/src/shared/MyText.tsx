import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { Colors } from '../constants/colors';

type Props = {
  style?: TextProps['style'];
  children?: TextProps['children'];
  numberOfLines?: TextProps['numberOfLines'];
  selectable?: TextProps['selectable'];
};

function MyText({ style, children, numberOfLines, selectable }: Props) {
  return (
    <Text style={[styles.text, style]} numberOfLines={numberOfLines} selectable={selectable}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.primaryText,
  },
});

export default MyText;
