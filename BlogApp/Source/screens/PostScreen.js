import React, {useState} from 'react';
import { Text, View, StyleSheet, FlatList} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { PostCard } from '../components/CustomCard';
import { Input } from "react-native-elements";
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { storeDataJSON } from "../Function/AsyncStorageFunction";
import CommentList from '../components/CommentList';

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
    console.log(props)
    const post=props.route.params.posts
    const authorName=props.route.params.Name
    const currentUser=props.route.params.currUser
    const [commentsCount,setCommentCount]=useState(props.route.params.commentCount)
    const [likeCount,setLikeCount]=useState(props.route.params.likeCount)
    const[comments,setComments]=useState(props.route.params.comments)
    const [currentInputText,setCurrentInputText]=useState("")
    const [authorPostReactions, setAuthorPostReactions] = useState(props.route.params.authorPostReactions);
    
    console.log(props.route.params.likeCount+"authe "+likeCount)

    return (
        <View style={styles.containerStyle}>  

            <ScreenHeader props={props} ></ScreenHeader>

            <PostCard> 
                <FontAwesome name="user" size={25} color="#5b588a" style={{ width: 20, marginTop: 6, marginLeft: 5 }} />
                <Text style={styles.authorTextSTyle}>{authorName}</Text>
                <Text style={styles.dateStyle}>{post.postDate}</Text>
                <Text style={styles.postBodyStyle}>{post.postText}</Text>
                <FontAwesome name="thumbs-o-up" size={20} color="#6C63FF" style={styles.likeStyle} />
                <FontAwesome name="comment-o" size={20} color="#6C63FF" style={styles.commentStyle} />
                <Text style={styles.likeTextStyle} >{likeCount} Likes</Text>
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
                    let authorPostCurrentReaction = { postId: post.key, reactor: currentUser, status: "comment", commentBody: currentInputText }
                    authorPostReactions.push(authorPostCurrentReaction)
                    let month = new Date().getMonth()
                    let recentComment = { commenter: currentUser, commentBody: currentInputText, commentDate: new Date().getDate() + ' ' + months[month] + ',' + new Date().getFullYear(), key: commentsCount }
                    comments.reverse()
                    comments.push(recentComment)

                    storeDataJSON(post.key + "Comment", comments)
                    storeDataJSON(post.Email + "Reaction", authorPostReactions)
                    console.log(post.Email + " " + post.key)
                    console.log(comments)
                    setCommentCount(comments.length)
                    comments.reverse()
                }}
            />

            <FlatList
                data={comments}
                extraData={comments}
                renderItem={function ({ item }) {
                    return (
                        <CommentList comment={item} />
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