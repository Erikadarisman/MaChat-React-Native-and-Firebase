import React, { Component } from "react";
import { View, AsyncStorage, TouchableOpacity, StyleSheet } from "react-native";
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
import firebase from "firebase";
import fire from "../backend/FireSetting";
import userlogin from "./userlogin";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      uid: "",
      data: []
    };
  }

  handleChange = key => val => {
    this.setState({ [key]: val });
  };

  login = async () => {
    if (this.state.email === "" || this.state.password === "") {
      alert("Insert email dan password");
    } else {
      let user = {
        email: this.state.email,
        password: this.state.password
      };
      await fire.shared.login(user, this.loginSuccess, this.loginFailed);
    }
  };

  loginFailed = () => {
    alert("Something Wrong, pls try again!");
  };

  loginSuccess = async () => {
    let user = firebase.auth().currentUser;
    await AsyncStorage.setItem("id_user", user.uid);
    userlogin.id = user.uid;
    this.props.navigation.navigate("Profile");
    alert("Welcome To MaChat!");
  };

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
            style={{
              backgroundColor: "white",
              width: "80%",
              paddingBottom: 20,
              paddingTop: 20,
              borderRadius: 5
            }}
          >
            <View>
              <View style={{ margin: 20 }}>
                <Form>
                  <Item>
                    <Input
                      value={this.state.email}
                      onChangeText={this.handleChange("email")}
                      placeholder="Email"
                    />
                  </Item>
                  <Item>
                    <Input
                      value={this.state.password}
                      onChangeText={this.handleChange("password")}
                      placeholder="Password"
                      secureTextEntry={true}
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
                <Button
                  mode="contained"
                  style={{ borderRadius: 5 }}
                  onPress={this.login}
                >
                  <Text>Login</Text>
                </Button>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10
                }}
              >
                <Text style={styles.text}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Register");
                  }}
                >
                  <Text style={[styles.text, { color: "#4050B5" }]}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    textAlign: "center"
  }
});
