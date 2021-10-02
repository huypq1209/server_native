import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Animated, Platform, Modal, Image, View, Pressable, FlatList, ActivityIndicator, TextInput, Alert, RefreshControl, ScrollView } from 'react-native'

import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';


import { Picker } from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import MyText from '../components/MyText'
import CheckBox from '@react-native-community/checkbox';
import * as Animatable from 'react-native-animatable';
const UserPosts = props => {
    // const{navigation}=props
 const { navigation, route: { params: { id } } } = props
 const [itemId, setItemId] = useState(id)
 const [data,setData]=useState([])
 console.log(itemId)
 const url = 'http://192.168.31.155:3000/api/guest/' + itemId

 useEffect(() => {
     fetch(url)
         .then((res) => res.json())
         .then((data) => {
             console.log(data)
             setData(data.item)
         }
         )
         .catch((err) => console.log("loi:" + err))
 }, [])
    
    const onLogout = () => {
      console.log('aaaa')
      const url = 'http://192.168.31.155:3000/api/logout'

     
          fetch(url)
              .then((res) => res.json())
              .then((res) => {
                  if (res.status) {
                  
                      navigation.replace('Login')
                
                  } else {
                      
                  }
              }
              )
              .catch((err) => console.log("loi:" + err))
 
  }
    return (
        <>
        <View style={{ alignItems: 'center',backgroundColor:'#60bff1' }}>
                <Icon style={{marginVertical:5}}
                   name="user" size={50}
                />
            </View>
            <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row',marginLeft:5, marginTop: 15}}>
          <Icon style={{marginVertical:5,alignSelf:'center',borderWidth:1,padding:10,paddingHorizontal:18,borderRadius:500}}
                   name="user" size={50}
                />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{data.fullname}</Title>
            <Text style={styles.caption}>Khách hàng</Text>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="location-arrow" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>TP HCM</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{data.phone}</Text>
        </View>
        
      </View>

      

      <View style={styles.menuWrapper}>
        
      <TouchableRipple onPress={() => {navigation.navigate('Bill',{id:itemId})}} >
          <View style={styles.menuItem}>
            <Icon name="money" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Bills</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {navigation.navigate('ChangePass',{id:itemId})}} >
          <View style={styles.menuItem}>
            <Icon name="key" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={onLogout}> 
          <View style={styles.menuItem}> 
            <Icon name="reply" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Log out</Text>
          </View>
        </TouchableRipple>
        
      </View>
            

        </>

    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });
export default UserPosts