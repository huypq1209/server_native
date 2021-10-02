import React, { useState, useEffect, useCallback } from 'react'
import {
    Share, Animated,
    StyleSheet, FlatList, Platform, Modal,
    Image, Pressable, Text, View, Alert,
    TextInput, ActivityIndicator, ScrollView, RefreshControl
} from 'react-native'
import {
    Avatar,
    Title,
    Caption,

    TouchableRipple,
} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import MyText from '../components/MyText';

import Icon from 'react-native-vector-icons/FontAwesome';

const Details = props => {
    const { navigation, route: { params: { _id } } } = props
    const [itemId, setItemId] = useState(_id)
    const [items, setItems] = useState([])
    const [type, setType] = useState([])
    const url = 'http://192.168.31.155:3000/api/items/' + itemId

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.item)
                setType(data.type)
                // console.log(data)
            }
            )
            .catch((err) => console.log("loi:" + err))
    }, [])
    const type1 = type.filter(data => {
        return data._id == items.type

    })
    console.log(type1)
    return (

        <>

            <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', backgroundColor: '#60bff1' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', margin: 10 }}>Details</Text>
                </View>

                <View style={styles.container}>


                    <View>

                        <FlatList
                            nestedScrollEnabled
                            data={type1}
                            renderItem={({ item }) =>

                                <>
                                    <Text style={{ color: 'blue', fontSize: 30, fontWeight: 'bold' }}>{items.name}</Text>
                                    <Image
                                        style={{
                                            width: 250,
                                            height: 250,
                                            margin: 5
                                        }}
                                        source={{ uri: items.img }}

                                    />
                                    <MyText>Nhãn hiệu:{item.name}</MyText>
                                    <Text style={styles.text}>Giá: {items.price}VND</Text>
                                    <MyText style={styles.text}>{items.chitiet}</MyText>
                                </>


                            }
                            keyExtractor={(item) => item._id}
                        />
                    </View>


                    {/* <TouchableRipple onPress={() => navigation.navigate('Tabs') }>
                        <Text
                            style={{ backgroundColor: 'yellow', padding: 8,textAlign:'center', borderRadius: 10, color: 'orangered', fontWeight: 'bold' }}
                        >ADD TO CART</Text>
                    </TouchableRipple> */}
                </View>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,

    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        marginVertical: 5,
        marginLeft: 5,


    },
})

export default Details