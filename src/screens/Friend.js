import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image,
  StyleSheet
} from "react-native";
import { Spinner, Left, Button, Body, Content, Right, Icon } from "native-base";
import FooterButton from "../components/FooterButton";
import userlogin from "./userlogin";

import firebase from "firebase";

export default class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: ""
    };
  }

  async componentDidMount() {
    await firebase
      .database()
      .ref("users/" + this.props.navigation.state.params.id)
      .on("value", data => {
        this.setState({ user: data.val(), loading: false });
      });
  }
  exit = async () => {
    await AsyncStorage.removeItem("id_user");
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#1F6097",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={styles.drawerImage}
            source={{ uri: this.state.user.imageUrl }}
          />
          <Text style={styles.textProfile}>{this.state.user.name}</Text>
        </View>
        {this.state.loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Spinner />
          </View>
        ) : (
          <View style={styles.viewText}>
            <View style={{ flex: 1, alignContent: "center" }}>
              <View style={{ flexDirection: "row", paddingTop: 60 }}>
                <Icon
                  type="FontAwesome5"
                  name="phone"
                  style={{ color: "#1F6097" }}
                />
                <Text style={{ marginLeft: 20, fontSize: 21 }}>
                  {this.state.user.no}
                </Text>
              </View>
              <View style={{ flexDirection: "row", paddingTop: 60 }}>
                <Icon
                  type="FontAwesome5"
                  name="envelope"
                  style={{ color: "#1F6097" }}
                />
                <Text style={{ marginLeft: 20, fontSize: 21 }}>
                  {this.state.user.email}
                </Text>
              </View>
            </View>
          </View>
        )}
        <FooterButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fabRight: {
    position: "absolute",
    width: 58,
    height: 57,
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    right: 10,
    top: 20,
    backgroundColor: "#FFFCFC",
    borderRadius: 50,
    elevation: 3
  },
  viewText: { flex: 1, backgroundColor: "#FAFAFA", alignItems: "center" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  drawerHeader: {
    height: 200,
    backgroundColor: "white"
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  },
  textProfile: {
    alignSelf: "center",
    color: "#FAFAFA",
    fontStyle: "normal",
    fontSize: 25,
    fontWeight: "600",
    lineHeight: 23,
    paddingTop: 35
  }
});
