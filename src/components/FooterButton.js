import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon } from "native-base";
import { withNavigation } from 'react-navigation';

class FooterButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            onPress={() => this.props.navigation.navigate('Profile')}
          >
            <Icon name="person" />
          </Button>
          <Button
            onPress={() => this.props.navigation.navigate("Maps")}
          >
            <Icon name="navigate" />
          </Button>
          <Button
            onPress={() => {
              this.props.navigation.navigate("Contact");
            }}
          >
            <Icon name="chatboxes" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default withNavigation(FooterButton);