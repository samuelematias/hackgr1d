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
