import 'react-native-reanimated';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeProvider';
import Main from "../components/Main";
import Login from "../components/Login";

const App = observer(() => {
  const { authStore } = useStore();
  return authStore.authKey ? <Main /> : <Login/>
});

export default App;
