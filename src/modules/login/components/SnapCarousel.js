import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import styled from 'styled-components/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Metrics, Colors } from '~/themes';

const { size, pw } = Metrics;
const { angelBlue, lightGrey, white } = Colors;

const Container = styled.View`
  background: ${white};
`;

const WrpaperItem = styled.View`
  width: ${size(1)};
`;

const styles = StyleSheet.create({
  paginationContainer: {},
  activeDot: {
    backgroundColor: angelBlue,
    borderRadius: 5,
    width: size(10),
    height: size(10),
  },
  inactiveDot: {
    backgroundColor: lightGrey,
    borderRadius: 5,
    width: size(10),
    height: size(10),
  },
});

export default function SnapCarousel(props) {
  const [activeSlide, setactiveSlide] = useState(0);
  const snapCarouselRef = useRef(null);
  const {
    width,
    paginationBackgroundColor,
    dotStyle,
    inactiveDotStyle,
    children,
  } = props;

  const renderItem = ({ item }) => <WrpaperItem>{item}</WrpaperItem>;

  const renderCarousel = () => (
    <Container>
      <Carousel
        ref={snapCarouselRef}
        data={children}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        inactiveSlideScale={1}
        onSnapToItem={index => setactiveSlide(index)}
      />

      <Pagination
        dotsLength={children.length}
        activeDotIndex={activeSlide}
        containerStyle={[
          styles.paginationContainer,
          { backgroundColor: paginationBackgroundColor },
        ]}
        dotStyle={[styles.activeDot, dotStyle]}
        inactiveDotStyle={[styles.inactiveDot, inactiveDotStyle]}
        inactiveDotScale={0.8}
      />
    </Container>
  );

  return renderCarousel();
}

SnapCarousel.defaultProps = {
  containerStyle: null,
  width: pw(90),
  paginationBackgroundColor: white,
  dotStyle: null,
  inactiveDotStyle: null,
};

SnapCarousel.propTypes = {
  width: PropTypes.number,
  paginationBackgroundColor: PropTypes.string,
  dotStyle: PropTypes.PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ),
  inactiveDotStyle: PropTypes.PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  ),
};
