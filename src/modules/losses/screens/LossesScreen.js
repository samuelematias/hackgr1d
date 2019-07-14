import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { StatusBarManager, CollapsingToolbar, Card } from '~/common/components';

import { Metrics, Colors, Fonts } from '~/themes';

const { size } = Metrics;
const { fineGrey } = Colors;
const { type, typography } = Fonts;

const Content = styled.View`
  display: flex;
  flex: 1;
  margin-left: ${wp('2%')};
  margin-right: ${wp('2%')};
`;

const Separator = styled.View`
  height: ${hp('2%')};
`;

const WrapperBlankState = styled.View`
  flex: 1;
  height: ${hp('60%')};
  align-items: center;
  justify-content: center;
`;

const WrapperBlankStateInfo = styled.View`
  flex: 1;
  padding-left: ${size(15)};
  padding-right: ${size(15)};
  align-items: center;
  justify-content: center;
`;

const TextBlankState = styled.Text.attrs(() => ({
  ellipsizeMode: 'tail',
  numberOfLines: 2,
}))`
  text-align: center;
  font-family: ${type.sf.medium};
  font-size: ${typography.regular};
  color: ${fineGrey};
  font-weight: normal;
  padding-bottom: ${size(20)};
`;

const WrapperImgBlankState = styled.View`
  padding-bottom: ${size(20)};
  align-items: center;
  justify-content: center;
`;

export function lossesScreenConfig() {
  return {
    header: null,
  };
}

const LossesScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;

  const data = [];

  const showList = data.length > 0;

  const renderLossessListItem = item => {
    const { title, about, status } = item;

    return (
      <Card
        title={title}
        about={about}
        status={status}
        typeCard="losse"
        onPress={() =>
          navigate('', {
            title,
            about,
          })
        }
      />
    );
  };

  const renderItemSeparator = () => <Separator />;

  const renderLossessList = () => (
    <FlatList
      data={data}
      renderItem={({ item }) => renderLossessListItem(item)}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => renderItemSeparator()}
      ListFooterComponent={() => <Separator />}
      ListHeaderComponent={() => <Separator />}
    />
  );

  const renderBlankState = () => (
    <WrapperBlankState>
      <WrapperBlankStateInfo>
        <WrapperImgBlankState>
          <Icon name="file-document" size={size(30)} color={fineGrey} />
        </WrapperImgBlankState>
        <TextBlankState>Oba!</TextBlankState>
        <TextBlankState>Você aind não possui nenhum Sinistro.</TextBlankState>
      </WrapperBlankStateInfo>
    </WrapperBlankState>
  );

  const chooseRender = () => {
    let returnChoosen;
    if (showList) {
      returnChoosen = renderLossessList();
    } else {
      returnChoosen = renderBlankState();
    }
    return returnChoosen;
  };

  return (
    <CollapsingToolbar
      headerTitle="Sinistro"
      headerLeftOn
      onPress={() => navigation.navigate('CreateLossesScreen', {})}
    >
      <StatusBarManager />
      <Content>{chooseRender()}</Content>
    </CollapsingToolbar>
  );
};

export default LossesScreen;

LossesScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
