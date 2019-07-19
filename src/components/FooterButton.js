import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon } from "native-base";

export default class FooterButton extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button>
            <Icon name="person" />
          </Button>
          <Button >
            <Icon name="navigate" />
          </Button>
          <Button>
            <Icon name="apps" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
