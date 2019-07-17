import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";

import firebase from "firebase";
// import user from "./User";
import userlogin from "./userlogin";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    console.log("[CONSTRUCTOR]");
    console.log(props.navigation.getParam("phone"));
    this.state = {
      person: {
        id: props.navigation.getParam("id"),
        name: props.navigation.getParam("name"),
        email: props.navigation.getParam("email"),
        password: props.navigation.getParam("password"),
        no: props.navigation.getParam("no"),
        imageUrl: props.navigation.getParam("imageUrl"),
        status: props.navigation.getParam("status"),
      },
      textMessage: "",
      messageList: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name", null)
    };
  };

  componentWillMount() {
    firebase
      .database()
      .ref("messages")
      .child(userlogin.id)
      .child(this.state.person.name)
      .on("child_added", value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()]
          };
        });
      });
  }

  _handleChanges = key => value => {
    this.setState({ [key]: value });
  };

  // logic of sending messages
  sendMessage = async () => {
    if (this.state.textMessage.length > 0) {
      // console.log("user.phone : " + user.phone);
      console.log("this.state.person.phone: " + JSON.stringify(this.state));

      let msgId = firebase
        .database()
        .ref("messages")
        .child(userlogin.id)
        .child(this.state.person.name)
        .push().key;

      let updates = {};

      let messages = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: userlogin.id
      };

      updates[
        "messages/" + userlogin.id + "/" + this.state.person.name + "/" + msgId
      ] = messages;
      updates[
        "messages/" + this.state.person.name + "/" + userlogin.id + "/" + msgId
      ] = messages;

      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({ textMessage: "" });
    }
  };

  renderRow = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "68%",
          alignSelf: item.from === userlogin.id ? "flex-end" : "flex-start",
          backgroundColor: item.from === userlogin.id ? "#00897b" : "#7cb342",
          borderRadius: 5,
          marginBottom: 10
        }}
      >
        <Text style={{ color: "#fff", padding: 7, fontSize: 16 }}>
          {item.message}
        </Text>
        <Text style={{ color: "#000", padding: 3, fontSize: 12 }}>
          {this.converTime(item.time)}
        </Text>
      </View>
    );
  };

  converTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? "0" : "") + d.getHours() + ":";
    result += (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();

    if (c.getDay() !== d.getDay()) {
      result = d.getDay() + " " + d.getMonth() + " " + result;
    }

    return result;
  };

  render() {
    let { height, width } = Dimensions.get("window");
    return (
      // <View>
      <SafeAreaView>
        {/* <Text>Chat Screen here</Text> */}
        <FlatList
          data={this.state.messageList}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          style={{ padding: 10, height: height * 0.8 }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            onChangeText={this._handleChanges("textMessage")}
            style={{ borderWidth: 0.8, borderColor: "#000", width: "80%" }}
            placeholder="Type Message Here..."
            value={this.state.textMessage}
          />
          <TouchableOpacity onPress={this.sendMessage}>
            <Text style={{ margin: 12 }}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      // </View>
    );
  }
}
