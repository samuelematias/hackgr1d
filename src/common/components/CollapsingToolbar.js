import React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors, Metrics, Fonts } from '~/themes';

const { white, black, lightGrey } = Colors;
const { type, typography } = Fonts;

const { iPhoneXHelper, size } = Metrics;

const HEADER_EXPANDED_HEIGHT = hp('15%');
const HEADER_COLLAPSED_HEIGHT = hp('10%');

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const scrollY = new Animated.Value(0);

const headerHeight = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
  extrapolate: 'clamp',
});
const headerTitleOpacity = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [0, 1],
  extrapolate: 'clamp',
});
const heroTitleOpacity = scrollY.interpolate({
  inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
  outputRange: [1, 0],
  extrapolate: 'clamp',
});

const Container = styled.View`
  flex: 1;
  background: ${white};
`;

const Header = styled(Animated.View).attrs(props => ({
  height: headerHeight,
  backgroundColor: props.background,
  position: 'absolute',
  width: SCREEN_WIDTH,
  top: 0,
  left: 0,
  zIndex: 9999,
  borderBottomColor: lightGrey,
  borderBottomWidth: size(1),
}))``;

const SafeArea = styled.SafeAreaView`
  margin-top: ${iPhoneXHelper}px;
  background: ${white};
`;

const ScrollContainer = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    padding: size(16),
    paddingTop: HEADER_EXPANDED_HEIGHT,
    backgroundColor: white,
  },
  onScroll: props.onScroll,
  scrollEventThrottle: size(16),
  showsVerticalScrollIndicator: false,
  scrollEnabled: props.scrollEnabled,
}))`
  flex: 1;
  margin-top: ${hp('2%')};
`;

const styles = StyleSheet.create({
  TitleCollapse: {
    textAlign: 'center',
    fontFamily: type.sf.semiBold,
    fontSize: typography.regular,
    marginTop: hp('5%'),
  },
  Title: {
    textAlign: 'center',
    fontFamily: type.sf.semiBold,
    fontSize: hp('5%'),
    position: 'absolute',
    bottom: size(16),
    left: size(16),
  },
});

export default function CollapsingToolbar(props) {
  const {
    headerTitle,
    children,
    background,
    titleColor,
    scrollEnabled,
  } = props;

  return (
    <Container>
      <Header background={background}>
        <Animated.Text
          style={[
            styles.TitleCollapse,
            { opacity: headerTitleOpacity, color: titleColor },
          ]}
        >
          {headerTitle}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.Title,
            { opacity: heroTitleOpacity, color: titleColor },
          ]}
        >
          {headerTitle}
        </Animated.Text>
      </Header>
      <ScrollContainer
        scrollEnabled={scrollEnabled}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
      >
        <SafeArea>{children}</SafeArea>
      </ScrollContainer>
    </Container>
  );
}

CollapsingToolbar.defaultProps = {
  background: white,
  titleColor: black,
  scrollEnabled: true,
};

CollapsingToolbar.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ).isRequired,
  background: PropTypes.string,
  titleColor: PropTypes.string,
  scrollEnabled: PropTypes.bool,
};
