import React, { Component } from "react";
import firebase from "firebase";
import { GiftedChat } from "react-native-gifted-chat";
import user from "./userlogin";

export default class Chatty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.navigation.state.params.id,
      name: this.props.navigation.state.params.name,
      text: "",
      messagesList: []
    };
  }
  async componentWillMount() {
    await firebase
      .database()
      .ref("messages")
      .child(user.id)
      .child(user.name)
      .child(this.state.name)
      .on("child_added", value => {
        this.setState(previousState => {
          return {
            messagesList: GiftedChat.append(
              previousState.messagesList, 
              value.val()
            )
          };
        });
        console.log("this.state.messagesList");
        console.log(this.state.messagesList);
          
      });
  }
  sendMessage = async () => {
    if (this.state.text.length > 0) {
      let msgId = firebase
        .database()
        .ref("messages")
        .child(user.id)
        .child(user.name)
        .child(this.state.name)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
            _id: user.id
        }
      };
      updates[
        "messages/" +
          user.id +
          "/" +
          user.name +
          "/" +
          this.state.name +
          "/" +
          msgId
      ] = message;
      updates[
        "messages/" +
          this.state.uid +
          "/" +
          this.state.name +
          "/" +
          user.name +
          "/" +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({ text: "" });
    }
  };
  render() {
    return (
      <GiftedChat
        text={this.state.text}
        messages={this.state.messagesList}
        onSend={this.sendMessage}
        user={{
          _id: user.id
        }}
        onInputTextChanged={value => this.setState({ text: value })}
      />
    );
  }
}
