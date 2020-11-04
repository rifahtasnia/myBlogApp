import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { PostCard } from '../components/CustomCard';
import { getDataJSON, storeDataJSON } from "../Function/AsyncStorageFunction"; 
import { FontAwesome } from '@expo/vector-icons';



const PostList =(props)=>{
   
    const posts=props.posts
    const nav=props.nav
    const currUser=props.currentUser
  
    const [Name, setName] = useState("");
    const [iconName, setIconName] = useState("thumbs-o-up")
    const [loading, setLoading] = useState(false);
    const [likeCount,setLikeCount] = useState(0)
    const [commentCount,setCommentCount] = useState(0)
    const [comments,setComments] = useState([]);
    
   
    const [authorPostReactions, setAuthorPostReactions] = useState([]);
    const [liker, setLikers] = useState([]);


    const FindUser=async()=>{
     
        let response = await getDataJSON(posts.Email)
        let postReaction =await getDataJSON(posts.Email+"Reaction")
        let postLiker = await getDataJSON(posts.key+"likes")
        let postComments = await getDataJSON(posts.key+"Comment")
        if (postComments.length > 0) {
                setComments(postComments)
                setCommentCount(postComments.length)
        }

        if (postLiker.length > 0) {
            setLikeCount(postLiker.length)
            setLikers(postLiker)
            setAuthorPostReactions(postReaction)
        }
        setName(response.name)
        setLoading(true)

    }
    if (!loading) {
        FindUser()
    }

    if (loading) {
        return (
            <PostCard>
                <Text style={styles.authorNameStyle}>{Name}</Text>
                <Text style={styles.dateStyle}>{posts.postDate}</Text>
                <Text style={styles.postBodyStyle}>{posts.postText}</Text>
                <FontAwesome name="comment-o" size={20} color="#6C63FF" style={styles.commentStyle}
                    onPress={function () {
                        nav.navigation.navigate("PostScreen", { posts, Name, comments, likeCount, commentCount, authorPostReactions, currUser });
                        console.log("commento")
                        console.log(likeCount + " " + commentCount)
                    }} />
                <FontAwesome name={iconName} size={20} color="#6C63FF" style={styles.likeStyle}
                    onPress={function () {
                        setIconName("thumbs-up")
                        let a = likeCount + 1
                        let authorPostCurrentReaction = { postId: posts.key, reactor: currUser, status: "like" }
                        authorPostReactions.push(authorPostCurrentReaction)
                        storeDataJSON(posts.Email + "Reaction", authorPostReactions)
                        liker.push(currUser)
                        setLikeCount(a)
                        storeDataJSON(posts.key + "likes", liker)
                    }} />
                <Text style={styles.likeTextStyle} >{likeCount} Likes</Text>
                <Text style={styles.commentTextStyle}>{commentCount} Comments</Text>
            </PostCard>
        )
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" color="red" animating={true} />
            </View>
        )
    }
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