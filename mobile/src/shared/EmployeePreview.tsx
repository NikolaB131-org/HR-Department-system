import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import MyText from './MyText';
import EmployeeDefaultSvg from '../assets/employee_default.svg';
import { Colors } from '../constants/colors';
import DeleteSvg from '../assets/delete.svg';

const IMAGE_WIDTH = 40;
const IMAGE_MARGIN_RIGHT = 12;
const ITEMS_SEPARATOR_MARGIN_VERTICAL = 6;

export const getChatPreviewImageContainerWidth = () => IMAGE_WIDTH + IMAGE_MARGIN_RIGHT;

type Props = {
  id: string;
  imageUrl?: string;
  name: string;
  onPress?: () => void;
  onDeletePress: (id: string) => void;
};

function EmployeePreview({ id, imageUrl, name, onPress, onDeletePress }: Props) {
  return (
    <>
      <Pressable style={styles.container} onPress={onPress}>
        {imageUrl ? (
          <Image style={styles.image} source={{ uri: imageUrl }} width={IMAGE_WIDTH} height={IMAGE_WIDTH} />
        ) : (
          <EmployeeDefaultSvg style={styles.image} width={IMAGE_WIDTH} height={IMAGE_WIDTH} />
        )}
        <View style={styles.content}>
          <MyText style={styles.name}>{name}</MyText>
          <Pressable hitSlop={20} onPress={() => onDeletePress(id)}>
            <DeleteSvg width={24} height={24} />
          </Pressable>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: IMAGE_MARGIN_RIGHT,
    borderRadius: 1000,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function ItemsSeparator() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: Colors.lightGrey,
        marginVertical: ITEMS_SEPARATOR_MARGIN_VERTICAL,
        marginLeft: getChatPreviewImageContainerWidth(),
      }}
    />
  );
}

export default EmployeePreview;
export { ItemsSeparator };
