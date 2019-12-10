import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/api';

import styles from './styles';

const Welcome = (props) => {
  const { navigation } = props;
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const checkUserExist = async (userName) => {
    const user = await api.get(`/users/${userName}`);
    return user;
  };

  const saveUser = async (userName) => {
    await AsyncStorage.setItem('@Githuber:username', userName);
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await checkUserExist(username);
      await saveUser(username);
      navigation.navigate('Repositories');
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#444" />
      <Text style={styles.title}>Bem Vindo</Text>
      <Text style={styles.text}>
        Para continuar é necessário que você informe seu usuário no github
      </Text>
      { error && <Text style={styles.error}>Usuário Inexistente</Text>}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu usuário"
          underlineColorAndroid="transparent"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => signIn()}>
          {
            loading ? <ActivityIndicator size="small" color="#FFF" />
              : <Text style={styles.buttonText}>Prosseguir</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

Welcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Welcome;
