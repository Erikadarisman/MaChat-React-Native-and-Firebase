import {createStackNavigator,createDrawerNavigator, createAppContainer} from 'react-navigation';

import Home from './screens/Home'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'

const Stack = createStackNavigator(
  {
  Home: Home,
  Profile: Profile,
  Register: Register,
  Login: Login,
  },
  {
    initialRouteName: "Register",
    headerMode: "none",
  }
);

const Drawer = createDrawerNavigator({
    home: {
      screen: Stack, Home
    },
    profile: {
      screen: Profile,
    },
  });
  
  export default createAppContainer(Drawer);