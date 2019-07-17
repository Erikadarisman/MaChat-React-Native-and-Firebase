import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import Home from "../screens/Home";
import AuthLoading from "./AuthLoading";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Chat from "../screens/Chat";
import DetailChat from "../screens/DetailChat";
import Maps from "../screens/Maps";

const Stack = createStackNavigator(
  {
    Home: Home,
    Profile: Profile,
    Chat: Chat,
    DetailChat: DetailChat,
    Maps: Maps,
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
