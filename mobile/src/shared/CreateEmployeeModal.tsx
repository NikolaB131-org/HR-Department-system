import React, { useState } from 'react';
import { Modal, Pressable, StatusBar, StyleSheet } from 'react-native';

import MyText from './MyText';
import MyTextInput from './MyTextInput';
import { EmployeeType } from '../../../backend/src/modules/employee/employee.model';
import { Colors } from '../constants/colors';

const BORDER_RADIUS = 12;
const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.3)';

export type Props = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  onConfirm: (employee: Omit<EmployeeType, 'id' | 'imageUrl'>) => void;
};

function CreateEmployeeModal({ isVisible, setIsVisible, onConfirm }: Props) {
  const [inputValueName, setInputValueName] = useState('');
  const [inputValueAge, setInputValueAge] = useState('');
  const [inputValueEmail, setInputValueEmail] = useState('');
  const [inputValuePhoneNumber, setInputValuePhoneNumber] = useState('');
  const [inputValueSalary, setInputValueSalary] = useState('');
  const [inputValueYearsOfExperience, setInputValueYearsOfExperience] = useState('');

  const onConfirmPressed = async () => {
    onConfirm({
      name: inputValueName,
      age: +inputValueAge,
      email: inputValueEmail,
      phoneNumber: inputValuePhoneNumber,
      salary: +inputValueSalary,
      yearsOfExperience: +inputValueYearsOfExperience,
    });
    setIsVisible(false);
  };

  return (
    <Modal transparent visible={isVisible}>
      <StatusBar backgroundColor={BACKGROUND_COLOR} />
      <Pressable style={styles.wrapper} onPress={() => setIsVisible(false)}>
        <Pressable style={styles.container}>
          <MyText style={styles.titleText}>Введите данные нового сотрудника</MyText>
          <MyTextInput
            style={styles.textInput}
            value={inputValueName}
            onChangeText={setInputValueName}
            autoFocus
            placeholder="Имя"
          />
          <MyTextInput
            style={styles.textInput}
            value={inputValueAge}
            onChangeText={setInputValueAge}
            placeholder="Возраст"
          />
          <MyTextInput
            style={styles.textInput}
            value={inputValueEmail}
            onChangeText={setInputValueEmail}
            placeholder="Почта"
          />
          <MyTextInput
            style={styles.textInput}
            value={inputValuePhoneNumber}
            onChangeText={setInputValuePhoneNumber}
            placeholder="Номер телефона"
          />
          <MyTextInput
            style={styles.textInput}
            value={inputValueSalary}
            onChangeText={setInputValueSalary}
            placeholder="Зарплата"
          />
          <MyTextInput
            style={styles.textInput}
            value={inputValueYearsOfExperience}
            onChangeText={setInputValueYearsOfExperience}
            placeholder="Лет опыта"
          />
          <Pressable style={styles.button} onPress={onConfirmPressed}>
            <MyText style={styles.buttonText}>Добавить</MyText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    width: 360,
    borderWidth: 2,
    borderColor: Colors.lightGrey,
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#FFF',
    gap: 15,
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    height: 50,
    paddingHorizontal: 15,
    borderRadius: BORDER_RADIUS,
    borderColor: Colors.primary,
    borderWidth: 2,
    fontSize: 16,
  },
  button: {
    height: 60,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.secondaryText,
  },
});

export default CreateEmployeeModal;
