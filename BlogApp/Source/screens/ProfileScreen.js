import React from 'react'
import {Text,Button,View,StyleSheet} from 'react-native'
import ImagePickerExample from  '../shareable/ImageUpload'
import ScreenHeader from '../shareable/ScreenHeader'
import {AuthContext} from '../provider/AuthProvider'
import {PostCard} from '../shareable/customCard'

const ProfileScreenActivity=(props)=>{
    return(
        <AuthContext.Consumer>
        {(auth) => (
       <View style={{flex:1}}> 
                    <ScreenHeader props={props} ></ScreenHeader>
                    <View style={{ justifyContent: "center", alignSelf: "center", marginVertical: 40 }}>
                        <ImagePickerExample props={props} />
                    </View>

                    <PostCard>
                        <View style={{ backgroundColor: "#eae8ff", height: 300, borderColor: "#5b588a", borderWidth: 0 }}>
                            <Text style={styles.textSyle}>{auth.CurrentUser.name} </Text>
                            <Text style={styles.profileStyle}>Employee ID : {auth.CurrentUser.sid} </Text>
                            <Text style={styles.profileStyle}>Works at Stark Industries</Text>
                            <Text style={styles.profileStyle}>Malibu, California</Text>
                        </View>
                    </PostCard>
                </View>
            )}
        </AuthContext.Consumer>
    )
}

const styles=StyleSheet.create({
    buttonView:{
        marginLeft:30,
        marginRight:30,
        marginVertical:15,
    },

    textSyle:{
        fontFamily:"serif",
        fontSize: 30,
        color: "#5b588a",
        alignSelf: "center",
        marginBottom: 10,
        marginTop: 60
    },

    profileStyle:{
        fontFamily:"serif",
        fontSize:20,
        color: "#5b588a",
        alignSelf: "center",
        marginBottom: 5,
    }
}
);

export default ProfileScreenActivity