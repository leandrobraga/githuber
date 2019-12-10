import './config/ReactotronConfig';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import createNavigator from './routes';

const App = () => {
  const [userChecked, setUserChecked] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  const checkUser = async () => {
    const username = await AsyncStorage.getItem('@Githuber:username');
    setUserChecked(true);
    setUserLogged(!!username);
  };

  useEffect(() => {
    checkUser();
  }, []);
  if (!userChecked) return null;
  const Routes = createNavigator(userLogged);
  return (
    <Routes />
  );
};

export default App;
