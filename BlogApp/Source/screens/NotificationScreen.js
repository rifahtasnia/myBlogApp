import React, { useState, useEffect } from 'react';
import { Text, Button, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import { getDataJSON } from "../Function/AsyncStorageFunction";
import ScreenHeader from '../components/ScreenHeader';
import NotificationList from '../components/NotificationList';
import { AuthContext } from '../provider/AuthProvider'
import * as firebase from 'firebase'
import "firebase/firestore";
import convertSecons from '../Function/SeconsToUtcDate';


const NotificationScreenActivity = (props) => {
    console.log("ok")
    const uid = AuthContext.Consumer._currentValue.CurrentUser.uid
    const displayName = AuthContext.Consumer._currentValue.CurrentUser.displayName
    console.log("print")
    const currUser = { uid: { uid }, displayName: { displayName } }
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadNotification = async () => {
        setLoading(true)
        firebase
            .firestore()
            .collection("notifications")
            .doc(uid)
            .collection("notification_details")

            .onSnapshot((querySnapshot) => {
                let temp = [];
                console.log("success")
                querySnapshot.forEach((doc) => {
                    temp.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setNotifications(temp);
                console.log("ok")
                console.log(temp)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });

    };

    useEffect(() => {
        console.log(uid)
        console.log("yes")
        loadNotification();
    }, []);

    return (

        <View style={{ flex: 1}}>
        <View style={{marginBottom: 25}}>
        <ScreenHeader props ={props} ></ScreenHeader>
        </View>
        {!loading?
                <FlatList
                    data={notifications}
                    extraData={notifications} 
                    renderItem={function ({ item }) {
                        console.log(notifications.length + " post length")

                        return (
                            <TouchableOpacity
                                onPress={function () {
                                    console.log("pressed")

                                    let posts = item.data.post
                                    let date = convertSecons(posts.data.created_at.seconds)

                                    props.navigation.navigate("PostScreen", { posts, currUser, date });
                                }}>
                                <NotificationList
                                    notificatiions={item} nav={props}

                                />
                            </TouchableOpacity>
                        )
                    }}
                /> : <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size="large" color="red" animating={true} />
                </View>}
        </View>
    )
}

export default NotificationScreenActivity;