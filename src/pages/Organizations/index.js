import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import { FlatList } from 'react-native-gesture-handler';

import api from '../../services/api';
import Header from '../../components/Header';
import OrganizationItem from './OrganizationItem';
import styles from './styles';


const Organizations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getOrgs = async () => {
    setRefreshing(true);
    const username = await AsyncStorage.getItem('@Githuber:username');
    const response = await api.get(`/users/${username}/orgs`);
    setData(response.data);
    setLoading(false);
    setRefreshing(false);
  };

  const renderListItem = ({ item }) => <OrganizationItem organization={item} />;

  const renderList = () => (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderListItem}
      onRefresh={getOrgs}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      refreshing={refreshing}
    />
  );

  useEffect(() => { getOrgs(); }, []);

  return (
    <View style={styles.container}>
      <Header title="Organizações" />
      { loading ? <ActivityIndicator style={styles.loading} /> : renderList() }
    </View>
  );
};

const TabIcon = ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Organizations.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default Organizations;
