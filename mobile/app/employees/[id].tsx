import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { EmployeeType } from '../../../backend/src/modules/employee/employee.model';
import { Colors } from '../../src/constants/colors';
import MyText from '../../src/shared/MyText';
import Spinner from '../../src/shared/Spinner';
import { useSession } from '../../src/utils/authContext';

function EmployeePage() {
  const { id } = useLocalSearchParams();
  const { session } = useSession();
  const [data, setData] = useState<EmployeeType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/employees/${id}`, {
          headers: {
            authorization: `Bearer ${session}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setData(data);
        } else {
          throw data.errMessage;
        }
      } catch (error) {
        Alert.alert('Ошибка при получении информации о сотруднике', error?.toString());
      }
    })();
  }, []);

  return (
    <>
      {data ? (
        <View style={styles.container}>
          <MyText style={styles.text}>Имя: {data.name}</MyText>
          <MyText style={styles.text}>Возраст: {data.age}</MyText>
          <MyText style={styles.text}>Почта: {data.email}</MyText>
          <MyText style={styles.text}>Номер телефона: {data.phoneNumber}</MyText>
          <MyText style={styles.text}>Зарплата: {data.salary}</MyText>
          <MyText style={styles.text}>Лет опыта: {data.yearsOfExperience}</MyText>
        </View>
      ) : (
        <View style={styles.spinnerContainer}>
          <Spinner width={50} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  text: {
    color: Colors.primaryText,
    fontSize: 18,
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    alignItems: 'center',
  },
});

export default EmployeePage;
