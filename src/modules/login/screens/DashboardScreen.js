import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform, BackHandler } from 'react-native';

import styled from 'styled-components/native';

import { StatusBarManager, Button } from '~/common/components';
import { SnapCarousel } from '~/modules/login/components';
import { Metrics, Colors, Images, Fonts } from '~/themes';

const { size, iPhoneXHelper, pw } = Metrics;
const { white, black, angelBlue } = Colors;
const { imgScroll1, imgScroll2, imgScrol3 } = Images;
const { typography, type } = Fonts;

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${white};
`;

const SafeArea = styled.SafeAreaView`
  margin-top: ${iPhoneXHelper}px;
  background: ${white};
`;

const WrapperButton = styled.View`
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${size(25)}px;
`;

const WrapperForgotPassword = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: ${size(10)};
`;

const WrapperLogin = styled.TouchableOpacity``;

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

const WrapperCarousel = styled.View`
  flex: 1;
  justify-content: center;
`;

const WrapperCarouselTitle = styled.View`
  padding-top: ${size(10)};
  width: ${pw(80)};
  justify-content: center;
  align-items: center;
`;

const TitleCarousel = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 3,
}))`
  font-size: ${typography.regular}px;
  font-family: ${type.sf.light};
  color: ${black};
  text-align: center;
`;

const ImgCarousel = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  height: ${size(200)}px;
  width: ${size(200)}px;
`;

const WrapperImgCarousel = styled.View.attrs(props => ({
  key: props.key,
}))`
  width: ${pw(85)}px;
  justify-content: center;
  align-items: center;
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

  const renderCarousel = () => {
    const banners = [
      {
        id: '1',
        cover: imgScroll1,
        title: 'Trabalhar no trânsito é difícil, nós sabemos.',
      },
      {
        id: '2',
        cover: imgScroll2,
        title:
          'Com o Allie você tem acesso simples a seguros flexíveis que cabem no seu bolso.',
      },
      {
        id: '3',
        cover: imgScrol3,
        title:
          'Assim, em poucos minutos, você pode se recuperar tranquilo, até estar pronto pras próximas corridas :)',
      },
    ];
    return (
      <WrapperCarousel>
        <SnapCarousel>
          {banners.map((item, index) => (
            <WrapperImgCarousel key={index.toString()}>
              <ImgCarousel source={item.cover} />
              <WrapperCarouselTitle>
                <TitleCarousel>{item.title}</TitleCarousel>
              </WrapperCarouselTitle>
            </WrapperImgCarousel>
          ))}
        </SnapCarousel>
      </WrapperCarousel>
    );
  };

  return (
    <Container>
      <SafeArea>
        <StatusBarManager />
        {renderCarousel()}
        <WrapperButton>
          <Button
            variant="enable"
            onPress={() => navigate('')}
            labelText="Registrar"
          />
          <WrapperForgotPassword>
            <TextForgotPassword>Ja possui conta?</TextForgotPassword>
            <WrapperLogin
              onPress={() => navigate('EmailScreen')}
              hitSlop={{
                top: 10,
                left: 10,
                bottom: 10,
                right: 10,
              }}
            >
              <TextForgotSignUp> Faça o login.</TextForgotSignUp>
            </WrapperLogin>
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
