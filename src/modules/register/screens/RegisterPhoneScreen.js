import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Platform, BackHandler } from 'react-native';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { StatusBarManager, Button, Input } from '~/common/components';
import { Metrics, Colors, Fonts } from '~/themes';

const { size, iPhoneXHelper } = Metrics;
const { white, black, angelBlue, lightGrey, mediumGrey } = Colors;
const { typography, type } = Fonts;

const WrapperHeaderLeft = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-left: ${size(16)};
`;

const WrapperHeaderRight = styled.View``;

const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  background: ${white};
  padding-top: ${size(10)};
`;

const Content = styled.View`
  padding-left: ${size(16)};
`;

const SafeArea = styled.SafeAreaView`
  margin-top: ${iPhoneXHelper}px;
  background: ${white};
`;

const WrapperTextHello = styled.View``;

const TextRestaurantName = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  font-size: ${typography.h1}px;
  font-family: ${type.sf.bold};
  color: ${black};
`;

const TextInfo = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
}))`
  font-size: ${typography.h1}px;
  font-family: ${type.sf.regular};
  color: ${black};
`;

const WrapperInput = styled.View`
  padding-top: ${size(10)};
`;

const WrapperButton = styled.View`
  flex: 1;
  align-items: center;
  padding-top: ${size(10)}px;
`;

const WrapperScrollView = styled.ScrollView.attrs(() => ({
  scrollEnabled: false,
  keyboardShouldPersistTaps: 'always',
}))``;

const WrapperOptions = styled.View`
  flex: 1;
  justify-content: center;
`;

export function RegisterPhoneScreenConfig({ navigation }) {
  return {
    headerStyle: {
      backgroundColor: white,
      borderBottomColor: 'transparent',
      elevation: 0,
      marginTop: size(20),
    },
    headerLeft: (
      <WrapperHeaderLeft
        onPress={() => {
          navigation.goBack();
          navigation.state.params.onGoBack();
        }}
        hitSlop={{
          top: 10,
          left: 10,
          bottom: 10,
          right: 10,
        }}
      >
        <Icon name="arrow-left" size={size(18)} color={angelBlue} />
      </WrapperHeaderLeft>
    ),
    headerRight: <WrapperHeaderRight />,
  };
}

const RegisterPhoneScreen = props => {
  const { navigation } = props;
  const { navigate, state } = navigation;
  const { params } = state;
  const { nameValue } = params;
  const [autoFocusRef, setAutoFocusRef] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleBackButton = () => true;

  // Disable Android hardware back button on RegisterPhoneScreen
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

  function handleAutoFocusRef() {
    return setAutoFocusRef(true);
  }

  const myInputCallback = dataFromChild => {
    setInputValue(dataFromChild.inputValue);
  };

  const handleOnSubmitEditing = () => {
    if (inputValue) {
      setAutoFocusRef(false);
      navigate('RegisterEmailScreen', {
        nameValue,
        phoneValue: inputValue,
        onGoBack: () => handleAutoFocusRef(),
      });
    }
  };

  return (
    <Container>
      <SafeArea>
        <StatusBarManager />
        <WrapperScrollView>
          <Content>
            <WrapperTextHello>
              <TextRestaurantName>Agora,</TextRestaurantName>
              <TextInfo>Cadastre seu Telefone</TextInfo>
            </WrapperTextHello>
            <WrapperOptions>
              <WrapperInput>
                <Input
                  autoFocusRef={autoFocusRef}
                  inputType="phone"
                  label="Telefone"
                  autoFocus
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  autoCompleteType="tel"
                  callback={myInputCallback}
                  onSubmitEditing={() => handleOnSubmitEditing()}
                />
              </WrapperInput>
              <WrapperButton>
                <Button
                  variant="enable"
                  onPress={() => handleOnSubmitEditing()}
                  labelText="Continuar"
                  buttonColor={inputValue ? angelBlue : lightGrey}
                  labelColor={inputValue ? white : mediumGrey}
                  isDisabled={!inputValue && true}
                />
              </WrapperButton>
            </WrapperOptions>
          </Content>
        </WrapperScrollView>
      </SafeArea>
    </Container>
  );
};

export default RegisterPhoneScreen;

RegisterPhoneScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
