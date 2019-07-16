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
  Icon,
  Body
} from "native-base";

export default class Register extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Body>
            <Text style={{ color:"white" }}>
              Register
            </Text>
          </Body>
        </Header>
        <View
          style={{
            flex: 1,
            backgroundColor: "gray",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "95%",
              paddingBottom: 20,
              paddingTop: 20,
              borderRadius: 5
            }}
          >
            <View>
              <View>
                <Form>
                  <Item>
                    <Input placeholder="Name" />
                  </Item>
                  <Item>
                    <Input placeholder="No" />
                  </Item>
                  <Item>
                    <Input placeholder="Email" />
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
