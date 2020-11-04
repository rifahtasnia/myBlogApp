import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from 'react-native';
import { Input, Button } from "react-native-elements";
import { FontAwesome, AntDesign ,Ionicons, Entypo } from "@expo/vector-icons";
import { AuthCard } from '../components/CustomCard';
import { storeDataJSON } from "../Function/AsyncStorageFunction";


const SignUpScreenActivity=(props) =>{
    const [Name, setName] = useState("");
    const [SID, setSID] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    return(
        
        <View style={styles.viewStyle}>
            <Image source={require('./../../assets/signup.png')}
                resizeMode="center"
                style={styles.imgStyle}>
            </Image>
                   
            <AuthCard  >
                <Text style={styles.titleView}>Welcome to Stark Expo!</Text>
                <Input
                    inputStyle={styles.themeColor}
                    leftIcon={<Ionicons name="ios-person" size={24} color="#6C63FF" />}
                    placeholder="Name"
                    placeholderTextColor="#6C63FF"
                    onChangeText={function (currentInput) {
                        setName(currentInput);
                    }}
                />
                <Input
                    inputStyle={styles.themeColor}
                    placeholderTextColor="#6C63FF"
                    leftIcon={<Ionicons name="ios-school" size={24} color="#6C63FF" />}
                    placeholder="ID"
                    onChangeText={function (currentInput) {
                        setSID(currentInput);
                    }}
                />
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
                        title="  Sign Up!"
                        buttonStyle={styles.buttonView}
                        onPress={function () {
                            let currentUser = {
                                name: Name,
                                sid: SID,
                                email: Email,
                                password: Password,
                            }
                            console.log(currentUser)
                            storeDataJSON(Email, currentUser);
                            props.navigation.navigate("SignIn");
                        }}
                    />
                </View>
                <Button
                    type="clear"
                    title="Already have an account?"
                    titleStyle={styles.themeColor}
                    onPress={function () {
                        props.navigation.navigate("SignIn");
                    }}
                />
            </AuthCard>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      justifyContent: "center",
     
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

export default SignUpScreenActivity;