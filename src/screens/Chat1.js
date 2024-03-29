import React, { Fragment, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  AsyncStorage,
  Alert,
  SafeAreaView
} from "react-native";
import {
  Form,
  Item,
  Input,
  Label,
  Button,
  Content,
  Container
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
// import data from user logins
import userlogin from "./userlogin";
class App extends Component {

  state = {
    users: []
  };

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
            users: [...prevState.users, person]
          };
        });
      }
    });
  }

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ padding: 10, borderBottomColor: "#ccc", borderBottomWidth: 1 }}
        onPress={() => this.props.navigation.navigate("Chatty", item)}
      >
        <Text style={{ fontSize: 35 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Fragment>
        {/* <Container style={styles.container}> */}
        {/* <Text style={{ fontSize: 50, color: "#d4d6d9", marginBottom: 30 }}>Your Username: {user.phone}</Text>
                     <TouchableOpacity onPress={() => this._logout()}>
                    <Text style={{ fontSize: 25, color: "#ebbcb5", marginBottom: 30 }}>Logout</Text>
                </TouchableOpacity>
                     */}

        <SafeAreaView>
          <FlatList
            data={this.state.users}
            renderItem={this.renderRow}
            keyExtractor={item => item.phone}
          />
        </SafeAreaView>

        {/* </Container> */}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  contents: {
    alignSelf: "center",
    margin: "auto"
  },
  text: {
    width: "200"
  }
});

export default App;
