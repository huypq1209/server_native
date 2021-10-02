import React, { useState, useEffect,Component } from 'react'
import { StyleSheet, Platform, Modal, Image, Text, View, Pressable, Share, FlatList, Animated, ActivityIndicator, TextInput, Alert, RefreshControl, ScrollView } from 'react-native'
import MyText from '../components/MyText'
const Products =(props)=>  {


//    renderProducts = (products) => {
//         console.log(products)
//         return 
        const products=(item, index) => {
            return (
                <View key={index}
                    style={{ flex: 1, justifyContent: 'space-between' }}
                >
                    <Pressable onPress={() => {
                        navigation.navigate('Details',
                            {
                                _id: item._id,
                            })
                    }}>
                        <View
                            style={[{
                                minHeight: 200,
                                alignSelf: 'stretch',
                                flex: 0.5,
                                justifyContent: 'space-between',
                                backgroundColor: 'white',
                                padding: 5,
                                borderRadius: 20,
                                margin: 10
                            }]}>
                            <Image
                                style={{
                                    alignSelf: 'center',
                                    width: 100,
                                    height: 100,
                                    margin: 5
                                }}
                                source={{ uri: item.img }} />


                            <View>
                                <MyText style={styles.text}>{item.name}</MyText>
                            </View>

                            <Text style={styles.text}>{item.price}VND</Text>
                            <Pressable>
                                <Text style={{ backgroundColor: 'yellow', marginHorizontal: 20, padding: 5, textAlign: 'center', borderWidth: 0.2, borderRadius: 5 }} >Mua</Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </View>
            )
        }
    }
    
   



const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'red',
        marginVertical: 15,
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
export default Products