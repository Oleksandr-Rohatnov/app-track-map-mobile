import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeProvider';
import Tracker from '../Tracker';
import { TrackerT } from '../../types/tracker';

const Map = observer(() => {
  const { trackerStore } = useStore();
  const defaultPosition = {
    latitude: 50.4501,
    longitude: 30.5234,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  };

  const [currentPosition, setCurrentPosition] = useState(defaultPosition);
  const [visibleTrackers, setVisibleTrackers] = useState<TrackerT[] | undefined>(undefined);

  const filterVisibleTrackers = (region: Region, trackers?: TrackerT[]) => {
    return trackers?.filter((tracker) => {
      const [latitude, longitude] = tracker.coordinates;
      return (
        latitude >= region.latitude - region.latitudeDelta / 2 &&
        latitude <= region.latitude + region.latitudeDelta / 2 &&
        longitude >= region.longitude - region.longitudeDelta / 2 &&
        longitude <= region.longitude + region.longitudeDelta / 2
      );
    });
  };

  const updateVisibleTrackers = (region: Region) => {
    const visible = filterVisibleTrackers(region, trackerStore.trackers);
    setVisibleTrackers(visible);
  };

  useEffect(() => {
    updateVisibleTrackers(currentPosition);
  }, [trackerStore.trackers]);

  const onRegionChangeComplete = (region: Region) => {
    setCurrentPosition(region);
    updateVisibleTrackers(region);
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={currentPosition}
      showsUserLocation
      scrollEnabled
      zoomEnabled
      showsScale
      onRegionChangeComplete={onRegionChangeComplete}
      showsCompass
      showsMyLocationButton
    >
      {visibleTrackers?.map((tracker) => <Tracker key={tracker.id} tracker={tracker} />)}
      {trackerStore.lostTrackers?.map((tracker, i) => (
        <Tracker key={tracker.id + i + 'L'} tracker={tracker} isLost />
      ))}
    </MapView>
  );
});

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 48
  }
});

export default Map;
