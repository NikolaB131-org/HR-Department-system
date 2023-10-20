import { Stack, router } from 'expo-router';
import React, { useEffect } from 'react';

import { Colors } from '../src/constants/colors';
import { SessionProvider, useSession } from '../src/utils/authContext';

function InitialLayout() {
  const { isSessionLoading, session } = useSession();

  useEffect(() => {
    if (!isSessionLoading) {
      if (session) {
        router.replace('/employees');
      } else {
        router.replace('/login');
      }
    }
  }, [isSessionLoading, session]);

  return null;
}

function RootLayout() {
  return (
    <SessionProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
          contentStyle: { backgroundColor: '#FFF' },
        }}>
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="employees/index" options={{ title: 'Сотрудники' }} />
        <Stack.Screen name="employees/[id]" options={{ title: 'Сотрудник' }} />
        <Stack.Screen name="profile/index" options={{ title: 'Профиль' }} />
      </Stack>
      <InitialLayout />
    </SessionProvider>
  );
}

export default RootLayout;
