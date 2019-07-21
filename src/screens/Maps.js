import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
  Modal,
  AsyncStorage
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import firebase from "firebase";
import userlogin from "./userlogin";
import { Button, Icon } from "native-base";
import FooterButton from "../components/FooterButton";

export default class maps extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      longitude: "",
      latitude: "",
      data: [],
      modalVisible: false,
      modal: ""
    }),
      this.getLocation();
  }

  chat = () => {
    let chat = {
      id: this.state.id,
      name: this.state.name
    };
    this.props.navigation.navigate("Chat", chat), this.setModalVisible(false);
  };

  profile = () => {
    let Profile = {
      id: this.state.id,
      name: this.state.name
    };
    this.props.navigation.navigate("Friend", Profile),
      this.setModalVisible(false);
  };

  getLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
    );
  };

  updateLocation = async () => {
    if (this.state.latitude) {
      await firebase
        .database()
        .ref("users/" + userlogin.id)
        .update({
          latitude: this.state.latitude,
          longitude: this.state.longitude
        });
    }
  };

  setModalVisible(visible, value) {
    if (value == undefined) {
      this.setState({
        modalVisible: visible
      });
    } else {
      this.setState({
        modalVisible: visible,
        name: value.name,
        no: value.no,
        status: value.status,
        id: value.id,
        imageUrl: value.imageUrl,
        chat: { id: value.id, name: value.name }
      });
    }
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .on("value", data => {
        let values = data.val();
        if (values) {
          const value = Object.keys(values).map(key => ({
            ...values[key]
          }));
          this.setState({
            data: value
          });
        }
      });
  }

  render() {
    if (this.state.latitude) {
      this.updateLocation();
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <MapView
              ref={map => (this.map = map)}
              style={styles.map}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.02864195044303443,
                longitudeDelta: 0.020142817690068
              }}
            >
              <Marker
                pinColor={"green"}
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }}
                title="You"
                description="in here"
              />
              {this.state.data.map(item => {
                if (item.longitude == "" || item.id == userlogin.id) {
                } else {
                  return (
                    <Marker
                      coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude
                      }}
                      title={item.name}
                      description="in here"
                      onPress={() => this.setModalVisible(true, item)}
                    />
                  );
                }
              })}
            </MapView>
            <View>
              <Modal
                transparent={true}
                animationType="fade"
                visible={this.state.modalVisible}
                onPress={() => this.setModalVisible(false)}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(51,51,51,0.5)"
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(false)}
                    style={styles.modelstyle}
                  >
                    <View style={styles.imageModal}>
                      <View
                        style={{
                          flex: 2,
                          backgroundColor: "#1F6097",
                          borderRadius: 5,
                          padding: 5
                        }}
                      >
                        <Image
                          source={{ uri: this.state.imageUrl }}
                          style={styles.images}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#FAFAFA",
                            padding: 5
                          }}
                        >
                          {this.state.name}
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            paddingLeft: 20,
                            paddingRight: 20,
                            marginTop: 5,
                            marginBottom: 15
                          }}
                        >
                          <Button
                            onPress={() => {
                              this.chat();
                            }}
                            primary
                            light
                            style={{
                              flex: 1,
                              marginRight: 5,
                              justifyContent: "center"
                            }}
                          >
                            <Icon
                              name="chatboxes"
                              style={{ color: "#1F6097" }}
                            />
                          </Button>
                          <Button
                            onPress={() => {
                              this.profile();
                            }}
                            success
                            light
                            style={{
                              flex: 1,
                              marginLeft: 5,
                              justifyContent: "center"
                            }}
                          >
                            <Icon name="person" style={{ color: "#1F6097" }} />
                          </Button>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </View>
          <FooterButton />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            region={{
              latitude: -7.7613167,
              longitude: 110.3589596,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121
            }}
          />
        </View>
        <FooterButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modelstyle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  imageModal: {
    width: "80%",
    height: "30%",
    textAlign: "center",
    alignSelf: "center",
    position: "relative",
    backgroundColor: "#FFF9EC",
    borderRadius: 5,
    elevation: 3
  },
  images: {
    marginTop: 10,
    height: 70,
    width: 70,
    borderRadius: 30,
    alignSelf: "center"
  },
  textModal: {
    textAlign: "center",
    color: "#0CF60B",
    marginTop: 2,
    fontWeight: "800"
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  view: {
    position: "absolute"
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },

  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 10
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  }
});
