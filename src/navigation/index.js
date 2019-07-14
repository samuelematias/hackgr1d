import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { Authentication, TabBar } from '~/common/components';

import DashboardScreen, {
  dashboardScreenConfig,
} from '~/modules/login/screens/DashboardScreen';

import LoginEmailScreen, {
  loginEmailScreenConfig,
} from '~/modules/login/screens/LoginEmailScreen';

import LoginPasswordScreen, {
  loginPasswordScreenConfig,
} from '~/modules/login/screens/LoginPasswordScreen';

import RegisterNameScreen, {
  registerNameScreenConfig,
} from '~/modules/register/screens/RegisterNameScreen';

import RegisterPhoneScreen, {
  RegisterPhoneScreenConfig,
} from '~/modules/register/screens/RegisterPhoneScreen';

import RegisterEmailScreen, {
  registerEmailScreenConfig,
} from '~/modules/register/screens/RegisterEmailScreen';

import RegisterPasswordScreen, {
  registerPasswordScreenConfig,
} from '~/modules/register/screens/RegisterPasswordScreen';

import CoveringsScreen, {
  coveringsScreenConfig,
} from '~/modules/coverings/screens/CoveringsScreen';

import LossesScreen, {
  lossesScreenConfig,
} from '~/modules/losses/screens/LossesScreen';

import MyDataScreen, {
  myDataScreenConfig,
} from '~/modules/myData/screens/MyDataScreen';

const LoginStack = createStackNavigator(
  {
    DashboardScreen: {
      screen: DashboardScreen,
      navigationOptions: dashboardScreenConfig,
    },
    LoginEmailScreen: {
      screen: LoginEmailScreen,
      navigationOptions: loginEmailScreenConfig,
    },
    LoginPasswordScreen: {
      screen: LoginPasswordScreen,
      navigationOptions: loginPasswordScreenConfig,
    },
    RegisterNameScreen: {
      screen: RegisterNameScreen,
      navigationOptions: registerNameScreenConfig,
    },
    RegisterPhoneScreen: {
      screen: RegisterPhoneScreen,
      navigationOptions: RegisterPhoneScreenConfig,
    },
    RegisterEmailScreen: {
      screen: RegisterEmailScreen,
      navigationOptions: registerEmailScreenConfig,
    },
    RegisterPasswordScreen: {
      screen: RegisterPasswordScreen,
      navigationOptions: registerPasswordScreenConfig,
    },
  },
  {
    initialRouteName: 'DashboardScreen',
  },
);

const CoveringsStack = createStackNavigator(
  {
    CoveringsScreen: {
      screen: CoveringsScreen,
      navigationOptions: coveringsScreenConfig,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'CoveringsScreen',
  },
);

const LossesStack = createStackNavigator(
  {
    LossesScreen: {
      screen: LossesScreen,
      navigationOptions: lossesScreenConfig,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'LossesScreen',
  },
);

const MyDataStack = createStackNavigator(
  {
    MyDataScreen: {
      screen: MyDataScreen,
      navigationOptions: myDataScreenConfig,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'MyDataScreen',
  },
);

const TabBarStack = createBottomTabNavigator(
  {
    CoveringsStack: {
      screen: CoveringsStack,
      navigationOptions: {
        title: 'Coberturas',
      },
    },
    LossesStack: {
      screen: LossesStack,
      navigationOptions: {
        title: 'Sinistros',
      },
    },
    MyDataStack: {
      screen: MyDataStack,
      navigationOptions: {
        title: 'Meus dados',
      },
    },
  },
  {
    initialRouteName: 'CoveringsStack',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => TabBar.tabBarIcon(focused, navigation),
      tabBarOptions: TabBar.tabBarOptions(),
    }),
  },
);

const Navigation = createStackNavigator(
  {
    Authentication: {
      screen: Authentication,
    },
    LoginStack: {
      screen: LoginStack,
    },
    TabBarStack: {
      screen: TabBarStack,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'TabBarStack',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  },
);

export default createAppContainer(Navigation);
