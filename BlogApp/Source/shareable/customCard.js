import React from 'react'
import {StyleSheet,View} from 'react-native';

const AuthCard=(props)=>{
    return(
        <View style={styles.authCardStyle}>
           
                {props.children}
            
        </View>
    )
}

const PostCard=(props)=>{
    return(
        <View style={styles.postCardStyle}>
            {props.children}
        </View>
    )
}

const CommentCard=(props)=>{
    return(
        <View style={styles.commentCardStyle}>
             {props.children}
        </View>
    )
}

const NotificationCard=(props)=>{
    return(
        <View style={styles.notificationCardStyle}>
             {props.children}
        </View>
    )
}

const styles= StyleSheet.create({
    authCardStyle: {
        marginLeft: 20,
        marginRight: 20,
        borderWidth: 1,
        borderColor:"#6C63FF",
    },

    postCardStyle: {
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        backgroundColor: "#eae8ff",
        marginBottom: 20,
    },

    commentCardStyle:{
        borderRadius: 5,
        borderColor: "#eae8ff",
        borderWidth: 1,
        marginBottom: 1,
        alignSelf: "center",
        width:360
    },

    notificationCardStyle:{
        width: 360,
        alignSelf: "center",
        backgroundColor: "#eae8ff",
        marginBottom: 2
    }
})

export { AuthCard, PostCard, CommentCard, NotificationCard }