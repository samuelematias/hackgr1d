import React from 'react';
import { StyleSheet } from 'react-native';

import styled from 'styled-components/native';

import { Colors, Fonts, Metrics, Images } from '~/themes';

const { white, fineBlack, fineGrey } = Colors;
const { type, typography } = Fonts;
const { size } = Metrics;
const { iconCoverings, iconMyData, iconLosses } = Images;

const WrapperTaBarIcon = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  width: ${size(22)};
  height: ${size(22)};
`;

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: type.sf.medium,
    fontSize: typography.tiny,
  },
  tabBarItem: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  tabBar: {
    backgroundColor: white,
    borderTopColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
  },
});

function tabBarIcon(focused, navigation) {
  const { routeName } = navigation.state;
  let returnTabBarIcon;
  if (routeName === 'CoveringsStack') {
    returnTabBarIcon = <WrapperTaBarIcon source={iconCoverings} />;
  } else if (routeName === 'LossesStack') {
    returnTabBarIcon = <WrapperTaBarIcon source={iconLosses} />;
  } else if (routeName === 'MyDataStack') {
    returnTabBarIcon = <WrapperTaBarIcon source={iconMyData} />;
  } else {
    returnTabBarIcon = null;
  }
  return returnTabBarIcon;
}

function tabBarOptions() {
  return {
    activeTintColor: fineBlack,
    inactiveTintColor: fineGrey,
    labelStyle: styles.tabBarLabel,
    tabStyle: styles.tabBarItem,
    style: styles.tabBar,
  };
}

export default {
  tabBarIcon,
  tabBarOptions,
};
