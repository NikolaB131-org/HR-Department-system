import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';

import { EmployeeType } from '../../../backend/src/modules/employee/employee.model';
import PersonSvg from '../../src/assets/person.svg';
import PlusInCircleSvg from '../../src/assets/plus_in_circle.svg';
import SearchSvg from '../../src/assets/search.svg';
import { Sizes } from '../../src/constants/sizes';
import CreateEmployeeModal from '../../src/shared/CreateEmployeeModal';
import EmployeePreview, { ItemsSeparator } from '../../src/shared/EmployeePreview';
import MyText from '../../src/shared/MyText';
import MyTextInput from '../../src/shared/MyTextInput';
import Spinner from '../../src/shared/Spinner';
import { useSession } from '../../src/utils/authContext';

function EmployeesPage() {
  const { session } = useSession();
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [employeesPersistance, setEmployeesPersistance] = useState<EmployeeType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/employees`, {
          headers: {
            authorization: `Bearer ${session}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setEmployees(data);
          setEmployeesPersistance(data);
        } else {
          throw data.errMessage;
        }
      } catch (error) {
        Alert.alert('Ошибка при получении списка сотрудников', error?.toString());
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onEmployeePreviewPress = (id: string) => {
    router.push(`/employees/${id}`);
  };

  const getHeaderLeft = () => {
    return (
      <Pressable hitSlop={20} onPress={() => router.push(`/profile`)}>
        <PersonSvg width={28} height={28} />
      </Pressable>
    );
  };

  const getHeaderRight = () => {
    const onButtonPress = () => {
      setHeaderTitleElement(prev => {
        if (prev) {
          setEmployees(employeesPersistance);
          return null;
        }
        return <HeaderTitle onValueChanged={onSearchValueChanged} />;
      });
    };

    return (
      <Pressable hitSlop={20} onPress={onButtonPress}>
        <SearchSvg width={24} height={24} />
      </Pressable>
    );
  };

  const onSearchValueChanged = (value: string) => {
    if (value) {
      setEmployees(prev => prev.filter(employee => new RegExp(value, 'i').test(employee.name)));
    } else {
      setEmployees(employeesPersistance);
    }
  };

  function HeaderTitle({ onValueChanged }: { onValueChanged: (value: string) => void }) {
    const [value, setValue] = useState('');

    useEffect(() => {
      onValueChanged(value);
    }, [onValueChanged, value]);

    const styles = StyleSheet.create({
      container: {
        width: 230,
        paddingHorizontal: 12,
        paddingVertical: 5,
        backgroundColor: '#FFF',
        fontSize: 16,
        borderRadius: 10,
      },
    });

    return (
      <MyTextInput value={value} onChangeText={setValue} style={styles.container} placeholder="Введите ФИО" autoFocus />
    );
  }

  const [headerTitleElement, setHeaderTitleElement] = useState<React.ReactElement | null>(null);

  const onEmployeeCreateConfirm = async (employee: Omit<EmployeeType, 'id' | 'imageUrl'>) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/employees`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(employee),
      });
      const data = await res.json();
      if (res.ok) {
        setEmployees(prev => [...prev, data]);
        setEmployeesPersistance(prev => [...prev, data]);
      } else {
        throw data.errMessage;
      }
    } catch (error) {
      Alert.alert('Ошибка при добавлении нового сотрудника', error?.toString());
    }
  };

  const onEmployeeDeletePress = async (id: string) => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: { authorization: `Bearer ${session}` },
      });
      if (res.ok) {
        setEmployees(prev => prev.filter(employee => employee.id !== id));
        setEmployeesPersistance(prev => prev.filter(employee => employee.id !== id));
      } else {
        throw (await res.json()).errMessage;
      }
    } catch (error) {
      Alert.alert('Ошибка при удалении сотрудника', error?.toString());
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: getHeaderLeft,
          headerRight: getHeaderRight,
          headerTitle: () => headerTitleElement ?? <MyText style={styles.header}>Сотрудники</MyText>,
          headerBackVisible: false,
        }}
      />
      {isLoading ? (
        <View style={styles.spinnerContainer}>
          <Spinner width={50} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.container}
          data={employees}
          ItemSeparatorComponent={ItemsSeparator}
          renderItem={({ item }) => (
            <EmployeePreview
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              onPress={() => onEmployeePreviewPress(item.id)}
              onDeletePress={onEmployeeDeletePress}
            />
          )}
        />
      )}
      <CreateEmployeeModal
        isVisible={isAddEmployeeModalVisible}
        setIsVisible={setIsAddEmployeeModalVisible}
        onConfirm={employee => onEmployeeCreateConfirm(employee)}
      />
      <PlusInCircleSvg
        style={styles.plusButton}
        width={62}
        height={62}
        onPress={() => setIsAddEmployeeModalVisible(true)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.paddingHorizontal,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  spinnerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF',
  },
});

export default EmployeesPage;
