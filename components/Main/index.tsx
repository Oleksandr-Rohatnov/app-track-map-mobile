import { View, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Header from '../Header';
import Map from '../Map';
import { useStore } from '../../store/storeProvider';
import { useFocusEffect } from 'expo-router';

const Main = observer(() => {
  const { authStore, trackerStore } = useStore();

  useFocusEffect(
    React.useCallback(() => {
      const fetchTrackers = () => {
        trackerStore.getTrackers(authStore.authKey);
        trackerStore.cleanupLostTrackers();
      };

      if (authStore.authKey) {
        fetchTrackers();

        const interval = setInterval(fetchTrackers, 2000);

        return () => clearInterval(interval);
      }
    }, [trackerStore, authStore.authKey])
  );

  return (
    <View style={styles.container}>
      <Header />
      <Map />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default Main;
