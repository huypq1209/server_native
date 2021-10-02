import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Platform, Modal, Image, View, Pressable, Share, FlatList, Animated, ActivityIndicator, TextInput, Alert, RefreshControl, ScrollView } from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyText from '../components/MyText'
const Cart = props => {
    const { navigation, route: { params: { id } } } = props
    const [itemId, setItemId] = useState(id)
    console.log(props.cartItems)
    
    const [isLoading, setIsLoading] = useState(false)

    
    const renderItem = ({ item, index }) => {     
        const addToBill = () => {
            const option = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                       name:item.name,
                       date: new Date().toLocaleDateString(),
                       guestId:itemId,
                       itemId:item._id,
                       price:item.price             
                })
            }
    
            const url = 'http://192.168.31.155:3000/api/bills/insert'
    
           
                fetch(url, option)
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.status) {
                            console.log(res)
                            alert('Mua thành công')
                            props.removeItem(item)                     
                        } else {
                            
                        }
                    }
                    )
                    .catch((err) => console.log("loi:" + err))
       
        }   
        return (
            
            <Animated.View
                style={[                   
                 {
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 20,
                    margin: 20,
                }]}>
                    <View style={{flexDirection:'row',justifyContent:'center',marginBottom:20}}>
                <Image
                    style={{
                        alignSelf:'center',
                        width: 100,
                        height: 100,
                        borderRadius: 20
                    }}
                    source={{uri:item.img}} />
                <View style={{}}>
                    <View>
                        <MyText style={styles.text}>{item.name}</MyText>
                    </View>
                    <Text style={styles.text}>{item.price}VND</Text>
                </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <TouchableRipple onPress={addToBill}>
                        <Text
                            style={{ backgroundColor: 'yellow', padding: 8, paddingHorizontal: 40, borderRadius: 10, color: 'orangered', fontWeight: 'bold' }}
                        >PAY</Text>
                    </TouchableRipple>
                    <TouchableRipple onPress={()=>{
                        props.removeItem(item)
                    }} >
                        <Text
                            style={{ backgroundColor: 'red', padding: 8, paddingHorizontal: 20, borderRadius: 10, color: 'white', fontWeight: 'bold' }}
                        >CANCEL</Text>
                    </TouchableRipple>
                </View>
            </Animated.View>

        )
    }

    return (
        <>
            <View style={{ alignItems: 'center', backgroundColor: '#60bff1' }}>
                <Icon style={{ marginVertical: 5 }}
                    name="shopping-cart" size={50}
                />
            </View>
            
            <Animatable.View
                animation="fadeInLeft" duration={500}
                style={{ flex: 1 }}>
                




                <Animated.FlatList
                   
                    style={{ marginBottom: 25 }}
                    data={props.cartItems}
                    renderItem={renderItem}
                    keyExtractor={()=>{}}
                />




            </Animatable.View>



        </>
    );
}
const mapStatetoProps=(state)=>{
    return{  
        cartItems:state,
        
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        removeItem:product => dispatch({type:'REMOVE',payload:product})
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginVertical: 5,
        marginLeft: 5,


    },
    label: {
        margin: 8,
        fontSize: 15,
        fontFamily: 'Arial',
        fontWeight: 'bold'

    },
    imputText: {
        borderWidth: 1,
        margin: 5,
        padding: 10,
        borderRadius: 15
    },
    press: {
        width: 100,
        marginTop: 20,
        padding: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#102751',
        borderWidth: 1,
        borderColor: '#102751',
        borderRadius: 20,
        textAlign: 'center',

    },
    iconContainer: {
        paddingVertical: 5,

        borderTopWidth: 1,
        marginTop: 10,
        // borderBottomWidth:1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // backgroundColor:'black'
    },


})
export default connect(mapStatetoProps,mapDispatchToProps)(Cart)