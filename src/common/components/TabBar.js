import React from 'react';
import { StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import { Colors, Fonts, Metrics } from '~/themes';

const { white, angelBlue, fineBlack, fineGrey } = Colors;
const { type, typography } = Fonts;
const { size } = Metrics;

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
  const tabBarIconColor = focused ? angelBlue : fineGrey;
  let returnTabBarIcon;
  if (routeName === 'tab1Stack') {
    returnTabBarIcon = (
      <Icon name="news" size={size(18)} color={tabBarIconColor} />
    );
  } else if (routeName === 'tab2Stack') {
    returnTabBarIcon = (
      <Icon name="open-book" size={size(18)} color={tabBarIconColor} />
    );
  } else if (routeName === 'tab3Stack') {
    returnTabBarIcon = (
      <Icon name="user" size={size(18)} color={tabBarIconColor} />
    );
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
