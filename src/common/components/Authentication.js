import React, { useEffect } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';

import { Colors } from '~/themes';

const { angelBlue, mediumGrey } = Colors;

const Container = styled.View`
  flex: 1;
  background: white;
`;

const WrapperLoading = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Authentication = props => {
  const { navigation } = props;
  const { navigate, state } = navigation;
  const isLogout = state.params && navigation.state.params.isLogout;

  const getToken = async () => {
    let returnToken;
    try {
      const token = await AsyncStorage.getItem('@access_token');
      if (token !== null) {
        returnToken = true;
      } else {
        returnToken = false;
      }
    } catch (e) {
      // error reading value
    }
    return returnToken;
  };

  useEffect(() => {
    getToken()
      .then(LoggedIn => {
        navigate(LoggedIn ? 'TabBarStack' : 'DashboardScreen');
      })
      .catch(() => {
        console.log('error on auth loading');
      });
  }, [isLogout]);

  return (
    <Container>
      <WrapperLoading>
        <ActivityIndicator
          color={Platform.OS === 'android' ? angelBlue : mediumGrey}
        />
      </WrapperLoading>
    </Container>
  );
};

export default Authentication;

Authentication.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
