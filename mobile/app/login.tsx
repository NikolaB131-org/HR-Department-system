import { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '../src/constants/colors';
import MyText from '../src/shared/MyText';
import MyTextInput from '../src/shared/MyTextInput';
import Spinner from '../src/shared/Spinner';
import { useSession } from '../src/utils/authContext';

function LoginPage() {
  const { signIn } = useSession();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onButtonPress = async () => {
    if (inputValue.length > 2) {
      setIsLoading(true);
      const res = await fetch('');
      if (res.ok) {
        const token = await res.json();
        signIn(token);
      }
      setIsLoading(false);
    } else {
      Alert.alert('Ошибка валидации', 'Имя пользователя должно содержать не менее 3 символов');
    }
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <MyTextInput
            style={[styles.inputAndButton, styles.input]}
            placeholder="Имя пользователя"
            onChangeText={setInputValue}
            value={inputValue}
          />
          <Pressable style={[styles.inputAndButton, styles.button]} onPress={onButtonPress}>
            <MyText style={styles.buttonText}>Login</MyText>
          </Pressable>
          <MyText style={styles.hintText}>Если вы не зарегистрированы, ваш аккаунт будет создан автоматически.</MyText>
        </View>
      </View>
      {isLoading && (
        <View style={styles.spinnerContainer}>
          <Spinner />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
  },
  inputAndButton: {
    height: 60,
    borderRadius: 12,
  },
  input: {
    paddingLeft: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.primary,
    fontSize: 16,
  },
  button: {
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.secondaryText,
  },
  hintText: {
    paddingHorizontal: 10,
    fontSize: 11,
    textAlign: 'center',
    color: Colors.grey,
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default LoginPage;
