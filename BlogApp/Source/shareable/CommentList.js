import React , { useState, useEffect }  from 'react'
import { View, Button, Flatlist, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome, AntDesign, Entypo} from '@expo/vector-icons';
import {CommentCard} from '../shareable/customCard'

const CommentList=(props)=>{
    const comment=props.comment
    const commenter=comment.commenter
    const commentBody=comment.commentBody
    const date=comment.commentDate
    console.log(commentBody+" laal")
    return(
        <View>
            <CommentCard>
                <Entypo name="user" size={14} color="#5b588a" style={styles.iconStyle} />
                <Text style={styles.CommenterStyle}>{commenter.name}</Text>
                <Text style={styles.postBodyStyle}>{commentBody} </Text>
                <Text style={styles.dateStyle}> {date} </Text>
            </CommentCard>
        </View>
    )
}

const styles= StyleSheet.create({
    CommenterStyle: {
        fontSize: 12,
        fontFamily: 'serif',
        color: "#5b588a",
        marginLeft: 25
    },
        iconStyle:{
            position: "absolute",
            marginLeft: 5,
            marginTop: 2
    },
    postBodyStyle: {
            color:"#6C63FF",
            fontFamily:'serif',
            fontSize:16,
        left: 7
    },

    dateStyle: {
        color: "#000",
        fontSize: 8,
        fontStyle: 'italic',
        marginTop: 5,
        marginLeft: 5,
        marginBottom: 5
    },
})

export default CommentList