import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { Authentication, TabBar } from '~/common/components';

// import HomeScreen from '~/modules/home/screens/HomeScreen';

import DashboardScreen, {
  dashboardScreenConfig,
} from '~/modules/login/screens/DashboardScreen';

import EmailScreen, {
  emailScreenConfig,
} from '~/modules/login/screens/EmailScreen';

import PasswordScreen, {
  passwordScreenConfig,
} from '~/modules/login/screens/PasswordScreen';

const LoginStack = createStackNavigator(
  {
    DashboardScreen: {
      screen: DashboardScreen,
      navigationOptions: dashboardScreenConfig,
    },
    EmailScreen: {
      screen: EmailScreen,
      navigationOptions: emailScreenConfig,
    },
    PasswordScreen: {
      screen: PasswordScreen,
      navigationOptions: passwordScreenConfig,
    },
  },
  {
    initialRouteName: 'DashboardScreen',
  },
);

// const HomeStack = createStackNavigator(
//   {
//     HomeScreen: { screen: HomeScreen },
//   },
//   {
//     headerMode: 'none',
//     initialRouteName: 'HomeScreen',
//   },
// );

const TabBarStack = createBottomTabNavigator(
  {
    LoginStack: {
      screen: LoginStack,
      navigationOptions: {
        title: 'Seguros',
      },
    },
  },
  {
    initialRouteName: 'LoginStack',
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
    initialRouteName: 'LoginStack',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  },
);

export default createAppContainer(Navigation);
