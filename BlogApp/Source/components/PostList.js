import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { PostCard } from '../components/CustomCard';
import { getDataJSON, storeDataJSON } from "../Function/AsyncStorageFunction"; 
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../provider/AuthProvider';
import * as firebase from 'firebase'
import "firebase/firestore";


const PostList =(props)=>{
   
    const posts = props.posts
    const nav = props.nav
    const currUser = props.currentUser

    const [iconName, setIconName] = useState("thumbs-o-up")

    const [likeCount, setLikeCount] = useState(posts.data.likes)
    const [authorPostReactions, setAuthorPostReactions] = useState([]);

    let dateObj = new Date(posts.data.created_at.seconds * 1000)
    dateObj = "" + dateObj.toUTCString()
    let postDate = dateObj.substr(0, dateObj.length - 13)

    return (


        <PostCard>

            <Text style={styles.authorNameStyle}>{posts.data.author}</Text>
            <Text style={styles.dateStyle}>{postDate}</Text>
            <Text style={styles.postBodyStyle}>{posts.data.body}</Text>
            <FontAwesome name="comment-o" size={20} color="#6C63FF" style={styles.commentStyle}
                onPress={function () {
                    nav.navigation.navigate("PostScreen", { posts, currUser, postDate });
                }} />
            <FontAwesome name={iconName} size={20} color="#6C63FF" style={styles.likeStyle}
                onPress={function () {
                    setIconName("thumbs-up")

                    firebase.firestore().collection("posts").doc(posts.id).collection("likers").doc(currUser.uid).set({
                        liker: currUser.displayName
                    })
                    firebase.firestore().collection("posts").doc(posts.id).update({
                        likes: likeCount + 1
                    })
                    firebase.firestore().collection("notifications").doc(posts.data.userId).collection("notification_details").add({
                        post: posts,
                        name: currUser.displayName,
                        body: "liked your post"
                    })
                    let a = likeCount + 1
                    setLikeCount(a)

                }} />

            <Text style={styles.likeTextStyle} >{likeCount} Likes</Text>
            <Text style={styles.commentTextStyle}>{posts.data.comments} Comments</Text>
        </PostCard>
    );
}

const styles = StyleSheet.create({
    iconStyle: { 
        position:'absolute',
        right:10,
        top:10,    
    },

    authorNameStyle:{
        fontFamily:'serif',
        fontSize:18,
        color: "#5b588a",
        marginLeft: 5
    },

    dateStyle:{
        color:"#3e32fa",
        fontSize: 8,
        fontStyle: "italic",
        marginLeft: 5,
        marginBottom: 5
    },

    postBodyStyle:{
        fontFamily:'serif',
        marginBottom:10,
        color:"#000",
        fontSize: 15,
        marginLeft: 5
        
    },

    likeStyle:{
        marginBottom:3,
        bottom:0,
        width:36,
        left: 0,
        marginLeft: 5
    },
   
    likeTextStyle:{
        marginBottom:3,
        fontSize: 13,
        fontFamily:'serif',
        color:"#6C63FF",
        width:60,
        left:30,
        position:"absolute",
        bottom: 0,
        marginLeft: 5
    },

    commentStyle: {
        position: 'absolute',
        bottom: 1,
        right: 10,
        marginBottom: 3,
    },

    commentTextStyle:{
        marginBottom:3,
        fontSize: 13,
        fontFamily:'serif',
        color:"#6C63FF",
        width:90,
        right:36,
        position:"absolute",
        bottom: 0,
    },
}
);

export default PostList