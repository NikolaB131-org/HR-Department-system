import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';
import { useCallback, useEffect, useReducer } from 'react';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return useReducer(
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export function useStorageState(key: string): UseStateHook<string> {
  // Public
  const [state, setState] = useAsyncState<string>();

  // Get
  useEffect(() => {
    (async () => {
      const value = await getItemAsync(key);
      setState(value);
    })();
  }, [key]);

  // Set
  const setValue = useCallback(
    async (value: string | null) => {
      if (value === null) {
        await deleteItemAsync(key);
      } else {
        await setItemAsync(key, value);
      }
      setState(value);
    },
    [key],
  );

  return [state, setValue];
}
