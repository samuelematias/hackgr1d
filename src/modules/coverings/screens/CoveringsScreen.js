import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { StatusBarManager, CollapsingToolbar, Card } from '~/common/components';

const Content = styled.View`
  display: flex;
  flex: 1;
  margin-left: ${wp('2%')};
  margin-right: ${wp('2%')};
`;

const Separator = styled.View`
  height: ${hp('2%')};
`;

export function coveringsScreenConfig() {
  return {
    header: null,
  };
}

const CoveringsScreen = props => {
  const { navigation } = props;
  const { navigate } = navigation;

  const data = [
    {
      id: '1',
      title: 'DIT',
      about: 'Sobre o DIT.',
      status: 'Em Progresso',
    },
  ];

  const renderCoveringsListItem = item => {
    const { title, about, status } = item;

    return (
      <Card
        title={title}
        about={about}
        status={status}
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

  const renderCoveringsList = () => (
    <FlatList
      data={data}
      renderItem={({ item }) => renderCoveringsListItem(item)}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={() => renderItemSeparator()}
      ListFooterComponent={() => <Separator />}
      ListHeaderComponent={() => <Separator />}
    />
  );

  return (
    <CollapsingToolbar headerTitle="Coberturas">
      <StatusBarManager />
      <Content>{renderCoveringsList()}</Content>
    </CollapsingToolbar>
  );
};

export default CoveringsScreen;

CoveringsScreen.propTypes = {
  navigation: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
};
