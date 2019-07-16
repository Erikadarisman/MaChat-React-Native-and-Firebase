import React, { Component } from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Icon
} from "native-base";

export default class Register extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View
          style={{
            flex: 1,
            backgroundColor: "gray",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{ backgroundColor: "white", width: "80%", paddingBottom:20,paddingTop:20, borderRadius:5 }}
          >
            <View>
              <View>
                <Form>
                  <Item>
                    <Input placeholder="Username" />
                  </Item>
                  <Item>
                    <Input placeholder="Password" />
                  </Item>
                </Form>
              </View>
              <View
                style={{
                  alignSelf: "center",
                  marginTop: 15
                }}
              >
                <Button>
                  <Text>Login</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
