import React, { Component } from "react";
import { View, Picker } from "react-native";
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
import Fire from "../backend/FireSetting";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      no: "",
      imageUrl:""
    };
  }

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  registrasi = () => {
    let dataReg = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      no: this.state.no,
      imageUrl: this.state.imageUrl
    };
    Fire.shared.createAccount(dataReg);
    this.props.navigation.navigate("Login");
  };

  regFailed = () => {
    alert("Something Wrong, pls try again!");
  };

  regSuccess = async () => {
    this.props.navigation.navigate("Login");
    alert("Registrasi Succes");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Body>
            <Text style={{ color: "white" }}>Sign Up</Text>
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
                    <Input
                      value={this.state.name}
                      onChangeText={this.handleChange("name")}
                      placeholder="Name"
                    />
                  </Item>
                  <Item>
                    <Input
                      value={this.state.imageUrl}
                      onChangeText={this.handleChange("imageUrl")}
                      placeholder="Link Image"
                    />
                  </Item>
                  
                  <Item>
                    <Input
                      value={this.state.no}
                      onChangeText={this.handleChange("no")}
                      placeholder="No. Phone"
                      keyboardType="number-pad"
                    />
                  </Item>
                  <Item>
                    <Input
                      value={this.state.email}
                      onChangeText={this.handleChange("email")}
                      placeholder="Email"
                      keyboardType="email-address"
                    />
                  </Item>
                  <Item>
                    <Input
                      value={this.state.password}
                      onChangeText={this.handleChange("password")}
                      secureTextEntry={true}
                      placeholder="Password"
                    />
                  </Item>
                </Form>
              </View>
              <View
                style={{
                  alignSelf: "center",
                  marginTop: 15
                }}
              >
                <Button onPress={this.registrasi}>
                  <Text>Sign Up</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
