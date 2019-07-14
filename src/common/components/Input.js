import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

import { Regexs } from '~/common/utils';
import { Metrics, Colors, Images, Fonts } from '~/themes';

const { size, pw } = Metrics;
const { white, mediumGrey, strawberry, black, regularGrey, heavyGrey } = Colors;
const { iconCleamInput, iconError, iconEyeOpen, iconEyeClose } = Images;
const { typography, type } = Fonts;

const Container = styled.View`
  flex: 1;
  width: ${pw(92)}px;
`;

const WrapperSupportText = styled.View`
  flex: 1;
  align-items: flex-start;
  padding-top: ${size(5)};
  flex-direction: row;
`;

const TextRequiredField = styled.Text`
  font-size: ${typography.small}px;
  font-family: ${type.sf.regular};
  color: ${heavyGrey};
`;

const TextErrorMessage = styled(TextRequiredField)`
  color: ${strawberry};
`;

const WrapperErrorIcon = styled.View`
  align-items: center;
  padding-left: ${size(4)}px;
`;

const ErroIcon = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  width: ${size(14)}px;
  height: ${size(14)}px;
`;

const WrapperAccessory = styled.TouchableOpacity`
  position: absolute;
  top: ${size(15)}px;
  bottom: ${size(10)}px;
  right: ${size(10)}px;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const IconAccessoryCleanInput = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  width: ${size(16)};
  height: ${size(16)};
`;

const IconAccessoryPassword = styled.Image.attrs(() => ({
  resizeMode: 'contain',
  resizeMethod: 'resize',
}))`
  width: ${size(24)};
  height: ${size(24)};
`;

const fontTypes = {
  regular: type.sf.regular,
  medium: type.sf.medium,
  light: type.sf.light,
};

export default function Input(props) {
  const {
    inputType,
    keyboardType,
    returnKeyType,
    autoCapitalize,
    label,
    autoCompleteType,
    disabled,
    requiredField,
    confirmAction,
    requestResponse,
    requestResponseMessageFailed,
    supportText,
    onFocus,
    callback,
    autoFocus,
    onSubmitEditing,
    blurOnSubmit,
    autoFocusRef,
  } = props;

  const [inputValue, setInputValue] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const inputRef = useRef(null);

  const handleChooseColor = () => {
    let returnColorChosen;

    if (requiredField === 'required') {
      if (confirmAction === 'confirmed' && !inputValue) {
        returnColorChosen = strawberry;
      } else if (requestResponse === 'faild') {
        returnColorChosen = strawberry;
      } else {
        returnColorChosen = mediumGrey;
      }
    } else if (requestResponse === 'faild') {
      returnColorChosen = strawberry;
    } else {
      returnColorChosen = mediumGrey;
    }
    return returnColorChosen;
  };

  const renderRequiredField = () => (
    <WrapperSupportText>
      <TextRequiredField>
        {!supportText ? 'Campo obrigatório' : supportText}
      </TextRequiredField>
    </WrapperSupportText>
  );

  const renderErrorMessage = () => (
    <WrapperSupportText>
      <WrapperErrorIcon>
        <ErroIcon source={iconError} />
      </WrapperErrorIcon>
      <TextErrorMessage>
        {requestResponse !== 'faild'
          ? 'Mensagem de erro'
          : requestResponseMessageFailed}
      </TextErrorMessage>
    </WrapperSupportText>
  );

  const handleSupportText = () => {
    let returnRenderChosen;
    if (requiredField === 'required') {
      if (confirmAction === 'not-confirmed') {
        returnRenderChosen = renderRequiredField();
      } else if (confirmAction === 'confirmed' && !inputValue) {
        returnRenderChosen = renderErrorMessage();
      } else if (requestResponse === 'faild') {
        returnRenderChosen = renderErrorMessage();
      }
    } else if (requestResponse === 'faild') {
      returnRenderChosen = renderErrorMessage();
    } else if (supportText) {
      returnRenderChosen = renderRequiredField();
    } else {
      returnRenderChosen = null;
    }
    return returnRenderChosen;
  };

  const handleCallbackFromParent = value => {
    let returnCallBack;
    if (inputType === 'email') {
      returnCallBack = callback({
        inputValue: Regexs.emailCheckRegex(value) ? value : false,
      });
    } else if (inputType === 'password') {
      returnCallBack = callback({
        inputValue: value.length >= 4 ? value : false,
      });
    } else if (inputType === 'default') {
      returnCallBack = callback({
        inputValue: value.length >= 4 ? value : false,
      });
    } else if (inputType === 'phone') {
      returnCallBack = callback({
        inputValue: value.length >= 16 ? value : false,
      });
    } else {
      returnCallBack = null;
    }

    return returnCallBack;
  };

  const handleOnChangeText = value => {
    setInputValue(value);
    handleCallbackFromParent(value);
  };

  const renderAccessoryCleanInput = () => (
    <WrapperAccessory
      onPress={() => handleOnChangeText('')}
      hitSlop={{
        top: 20,
        left: 20,
        bottom: 20,
        right: 20,
      }}
    >
      <IconAccessoryCleanInput source={iconCleamInput} />
    </WrapperAccessory>
  );

  const renderAccessoryPassword = () => (
    <WrapperAccessory
      onPress={() => setHidePassword(!hidePassword)}
      hitSlop={{
        top: 20,
        left: 20,
        bottom: 20,
        right: 20,
      }}
    >
      <IconAccessoryPassword
        source={hidePassword ? iconEyeClose : iconEyeOpen}
      />
    </WrapperAccessory>
  );

  const handleAccessory = () => {
    let returnAcessoryChosen;
    if (inputType === 'email') {
      returnAcessoryChosen = renderAccessoryCleanInput();
    } else if (inputType === 'password') {
      returnAcessoryChosen = renderAccessoryPassword();
    } else {
      returnAcessoryChosen = renderAccessoryCleanInput();
    }
    return returnAcessoryChosen;
  };

  const handleHidePassword = () => {
    let returnHidePasswordChosen;
    if (inputType === 'password') {
      if (hidePassword) {
        returnHidePasswordChosen = true;
      } else {
        returnHidePasswordChosen = false;
      }
    }
    return returnHidePasswordChosen;
  };

  const theme = {
    fonts: fontTypes,
    colors: {
      placeholder: handleChooseColor(),
      text: black,
      primary: black,
      underlineColor: 'transparent',
      background: white,
      disabled: regularGrey,
    },
  };

  useEffect(() => {
    if (autoFocusRef) {
      inputRef.current.focus();
    }
  }, [autoFocusRef]);

  return (
    <Container>
      <TextInput
        ref={inputRef}
        label={label}
        mode="outlined"
        autoCapitalize={autoCapitalize}
        autoCompleteType={autoCompleteType}
        autoCorrect={false}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        underlineColorAndroid="transparent"
        selectionColor={black}
        theme={theme}
        onChangeText={value => handleOnChangeText(value)}
        value={inputValue}
        disabled={disabled}
        onFocus={onFocus}
        secureTextEntry={handleHidePassword()}
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={blurOnSubmit}
      />
      {inputValue ? handleAccessory() : null}
      {handleSupportText()}
    </Container>
  );
}

Input.defaultProps = {
  keyboardType: 'default',
  returnKeyType: 'done',
  autoCapitalize: 'none',
  autoCompleteType: 'off',
  disabled: false,
  requiredField: 'not-required',
  confirmAction: 'not-confirmed',
  requestResponse: '',
  requestResponseMessageFailed: '',
  supportText: '',
  onFocus: () => {},
  callback: () => {},
  autoFocus: false,
  onSubmitEditing: () => {},
  blurOnSubmit: false,
  autoFocusRef: false,
};
Input.propTypes = {
  inputType: PropTypes.oneOf(['default', 'email', 'password', 'phone'])
    .isRequired,
  keyboardType: PropTypes.oneOf([
    'default',
    'number-pad',
    'decimal-pad',
    'numeric',
    'email-address',
    'phone-pad',
  ]),
  returnKeyType: PropTypes.oneOf(['done', 'go', 'next', 'search', 'send']),
  autoCapitalize: PropTypes.oneOf(['characters', 'words', 'sentences', 'none']),
  label: PropTypes.string.isRequired,
  autoCompleteType: PropTypes.oneOf([
    'off',
    'username',
    'password',
    'email',
    'name',
    'tel',
  ]),
  disabled: PropTypes.bool,
  requiredField: PropTypes.oneOf(['required', 'not-required']),
  confirmAction: PropTypes.oneOf(['confirmed', 'not-confirmed']),
  requestResponse: PropTypes.oneOf(['', 'success', 'faild']),
  requestResponseMessageFailed: PropTypes.string,
  supportText: PropTypes.string,
  onFocus: PropTypes.func,
  callback: PropTypes.func,
  autoFocus: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  blurOnSubmit: PropTypes.bool,
  autoFocusRef: PropTypes.bool,
};
