import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconUser from 'react-native-vector-icons/FontAwesome';
import IconEmail from 'react-native-vector-icons/MaterialIcons';
import IconLogout from 'react-native-vector-icons/SimpleLineIcons';

import { StatusBarManager, CollapsingToolbar } from '~/common/components';

import { Metrics, Colors, Fonts } from '~/themes';

const { size } = Metrics;
const { fineGrey, angelBlue, lightGrey, strawberry } = Colors;
const { type, typography } = Fonts;

const Content = styled.View`
  display: flex;
  flex: 1;
`;

const WrapperRectangle = styled.View`
  flex: 1;
  flex-direction: row;
  height: ${hp('10%')};
  border-top-color: ${lightGrey};
  border-top-width: 1;
  border-bottom-color: ${lightGrey};
  border-bottom-width: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${hp('5%')};
`;

const WrapperText = styled.View`
  align-items: center;
  justify-content: center;
  width: ${wp('70%')};
`;

const TextInfo = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: center;
  font-family: ${type.sf.medium};
  font-size: ${typography.regular};
  color: ${fineGrey};
  font-weight: normal;
  padding-left: ${size(10)};
  /* padding-bottom: ${size(20)}; */
`;

const WrapperRectangleLogout = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  height: ${hp('10%')};
  border-top-color: ${lightGrey};
  border-top-width: 1;
  border-bottom-color: ${lightGrey};
  border-bottom-width: 1;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${hp('25%')};
`;

const WrapperTextLogout = styled.View`
  align-items: center;
  justify-content: center;
`;

const TextInfoLogout = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: center;
  font-family: ${type.sf.medium};
  font-size: ${typography.regular};
  color: ${fineGrey};
  font-weight: normal;
  padding-left: ${size(10)};
  /* padding-bottom: ${size(20)}; */
`;

export function myDataScreenConfig() {
  return {
    header: null,
  };
}

const MyDataScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;

  const user = 'Samuel Mataraso';
  const email = 'samuelmataraso@gmail.com';

  return (
    <CollapsingToolbar headerTitle="Meus dados">
      <StatusBarManager />
      <Content>
        <WrapperRectangle>
          <IconUser name="user" size={size(30)} color={angelBlue} />
          <WrapperText>
            <TextInfo>{user}</TextInfo>
          </WrapperText>
        </WrapperRectangle>
        <WrapperRectangle>
          <IconEmail name="email" size={size(30)} color={angelBlue} />
          <WrapperText>
            <TextInfo>{email}</TextInfo>
          </WrapperText>
        </WrapperRectangle>
        <WrapperRectangleLogout>
          <IconLogout name="logout" size={size(30)} color={strawberry} />
          <WrapperTextLogout>
            <TextInfoLogout>Sair</TextInfoLogout>
          </WrapperTextLogout>
        </WrapperRectangleLogout>
      </Content>
    </CollapsingToolbar>
  );
};

export default MyDataScreen;

MyDataScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
