import { Stack, router } from 'expo-router';
import React, { useEffect } from 'react';

import { Colors } from '../src/constants/colors';
import { SessionProvider, useSession } from '../src/utils/authContext';

function InitialLayout() {
  const { session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [session]);

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
        <Stack.Screen name="home/index" options={{ title: 'Home' }} />
      </Stack>
      <InitialLayout />
    </SessionProvider>
  );
}

export default RootLayout;
