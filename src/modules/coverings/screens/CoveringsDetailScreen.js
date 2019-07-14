import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconAmbulance from 'react-native-vector-icons/FontAwesome5';
import IconCheck from 'react-native-vector-icons/Feather';
import { NavigationActions, StackActions } from 'react-navigation';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { StatusBarManager, Button } from '~/common/components';
import { Metrics, Colors, Fonts } from '~/themes';

const { size, iPhoneXHelper } = Metrics;
const { white, black, angelBlue, lightGrey, fineGrey } = Colors;
const { typography, type } = Fonts;

const WrapperHeaderLeft = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-left: ${size(16)};
`;

const WrapperHeaderRight = styled.View``;

const Container = styled.ScrollView`
  flex: 1;
  background: ${white};
  padding-top: ${size(10)};
`;

const SafeArea = styled.SafeAreaView`
  margin-top: ${iPhoneXHelper}px;
  background: ${white};
`;

const WrapperButton = styled.View`
  flex: 1;
  align-items: center;
  padding-top: ${hp('10%')}px;
  padding-bottom: ${hp('5%')}px;
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

const WrapperImg = styled.View`
  flex: 1;
  width: ${wp('100%')};
  justify-content: center;
  align-items: center;
  padding-top: ${hp('5%')};
`;

const WrapperAbout = styled.View`
  flex: 1;
  padding-left: ${hp('5%')};
  padding-right: ${hp('5%')};
  padding-top: ${hp('5%')};
`;

const WrapperWhatWeOffer = styled.View`
  padding-bottom: ${hp('2%')};
`;

const TextWhatWeOffer = styled.Text`
  text-align: left;
  font-family: ${type.sf.bold};
  font-size: ${typography.regular};
  color: ${angelBlue};
`;

const WrapperAboutWhatWeOffer = styled.View`
  padding-top: ${hp('3%')};
  border-bottom-color: ${lightGrey};
  border-bottom-width: 1;
`;

const TextAboutWhatWeOffer = styled.Text`
  text-align: left;
  font-family: ${type.sf.medium};
  font-size: ${typography.regular};
  color: ${fineGrey};
`;

const WrapperCriteria = styled.View`
  padding-top: ${hp('5%')};
  padding-left: ${hp('5%')};
  padding-right: ${hp('5%')};
`;

const WrapperAprovalCriteria = styled.View`
  padding-top: ${hp('2%')};
  flex: 1;
  flex-direction: row;
`;

const TextAprovalCriteria = styled.Text`
  text-align: left;
  font-family: ${type.sf.bold};
  font-size: ${typography.regular};
  color: ${angelBlue};
  padding-left: ${wp('2%')};
`;

const TextAboutAprovalCriteria = styled.Text`
  text-align: left;
  font-family: ${type.sf.medium};
  font-size: ${typography.regular};
  color: ${fineGrey};
  padding-left: ${wp('3%')};
`;

export function coveringsDetailScreenConfig({ navigation }) {
  return {
    headerStyle: {
      backgroundColor: white,
      borderBottomColor: lightGrey,
      elevation: 0,
      marginTop: size(20),
    },
    headerTitle: (
      <WrapperHeaderTitle>
        <HeaderTitle>{navigation.state.params.title}</HeaderTitle>
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

const CoveringsDetailScreen = props => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);

  const about = 'Caso você fique impossibilitado de exercer sua profissão,';
  const about1 = 'por causa de um aciente ou doença e Garante que,';
  const abou2 = 'receberá um valor para cada dia que não puder trabalhar. ';
  const about3 = 'Além disso, Oferece Indenização';
  const about4 = 'aos beneficiários caso ocorra morte acidental.';
  const aboutFull = `${about}${about1}${abou2}${about3}${about4}`;

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

  return (
    <Container>
      <SafeArea>
        <StatusBarManager />
        <WrapperScrollView>
          <WrapperImg>
            <IconAmbulance name="ambulance" size={size(40)} color={angelBlue} />
          </WrapperImg>
          <WrapperAbout>
            <WrapperWhatWeOffer>
              <TextWhatWeOffer>Oque oferecemos?</TextWhatWeOffer>
            </WrapperWhatWeOffer>
            <WrapperAboutWhatWeOffer>
              <TextAboutWhatWeOffer>{aboutFull}</TextAboutWhatWeOffer>
            </WrapperAboutWhatWeOffer>
          </WrapperAbout>
          <WrapperCriteria>
            <TextAprovalCriteria>Critérios de Aprovação</TextAprovalCriteria>
            <WrapperAprovalCriteria>
              <IconCheck name="check" size={size(18)} color={angelBlue} />
              <TextAboutAprovalCriteria>Idade 21-65</TextAboutAprovalCriteria>
            </WrapperAprovalCriteria>
            <WrapperAprovalCriteria>
              <IconCheck name="check" size={size(18)} color={angelBlue} />
              <TextAboutAprovalCriteria>
                Valor Parcial: R$ 1.000,00
              </TextAboutAprovalCriteria>
            </WrapperAprovalCriteria>
          </WrapperCriteria>

          <WrapperButton>
            <Button
              variant="enable"
              onPress={() => {
                setLoading(true);
                setTimeout(() => handleResetAction(), 500);
              }}
              labelText="Contratar"
              buttonColor={angelBlue}
              labelColor={white}
              loading={loading}
            />
          </WrapperButton>
        </WrapperScrollView>
      </SafeArea>
    </Container>
  );
};

export default CoveringsDetailScreen;

CoveringsDetailScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
