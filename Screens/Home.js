import React, { useState, useEffect } from 'react'
import { StyleSheet, LogBox, Platform, Modal, Image, Text, View, Pressable, Share, FlatList, Animated, ActivityIndicator, TextInput, Alert, RefreshControl, ScrollView } from 'react-native'

import * as Animatable from 'react-native-animatable';
import { io } from 'socket.io-client';
import MyText from '../components/MyText'
import Products from '../components/Products';
import { connect } from 'react-redux';
import { Searchbar, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const Home = props => {
    const { navigation } = props
    const [items, setItems] = useState([])
    const [type, setType] = useState([])
    const [items2, setItems2] = useState([])
    const [search, setSearch] = useState('')
    // const url='http://10.0.2.2:3000/api/items'
    const url = 'http://192.168.31.155:3000/api/items'

    useEffect(() => {
        const socket = io('http://192.168.31.155:3000')
        socket.on('server_msg', msg => {
            console.log('server : ', msg)
            // setItems([])
            // setType([])
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setItems(data.item)
                    setItems2(data.item)
                    setType(data.type)
                    // console.log(data)
                }
                )
                .catch((err) => console.log("loi:" + err))
        })
    })

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.item)
                setItems2(data.item)
                setType(data.type)
                // console.log(data)
            }
            )
            .catch((err) => console.log("loi:" + err))
    }, [])

    const searchItem = (text) => {
        if(text){
        console.log(text)
        
        const newData = items2.filter(item => {
            const itemData = item.name.toUpperCase();
            const textData = text.toUpperCase();
      
            return itemData.indexOf(textData) > -1;
          });
          setItems(newData)
          setSearch(text)
        }else{
            setItems(items2)
            setSearch(text)
        } 
           
            
    }
    const header = () => {
        return (
            <Searchbar placeholder="Type here..." value={search}  onChangeText={(text) => searchItem(text) } />
        )
    }
    LogBox.ignoreAllLogs();
    const renderItem = ({ item }) => {

        const type1 = type.filter(data => {
            return data._id == item.type
        })







        return (
            <>

                {items.length > 0 ?

                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
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
                                    {/* <FlatList 
                            data={type1}
                            renderItem={({item}) => <MyText>Nhãn hiệu:{item.name}</MyText>} 
                            keyExtractor={(item) => (item._id)}
                            /> */}
                                </View>

                                <Text style={styles.text}>{item.price}VND</Text>
                                <Pressable
                                    style={{ flexDirection: 'row', backgroundColor: 'yellow', marginHorizontal: 20, padding: 5, justifyContent: 'center', borderWidth: 0.2, borderRadius: 5 }}
                                    onPress={() => {
                                        alert("Added to Cart")
                                        props.addItemtoCart(item)
                                    }}>
                                    <Text >
                                        Thêm
                                    </Text>
                                    <Icon name="shopping-cart" size={20} />
                                </Pressable>
                            </View>
                        </Pressable>
                    </View>

                    :
                    <Text>Đang tải dữ liệu</Text>
                }
            </>
        )
    }

    return (


        <>
            <View style={{ alignItems: 'center', backgroundColor: '#60bff1' }}>
                <Image style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 0.5,
                    borderColor: 'black',
                    marginVertical: 5

                }}
                    source={require('../images/steam.png')}
                />
            </View>

            <Searchbar placeholder="Type here..." value={search}  onChangeText={(text) => searchItem(text) } />
            <FlatList

                style={{ margin: 5,marginBottom:50 }}
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                numColumns={2}
                // ListHeaderComponent={header}
            />
       </>




    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        addItemtoCart: product => dispatch({ type: 'ADD_TO_CART', payload: product })
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

export default connect(null, mapDispatchToProps)(Home)