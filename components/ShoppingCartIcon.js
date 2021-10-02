import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

const ShopingCartIcon = props => {
    return (
        <View>
            <View style={{
                position:'absolute',
                height:20,width:20,borderRadius:50,
                backgroundColor:'blue',
                right:10,
                bottom:5,
                zIndex:2000
                }}><Text style={{color:'white',textAlign:'center'}}>{props.cartItems.length}</Text></View>
        <Icon name='shopping-cart' size={20} color="white"/>
        </View>
    )
}
const mapStatetoProps=(state)=>{
    return{  
        cartItems:state,
        
    }
}
export default connect(mapStatetoProps)(ShopingCartIcon)

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