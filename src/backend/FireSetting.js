import firebase from "firebase";

// 1.
class Fire {
  constructor() {
    this.init();
  }
  // 2.
  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyA07v__dr-x3MQyUpQaTWL8ZjDEK1FDuek",
      authDomain: "machat-2fc1b.firebaseapp.com",
      databaseURL: "https://machat-2fc1b.firebaseio.com",
      projectId: "machat-2fc1b",
      storageBucket: "machat-2fc1b.appspot.com",
      messagingSenderId: "270924704890",
      appId: "1:270924704890:web:8aafab2d93435ebf"
    });

  login = async (users, success_callback, failed_callback) => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(users.email, users.password)
      .then(success_callback, failed_callback);
  };

  createAccount = async data => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        let user = firebase.auth().currentUser;
        console.log("user/");
        console.log(user);
        console.log(data);

        firebase
          .database()
          .ref("users/")
          .child(user.uid)
          .set({
            id: user.uid,
            name: data.name,
            no: data.no,
            status: "-",
            imageUrl: "-"
          })
          .then(() => {
            console.log("INSERTED!!!");
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

Fire.shared = new Fire();
export default Fire;
