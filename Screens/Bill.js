import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Platform, Modal, Image, View, Pressable, Share, FlatList, Animated, ActivityIndicator, TextInput, Alert, RefreshControl, ScrollView } from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import { io } from 'socket.io-client';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyText from '../components/MyText'
const Bill = props => {
    const { navigation, route: { params: { id } } } = props
    const [itemId, setItemId] = useState(id)
    const [bill, setBill] = useState([])
    const [item, setItem] = useState([])
    const [guest, setGuest] = useState([])
    const [type, setType] = useState([])


    const [isLoading, setIsLoading] = useState(false)
    const url = 'http://192.168.31.155:3000/api/bills/guest/' + itemId
    useEffect(() => {
        const socket = io('http://192.168.31.155:3000')
        socket.on('server_msg', msg => {
            console.log('server : ', msg)
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setItem(data.item)
                    setBill(data.bill)
                    setGuest(data.guest)
                    setType(data.type)
                }
                )
                .catch((err) => console.log("loi:" + err))
        })
    })
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setItem(data.item)
                setBill(data.bill)
                setGuest(data.guest)
                setType(data.type)
            }
            )
            .catch((err) => console.log("loi:" + err))
    }, [])
    const renderItem = ({ item, index }) => {
    //     const url1 = 'http://192.168.31.155:3000/api/items/' + item.itemId

    // useEffect(() => {
    //     fetch(url)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setItems(data.item)
    //             setType(data.type)
    //             // console.log(data)
    //         }
    //         )
    //         .catch((err) => console.log("loi:" + err))
    // }, [])

        const ondelete = () => {
            const option = {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },

            }
            const url = 'http://192.168.31.155:3000/api/bills/delete/' + item._id
            fetch(url, option)
                .then((res) => res.json())
                .then((res) => {
                    alert('Đã xóa')
                    fetch('http://192.168.31.155:3000/api/bills/guest/' + itemId)
                        .then((res) => res.json())
                        .then((data) => {
                            setItem(data.item)
                            setBill(data.bill)
                            setGuest(data.guest)
                            setType(data.type)
                        }
                        )
                        .catch((err) => console.log("loi:" + err))
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
                        margin: 10,
                    }]}>
                <TouchableRipple onPress={ondelete} >
                    <Icon name="window-close" color="red" size={25} style={{ alignSelf: 'flex-end' }} />

                </TouchableRipple>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>

                    <View style={{}}>
                        <View>
                            <MyText style={styles.text}>Tên sản phẩm: {item.name}</MyText>
                            <MyText style={styles.text}>Ngày mua: {item.date}</MyText>
                        </View>
                        <Text style={styles.text}>Giá: {item.price}VND</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>


                </View>
            </Animated.View>

        )
    }

    return (
        <>
            <View style={{ alignItems: 'center', backgroundColor: '#60bff1' }}>
                <Icon style={{ marginVertical: 5 }}
                    name="money" size={50}
                />
            </View>

            <Animatable.View
                animation="fadeInLeft" duration={500}
                style={{ flex: 1 }}>





                <Animated.FlatList

                    style={{ marginBottom: 25 }}
                    data={bill}
                    renderItem={renderItem}
                    keyExtractor={(item) => { item._id }}
                />




            </Animatable.View>



        </>
    );
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
export default Bill