import React, { useState } from "react";
import {Text, StyleSheet,View,Image,TouchableOpacity} from 'react-native';
import { Input, Button } from "react-native-elements";
import { FontAwesome, Feather, AntDesign ,Ionicons ,Fontisto,Entypo } from "@expo/vector-icons";
import {AuthContext} from "../provider/AuthProvider"
import { AuthCard } from '../shareable/customCard'
import { getDataJSON, clearAsyncStorage } from "../Function/AsyncStorageFunction";
import AsyncStorage from '@react-native-async-storage/async-storage';




const SignInScreenActivity=(props) =>{
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return(
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.viewStyle}>

                    <Image source={require('./../../assets/signin.png')}
                        resizeMode="center"
                        style={styles.imgStyle}>
                    </Image>

                    <AuthCard  > 
                        <Text style={styles.titleView}>Welcome to Stark Expo !</Text> 
                        <Input 
                            inputStyle={styles.themeColor}
                            leftIcon={<FontAwesome name="envelope" size={24} color="#6C63FF" />}
                            placeholder="E-mail Address"
                            placeholderTextColor="#6C63FF"
                            onChangeText={function (currentInput) {
                                setEmail(currentInput);
                          }}
                        />

                        <Input
                            inputStyle={styles.themeColor}
                            placeholder="Password"
                            placeholderTextColor="#6C63FF"
                            leftIcon={<Entypo name="key" size={24} color="#6C63FF" />}
                            secureTextEntry={true}
                            onChangeText={function (currentInput) {
                                setPassword(currentInput);
                            }}
                        />

                        <View style={styles.buttonView}>
                        <Button
                                color="#6C63FF"
                                icon={<AntDesign name="login" size={24} color='white' />}
                                title="  Sign In!"
                                buttonStyle={styles.buttonView}
                                onPress={async function () {
                                    let UserData = await getDataJSON(Email);
                                    console.log(UserData)
                                    console.log(Email)
                                    if (UserData.password == Password) {
                                        auth.setIsLoggedIn(true)
                                        auth.setCurrentUser(UserData);
                                    }
                                    else {
                                        alert("Login Failed")
                                    }
                                }}
                            />
                        </View>
                        <Button
                            type="clear"
                            title="Don't Have An Account?"
                            titleStyle={styles.themeColor}
                            onPress={function () {
                                props.navigation.navigate("SignUp");
                            }}
                        />
                        {/*<Button
                            type="clear"
                            title="Clear Data"
                            titleStyle={styles.themeColor}
                            onPress={async function () {
                                clearAsyncStorage()
                            }}
                        />*/}  
                    </AuthCard>
                </View>
            )}
        </AuthContext.Consumer>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      justifyContent: "center"
    },

    imgStyle: {
        width: 400,
        height: 300,
        alignSelf: "center"
    },

    buttonView:{     
        marginLeft:5,
        marginRight:5,
        backgroundColor:"#6C63FF",
    },

    themeColor:{
        color:"#6C63FF"
    },

    titleView:{
        color:"#6C63FF",
        fontSize:23,
        marginLeft:60,
        marginVertical:15,
        justifyContent:"center",
        fontFamily:'sans-serif-medium',
    }  
  });

export default SignInScreenActivity;