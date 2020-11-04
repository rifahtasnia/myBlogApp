import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import { AuthContext } from '../provider/AuthProvider';
import { PostCard } from '../components/CustomCard';
import ImagePickerExample from '../components/ImageUpload';

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
                        <View style={{ backgroundColor: "#eae8ff", height: 300}}>
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