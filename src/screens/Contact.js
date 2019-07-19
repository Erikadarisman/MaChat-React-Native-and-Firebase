import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Spinner
} from "native-base";
import { FlatList, View } from "react-native";
import firebase from "firebase";
import userlogin from "./userlogin";
import FooterButton from "../components/FooterButton";

export default class ListAvatarExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: []
    };
  }

  componentWillMount() {
    let dbRef = firebase.database().ref("users");
    dbRef.on("child_added", val => {
      let person = val.val();
      person.id = val.key;

      if (person.id === userlogin.id) {
        userlogin.name = person.name;
        userlogin.no = person.no;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
            loading: false
          };
        });
      }
    });
  }

  renderRow = ({ item }) => {
    return (
      <ListItem
        avatar
        onPress={() => this.props.navigation.navigate("Chat", item)}
        onLongPress={() => this.props.navigation.navigate("Friend", item)}
      >
        <Left>
          <Thumbnail source={{ uri: item.imageUrl }} />
        </Left>
        <Body>
          <Text>{item.name}</Text>
          <Text note>{item.no}</Text>
        </Body>
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
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
          <Content>
            <List>
              <FlatList
                data={this.state.users}
                renderItem={this.renderRow}
                keyExtractor={item => item.phone}
              />
            </List>
          </Content>
        )}
        <FooterButton/>
      </Container>
    );
  }
}

