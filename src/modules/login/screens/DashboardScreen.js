import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform, BackHandler } from 'react-native';

import styled from 'styled-components/native';

import { StatusBarManager, Button } from '~/common/components';
import { Metrics, Colors, Images, Fonts } from '~/themes';

const { size, iPhoneXHelper } = Metrics;
const { white, black, angelBlue } = Colors;
const { imgMansion } = Images;
const { typography, type } = Fonts;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${white};
`;

const WrapperLogo = styled.View`
  flex: 1;
  align-items: center;
`;

const Logo = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  height: ${size(412)}px;
  width: ${size(350)}px;
  margin-top: ${size(50)};
  margin-bottom: ${size(100)};
`;

const SafeArea = styled.SafeAreaView`
  margin-top: ${iPhoneXHelper}px;
  background: ${white};
`;

const WrapperButton = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${size(25)}px;
`;

const WrapperForgotPassword = styled.TouchableOpacity`
  /* margin-top: ${size(20)}; */
  justify-content: center;
  align-items: center;
  /* width: ${size(150)}; */
  flex-direction: row;
  margin-left: ${size(10)};
`;

const TextForgotPassword = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: ${typography.medium}px;
  font-family: ${type.sf.regular};
  color: ${black};
`;

const TextForgotSignUp = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: ${typography.medium}px;
  font-family: ${type.sf.regular};
  color: ${angelBlue};
`;

export function dashboardScreenConfig() {
  return {
    header: null,
  };
}

const DashboardScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;
  const handleBackButton = () => true;

  // Disable Android hardware back button on DashboardScreen
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }
    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      }
    };
  }, []);

  return (
    <Container>
      <SafeArea>
        <StatusBarManager />
        <WrapperLogo>
          <Logo source={imgMansion} />
        </WrapperLogo>
        <WrapperButton>
          <Button
            variant="enable"
            onPress={() => navigate('')}
            labelText="Acessar"
          />
          <WrapperForgotPassword
            onPress={() => {}}
            hitSlop={{
              top: 10,
              left: 10,
              bottom: 10,
              right: 10,
            }}
          >
            <TextForgotPassword>Novo por aqui?</TextForgotPassword>
            <TextForgotSignUp> Cadastre-se</TextForgotSignUp>
          </WrapperForgotPassword>
        </WrapperButton>
      </SafeArea>
    </Container>
  );
};

export default DashboardScreen;

DashboardScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
