import React from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '~/themes';

const { white, angelBlue } = Colors;

export default function StatusBarManager(props) {
  const { barStyle, backgroundColor } = props;
  let returnStatusbar;
  if (Platform.OS === 'android' && Platform.Version <= 22) {
    returnStatusbar = (
      <StatusBar barStyle="light-content" backgroundColor={angelBlue} />
    );
  } else {
    returnStatusbar = (
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
    );
  }
  return returnStatusbar;
}

StatusBarManager.defaultProps = {
  barStyle: 'dark-content',
  backgroundColor: white,
};

StatusBarManager.propTypes = {
  barStyle: PropTypes.string,
  backgroundColor: PropTypes.string,
};
