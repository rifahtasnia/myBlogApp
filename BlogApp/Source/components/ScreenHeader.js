import React from 'react';
import { Header } from "react-native-elements";
import { AuthContext } from '../provider/AuthProvider';
import * as  firebase from 'firebase';

const ScreenHeader=({props})=>{
    return(
      <AuthContext.Consumer>
      {(auth) => (   
        <Header
                    backgroundColor="#6C63FF"
                    leftComponent={{
                        icon: "menu",
                        color: "#fff",
                        onPress: function () {
                            props.navigation.toggleDrawer();
                            console.log(props)
                            console.log("okay")
                        },
                    }}
                    centerComponent={{ text: "Stark Expo", style: { color: "#fff" } }}
                    rightComponent={{
                        icon: "lock-outline",
                        color: "#fff",
                        onPress: function () {
                            firebase.auth().signOut()
                                .then(() => {
                            auth.setIsLoggedIn(false);
                                    auth.setCurrentUser({});
                                })
                                .catch((error) => {
                                    alert(error)
                                })
                        },
                    }}
                />
            )}
        </AuthContext.Consumer>
    )
}
export default ScreenHeader
