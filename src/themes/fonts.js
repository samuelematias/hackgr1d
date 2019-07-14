import { Platform, PixelRatio, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();
const vw = width / 100;

function sizeNormalize(size) {
  let returnSize;
  if (Platform.OS === 'ios') {
    if (pixelRatio === 2 && vw === 3.2) {
      // 5, SE
      //   return size * 1;
      returnSize = size * 1;
    } else if (pixelRatio === 2 && vw === 3.75) {
      // 6, 7, 8, // XR
      returnSize = size * 1.1;
    } else if (pixelRatio === 2 && vw === 4.14) {
      // XR
      returnSize = size * 1.3;
    } else if (pixelRatio === 3 && vw === 4.14) {
      // 6, 7, 8 plus
      returnSize = size * 1.3;
    } else if (pixelRatio === 3 && vw === 3.75) {
      // X, XS
      returnSize = size * 1.2;
    } else if (pixelRatio === 3 && vw === 4.14) {
      // XS Max
      returnSize = size * 1.3;
    } else {
      returnSize = size * 1;
    }
  }
  if (Platform.OS === 'android') {
    if (pixelRatio <= 1) {
      returnSize = size * 0.9;
    } else if (pixelRatio <= 1.5) {
      returnSize = size * 1;
    } else if (pixelRatio <= 2) {
      returnSize = size * 1.1;
    } else if (pixelRatio <= 3) {
      returnSize = size * 1.2;
    } else if (pixelRatio <= 3.5) {
      returnSize = size * 1.3;
    } else {
      returnSize = size * 1.1;
    }
  }
  return returnSize;
}

function lineHeight(size) {
  return Platform.select({
    ios: sizeNormalize(size),
    android: parseInt(sizeNormalize(size), 10),
  });
}

const type = {
  ...Platform.select({
    ios: {
      sf: {
        light: 'SFProDisplay-Light',
        regular: 'SFProDisplay-Regular',
        medium: 'SFProDisplay-Medium',
        bold: 'SFProDisplay-Bold',
        semiBold: 'SFProDisplay-Semibold',
      },
    },
    android: {
      sf: {
        light: 'SFProDisplay-Light',
        regular: 'SFProDisplay-Regular',
        medium: 'SFProDisplay-Medium',
        bold: 'SFProDisplay-Bold',
        semiBold: 'SFProDisplay-Semibold',
      },
    },
  }),
};

const typography = {
  h1: sizeNormalize(20),
  h2: sizeNormalize(18),
  regular: sizeNormalize(16),
  medium: sizeNormalize(14),
  small: sizeNormalize(12),
  smallMinus: sizeNormalize(10),
  tiny: sizeNormalize(9),
};

export default {
  type,
  typography,
  lineHeight,
};
