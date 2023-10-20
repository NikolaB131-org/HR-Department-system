import { Pressable, StyleSheet, View } from 'react-native';

import { Colors } from '../../src/constants/colors';
import { Sizes } from '../../src/constants/sizes';
import MyText from '../../src/shared/MyText';
import { useSession } from '../../src/utils/authContext';

function ProfilePage() {
  const { signOut, username } = useSession();

  return (
    <View style={styles.container}>
      <MyText style={styles.username}>Имя пользователя: {username}</MyText>
      <Pressable style={styles.button} onPress={() => signOut()}>
        <MyText style={styles.buttonText}>Выйти из аккаунта</MyText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.paddingHorizontal,
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
  },
  button: {
    width: 200,
    height: 60,
    borderRadius: 12,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.secondaryText,
  },
});

export default ProfilePage;
