import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Metrics, Colors, Fonts } from '~/themes';

const { size } = Metrics;
const { fineBlack, fineGrey, angelBlue, white, progressBlue } = Colors;
const { type, typography } = Fonts;

const Container = styled.View.attrs(() => ({
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
}))`
  display: flex;
  flex: 1;
  align-items: flex-start;
  height: ${hp('20%')};
  background: white;
  border-radius: ${size(5)};
  padding-left: ${wp('3%')};
  padding-right: ${wp('3%')};
  padding-top: ${hp('3%')};
  padding-bottom: ${hp('3%')};
  margin-left: ${wp('1%')};
  margin-right: ${wp('1%')};
`;

const ContentOnPress = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  align-items: flex-start;
`;

const WrapperTitle = styled.View`
  width: ${wp('70%')};
  justify-content: center;
  margin-bottom: ${hp('2%')};
`;

const TextTitle = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
}))`
  text-align: left;
  font-family: ${type.sf.regular};
  font-size: ${typography.small};
  color: ${fineBlack};
  font-weight: 500;
`;

const WrapperDetails = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${hp('2%')};
  width: ${wp('80%')};
  align-items: center;
`;

const WrapperAbout = styled.View`
  width: ${wp('20%')};
  justify-content: center;
  align-items: flex-start;
`;

const TextAbout = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
}))`
  text-align: center;
  font-family: ${type.sf.medium};
  font-size: ${typography.smallMinus};
  color: ${fineGrey};
  font-weight: normal;
`;

const WrapperImgCard = styled.View`
  height: ${hp('4%')};
  justify-content: center;
  align-items: center;
  margin-bottom: ${hp('2%')};
`;

const CategoryBox = styled.View`
  height: ${hp('4%')};
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
  border-radius: ${size(5)};
  padding-left: ${wp('3%')};
  padding-right: ${wp('3%')};
  margin-bottom: ${hp('2%')};
`;

const CategoryName = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}))`
  text-align: center;
  font-family: ${type.sf.semiBold};
  font-size: ${typography.small};
  color: ${white};
  font-weight: 500;
`;

const WrapperInfo = styled.View`
  flex: 1;
  flex-direction: row;
  width: ${wp('78%')};
  justify-content: space-between;
  align-items: center;
`;

export default function Card(props) {
  const { title, about, status, onPress } = props;

  return (
    <Container>
      <ContentOnPress onPress={onPress ? () => onPress() : null}>
        <WrapperInfo>
          <WrapperImgCard>
            <Icon name="ambulance" size={size(20)} color={angelBlue} />
          </WrapperImgCard>
          <CategoryBox color={status ? progressBlue : white}>
            <CategoryName>{status}</CategoryName>
          </CategoryBox>
        </WrapperInfo>
        <WrapperTitle>
          <TextTitle>{title}</TextTitle>
        </WrapperTitle>
        <WrapperDetails>
          <WrapperAbout>
            <TextAbout>{about}</TextAbout>
          </WrapperAbout>
        </WrapperDetails>
      </ContentOnPress>
    </Container>
  );
}

Card.defaultProps = {
  title: '',
  about: '',
  onPress: () => {},
};

Card.propTypes = {
  title: PropTypes.string,
  about: PropTypes.string,
  onPress: PropTypes.func,
};
