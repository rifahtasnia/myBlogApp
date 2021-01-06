import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, ActivityIndicator, FlatList } from 'react-native';
import { storeDataJSON, getDataJSON } from "../Function/AsyncStorageFunction";
import { Input } from "react-native-elements";
import { AuthContext } from '../provider/AuthProvider';
import { PostCard } from '../components/CustomCard';
import ScreenHeader from '../components/ScreenHeader';
import PostList from '../components/PostList';
import { Entypo } from "@expo/vector-icons";
import * as firebase from 'firebase'
import "firebase/firestore";


const HomeScreenActivity = (props) => {
    console.log("OK")
    const [RecentPost, setRecentPost] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    let ref = ""


    const loadPosts = async () => {
        setLoading(true)
        firebase
            .firestore()
            .collection("posts")
            .orderBy("created_at", "desc")
            .onSnapshot((querySnapshot) => {
                let temp_posts = [];
                querySnapshot.forEach((doc) => {
                    temp_posts.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setPosts(temp_posts);
                console.log("Temp")
                console.log(temp_posts)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert(error);
            });
    };

    useEffect(() => {
        loadPosts();
    }, []);

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={{ flex: 1 }}>
                    <ScreenHeader props={props} ></ScreenHeader>
                    <PostCard>
                        <Input
                            inputStyle={{ color: "#5b588a" }}
                            placeholder="What's On Your Mind?"
                            multiline={true}
                            placeholderTextColor="#5b588a"
                            leftIcon={<Entypo name="pencil" size={24} color="#5b588a" />}
                            onChangeText={function (currentInput) {
                                setRecentPost(currentInput);
                            }}
                        />
                        <View style={styles.buttonView}>
                            <Button
                                borderRadius={10}
                                color="#6C63FF"
                                title="Post"
                                titleStyle={{ color: "white" }}
                                onPress={function () {
                                    setLoading(true)
                                    console.log("Show")
                                    firebase.firestore().collection("posts").add({
                                        userId: auth.CurrentUser.uid,
                                        body: RecentPost,
                                        author: auth.CurrentUser.displayName,
                                        created_at: firebase.firestore.Timestamp.now(),
                                        likes: 0,
                                        comments: 0,
                                    }).then(() => {
                                        setLoading(false)
                                        alert("Post Created")

                                    }).catch((error) => {
                                        setLoading(false)
                                        alert(error)
                                    })

                                }} />
                        </View>
                    </PostCard>

                    {!loading ?
                        <FlatList
                            data={posts}
                            extraData={posts}
                            renderItem={function ({ item }) {
                                return (
                                    <PostList posts={item} nav={props} currentUser={auth.CurrentUser} />
                                )
                            }}
                        /> : <View style={{ flex: 1, justifyContent: "center" }}>
                            <ActivityIndicator size="large" color="red" animating={true} />
                        </View>}
                </View>
            )}
        </AuthContext.Consumer>
    ); 
}

const styles=StyleSheet.create({
    buttonView:{
        marginLeft:30,
        marginRight:30,
        marginVertical:15,      
    },

    inputStyle:{
        color:"#5b588a"    
    }
}
);

export default HomeScreenActivity