import React from "react";
import { createAppContainer } from "react-navigation";
import Stack from "./src/navigation/Navigation";

const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return (
      // <StoreProvider store={store}>
          <AppContainer />
      // </StoreProvider>
    );
  }
}
