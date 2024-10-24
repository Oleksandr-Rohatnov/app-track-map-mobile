import 'react-native-reanimated';
import React from 'react';
import { Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { StoreProvider } from '../store/storeProvider';

const Layout = observer(() => {
  return (
    <StoreProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </StoreProvider>
  );
});

export default Layout;
