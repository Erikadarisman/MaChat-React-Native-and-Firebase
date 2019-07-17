import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Register from "../screens/Register";
import AuthLoading from "./AuthLoading";

const Stack = createStackNavigator(
  {
    Home: Home,
    Profile: Profile,
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

// const Drawer = createDrawerNavigator({
//     home: {
//       screen: Home
//     },
//     profile: {
//       screen: Profile,
//     },
//   });

// export default createAppContainer(Drawer);

const AuthStack = createStackNavigator(
  {
    Login: Login,
    Register: Register
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: Stack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);