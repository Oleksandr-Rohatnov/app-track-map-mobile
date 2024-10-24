import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { observer } from 'mobx-react-lite';
import { TrackerT } from '../../types/tracker';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

type PropsT = {
  tracker: TrackerT;
  isLost?: boolean;
};

const Tracker = observer(({ tracker, isLost }: PropsT) => {
  const iconColor = isLost ? '#717171' : '#0063ab';

  return (
    <Marker
      coordinate={{
        latitude: tracker.coordinates[0],
        longitude: tracker.coordinates[1]
      }}
      id={tracker.id + (isLost ? 'L' : '')}
      title={`Tracker ${tracker.id}`}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
    >
      <View
        style={{
          transform: [{ rotate: `${tracker.bearing}deg` }],
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <MaterialIcons name="navigation" size={30} color={iconColor} />
      </View>
      <Callout>
        <View style={{ width: 200 }}>
          {isLost && <Text style={{ color: 'red' }}>Lost</Text>}
          <Text>ID: {tracker.id}</Text>
          <Text>Coordinates: {tracker.coordinates.join(', ')}</Text>
          <Text>Bearing: {tracker.bearing}°</Text>
          <Text>Last update: {new Date(tracker.lastUpdate).toLocaleString()}</Text>
        </View>
      </Callout>
    </Marker>
  );
});

export default Tracker;
