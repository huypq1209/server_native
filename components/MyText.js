import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text } from 'react-native'


const MyText = props => {
    return (
        <Text style={styles.text}>{props.children}</Text>
    )
}

export default MyText

const styles = StyleSheet.create({
    text: {
        color:'black',
        fontStyle:'italic',
        opacity:0.5,
        marginLeft:5,
        marginVertical:5,
        fontWeight:'bold',
        fontSize:18
        
    }
})