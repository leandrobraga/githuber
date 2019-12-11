import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import api from '../../services/api';
import Header from '../../components/Header';
import RepositoryItem from './RepositoryItem';
import styles from './styles';


const Repositories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getRepos = async () => {
    setRefreshing(true);
    const username = await AsyncStorage.getItem('@Githuber:username');
    const response = await api.get(`/users/${username}/repos`);
    setData(response.data);
    setLoading(false);
    setRefreshing(false);
  };

  const renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  const renderList = () => (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderListItem}
      onRefresh={getRepos}
      refreshing={refreshing}
    />
  );

  useEffect(() => { getRepos(); }, []);

  return (
    <View style={styles.container}>
      <Header title="Repositórios" />
      { loading ? <ActivityIndicator style={styles.loading} /> : renderList() }
    </View>
  );
};

const TabIcon = ({ tintColor }) => <Icon name="list" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Repositories.navigationOptions = {
  tabBarIcon: TabIcon,
};


export default Repositories;
