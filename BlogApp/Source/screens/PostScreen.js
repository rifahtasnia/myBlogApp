import React, { useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { PostCard } from '../components/CustomCard';
import { Input } from "react-native-elements";
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { storeDataJSON } from "../Function/AsyncStorageFunction";
import CommentList from '../components/CommentList';
import * as firebase from 'firebase'
import "firebase/firestore";

const months={
    0:"January",
    1:"February",
    2:"March",
    3:"April",
    4:"May",
    5:"June",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December",
}

const PostScreenActivity = (props) => {
    let comment_ = []
    const posts = props.route.params.posts
    const postDate = props.route.params.postDate
    const currUser = props.route.params.currUser
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState(0)
    const [commentsCount, setCommentCount] = useState(posts.data.comments)
    const [currentInputText, setCurrentInputText] = useState("")
    const loadComments = async () => {
        setLoading(true)
        firebase
            .firestore()
            .collection("posts")
            .doc(posts.id)
            .collection('comment_writer')
            .orderBy("written_at", "desc")
            .onSnapshot((querySnapshot) => {
                let temp_comments = [];
                querySnapshot.forEach((doc) => {
                    temp_comments.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setComments(temp_comments);
                console.log(temp_comments)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });

    };

    useEffect(() => {
        loadComments();
    }, []);

    return (
        <View style={styles.containerStyle}>  

            <ScreenHeader props={props} ></ScreenHeader>

            <PostCard> 
                <FontAwesome name="user" size={25} color="#5b588a" style={{ width: 20, marginTop: 6, marginLeft: 5 }} />
                <Text style={styles.authorTextSTyle}>{posts.data.author}</Text>
                <Text style={styles.dateStyle}>{postDate}</Text>
                <Text style={styles.postBodyStyle}>{posts.data.body}</Text>
                <FontAwesome name="thumbs-o-up" size={20} color="#6C63FF" style={styles.likeStyle} />
                <FontAwesome name="comment-o" size={20} color="#6C63FF" style={styles.commentStyle} />
                <Text style={styles.likeTextStyle} >{posts.data.likes} Likes </Text>
                <Text style={styles.commentTextStyle}>{commentsCount} Comments</Text>
            </PostCard>
            <Input
                inputStyle={{ color: "#5b588a" }}
                placeholder="Write your comment!"
                multiline={true}
                placeholderTextColor="#5b588a"
                inputContainerStyle={styles.inputStyle}
                leftIcon={<Entypo name="pencil" size={24} color="#5b588a" />}
                onChangeText={function (currentInput) {
                   setCurrentInputText(currentInput)
                }}
            />

            <AntDesign name="checkcircle" size={35} color="#6C63FF" style={{ marginBottom: 30, alignSelf: "center" }}
                onPress={function () {
                    comment_ = {
                        writer: currUser.displayName,
                        comment_body: currentInputText,
                        written_at: firebase.firestore.Timestamp.now(),
                        writer_id: currUser.uid

                    }
                    firebase.firestore().collection("notifications").doc(posts.data.userId).collection("notification_details").add({
                        post: posts,
                        name: currUser.displayName,
                        body: "commented on your post"
                    })
                    for (let omment of comments) {
                        console.log(omment)
                        firebase.firestore().collection("notifications").doc(omment.data.writer_id).collection("notification_details").add({
                            post: posts,
                            name: currUser.displayName,
                            body: "replied your comment"
                        })
                    }

                    firebase.firestore().collection("posts").doc(posts.id).collection("comment_writer").add(comment_)
                    firebase.firestore().collection("posts").doc(posts.id).update({
                        comments: commentsCount + 1
                    })
                    setCommentCount(commentsCount + 1)
                }}
            />

            <FlatList
                data={comments}
                extraData={comments}
                renderItem={function ({ item }) {
                    return (
                        <CommentList comments={item} />
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    authorTextSTyle: {
        position: "absolute",
        fontFamily: 'serif',
        fontSize: 25,
        color: "#5b588a",
        marginLeft: 30
    },

    dateStyle: {
        color: "#5b588a",
        fontSize: 10,
        fontStyle: 'italic',
        marginTop: 3,
        marginLeft: 5,
        marginBottom: 10
    },

    postBodyStyle:{
        fontFamily: 'serif',
        marginBottom: 10,
        color: "#000",
        fontSize: 20,
        marginLeft: 5
    },

    inputStyle:{
        color: "#5b588a",
        borderColor: "#5b588a",
        marginHorizontal: 20,
        marginTop: 10,
    },

    containerStyle:{
        flex:1
    },

    commentTextStyle:{
        fontSize: 13,
        fontFamily: 'serif',
        color:"#6C63FF",
        width:90,
        right:30,
        position:"absolute",
        bottom: 2
    },
   
    commentStyle:{
        position: 'absolute',
        bottom: 3,
        right: 5
    },

    likeTextStyle: {
        fontSize: 13,
        fontFamily: 'serif',
        color: "#6C63FF",
        width: 60,
        left: 30,
        position: "absolute",
        bottom: 2
    },

    likeStyle: {
        bottom: 2,
        width: 36,
        left: 5
    },
})

export default PostScreenActivity