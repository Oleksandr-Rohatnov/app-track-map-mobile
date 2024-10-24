import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { MaterialIcons } from '@expo/vector-icons';
import { useStore } from '../../store/storeProvider';

const Header = observer(() => {
  const { authStore } = useStore();

  const handleLogout = useCallback(() => {
    authStore.logout();
  }, [authStore]);

  return (
    <View style={styles.root}>
      <View style={styles.leftContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Track Map</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
        <MaterialIcons name="logout" size={24} color="#00648d" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8
  },
  title: {
    color: '#00648d',
    fontSize: 24,
    fontWeight: 'bold'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 100,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: 'transparent'
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#00648d',
    marginRight: 4
  }
});

export default Header;
