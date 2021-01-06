import React, { useState, useEffect} from 'react';
import { View, Button, Flatlist, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { NotificationCard } from '../components/CustomCard';
import { FontAwesome } from '@expo/vector-icons';



const NotificationList=(props)=>{
    console.log("Notification")
    const notification=props.notificatiions
    const nav=props.nav
    const [iconName, setIconName] = useState("thumbs-up")
    const [statement ,setStatement]=useState("liked your post")
   
    const checkNotificationStatus = () => {
        if (notification.data.body[0] === "c" || notification.data.body[0] === "r") {
            setIconName("comments")
            setStatement("commented on your post")
        }
    }

    useEffect(() => {
        checkNotificationStatus()
    }, [])

    return (
        <View>
            <NotificationCard>
                <FontAwesome name={iconName} size={18} color="#5b588a" style={{marginTop: 10, marginLeft: 5 }}/>
                <Text style={styles.commenter}>{notification.data.name} </Text>
                <Text></Text>
                <Text style={styles.stateMentStyle}>{notification.data.body} </Text>
            </NotificationCard>
        </View>      
    )
}

const styles = StyleSheet.create({
    commenter: {
        fontSize: 15,
        marginTop: 8,
        marginLeft: 35,
        fontFamily: 'serif',
        color: "#5b588a",
        position: "absolute"
    },
    stateMentStyle:{
        fontSize: 15,
        marginTop: 8,
        marginLeft: 5,
        fontFamily: 'serif',
        color: "#5b588a",
        position: "absolute",
        alignSelf: "flex-end",
    },

    iconStyle: {
        width: 20,
        position: "absolute",
    }
})
export default NotificationList