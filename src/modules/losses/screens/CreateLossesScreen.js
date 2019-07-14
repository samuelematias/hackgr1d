import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationActions, StackActions } from 'react-navigation';

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

const WrapperButton = styled.View`
  flex: 1;
  align-items: center;
`;

const WrapperScrollView = styled.ScrollView.attrs(() => ({
  scrollEnabled: false,
  keyboardShouldPersistTaps: 'always',
}))``;

const WrapperHeaderTitle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.Text`
  font-size: ${typography.medium}px;
  font-family: ${type.sf.medium};
  color: ${black};
  text-align: center;
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

export function createLossesScreenConfig({ navigation }) {
  return {
    headerStyle: {
      backgroundColor: white,
      borderBottomColor: lightGrey,
      elevation: 0,
      marginTop: size(20),
    },
    headerTitle: (
      <WrapperHeaderTitle>
        <HeaderTitle>Criar Sinistro</HeaderTitle>
      </WrapperHeaderTitle>
    ),
    headerLeft: (
      <WrapperHeaderLeft
        onPress={() => {
          navigation.goBack();
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

const CreateLossesScreen = props => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleResetAction = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'TabBarStack',
          params: {},
        }),
      ],
    });

    return navigation.dispatch(resetAction);
  };

  const handleOnSubmitEditing = () => {
    if (inputValue) {
      handleResetAction();
    }
  };

  const myInputCallback = dataFromChild => {
    setInputValue(dataFromChild.inputValue);
  };

  return (
    <Container>
      <SafeArea>
        <StatusBarManager />
        <WrapperScrollView>
          <Content>
            <WrapperTextHello>
              <TextRestaurantName>Olá,</TextRestaurantName>
              <TextInfo>Descreva o motivo do Sinistro</TextInfo>
            </WrapperTextHello>
            <WrapperInput>
              <Input
                inputType="default"
                label="Descreva"
                returnKeyTyp="send"
                autoFocus
                callback={myInputCallback}
                onSubmitEditing={() => handleOnSubmitEditing()}
              />
            </WrapperInput>
            <WrapperButton>
              <Button
                variant="enable"
                onPress={() => {
                  setLoading(true);
                  handleResetAction();
                }}
                labelText="Enviar"
                buttonColor={inputValue ? angelBlue : lightGrey}
                labelColor={inputValue ? white : mediumGrey}
                isDisabled={!inputValue && true}
                loading={loading}
              />
            </WrapperButton>
          </Content>
        </WrapperScrollView>
      </SafeArea>
    </Container>
  );
};

export default CreateLossesScreen;

CreateLossesScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
