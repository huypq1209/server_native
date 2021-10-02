import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Platform, Modal, Image, Text, View, Pressable, FlatList, ActivityIndicator, TextInput, Alert, RefreshControl, ScrollView } from 'react-native'

import * as Animatable from 'react-native-animatable';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Home from './Home'
import ShoppingCartIcon  from '../components/ShoppingCartIcon'
import UserPosts from './UserPosts'
import Cart from './Cart';
import { Provider } from 'react-redux';
const Tab= createBottomTabNavigator();
const Drawer=createDrawerNavigator()
import store from '../store';
import { combineReducers } from 'redux';

const Tabs=(props)=>{
    const { navigation, route: { params: { id } } } = props
    const [itemId, setItemId] = useState(id)
    console.log(id)

    
    return(
      <Provider store={store}>
        <Tab.Navigator 
            
            tabBarOptions={{
                
                showLabel:false,
                style:{
                    position:'absolute',
                    
                    elevation:0,
                    backgroundColor:'#60bff1',
                    // borderTopLeftRadius:15,
                    // borderTopRightRadius:15,
                    
                    height:50,
                    shadowColor:'black',
                    shadowOffset:{
                        width:0,
                        height:10
                    },
                    shadowOpacity:0.25,
                    shadowRadius:3.5
                }

            }}
        >
            <Tab.Screen name="Home" component={Home} 
                initialParams={{id:itemId}}

                options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                            <Icon name="home" size={20} style={{color:focused?"#e32f45":"#ffffff" }} />
                            <Text style={{color:focused?"#e32f45":"#ffffff"}}>HOME</Text>
                        </View>
                    ),
                    headerRight:(<ShoppingCartIcon/>)
                }}
            />
            <Tab.Screen name="Cart" component={Cart} 
                initialParams={{id:itemId}}

                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                            <ShoppingCartIcon />
                            <Text style={{color:focused?"#e32f45":"#ffffff"}}>CART</Text>
                        </View>
                    )
                }}
            />
            <Tab.Screen name="UserPosts" component={UserPosts} 
                initialParams={{id:itemId}}
                 options={{
                    tabBarIcon: ({focused})=>(
                        <View style={{alignItems:'center',justifyContent:'center',top:5}}>
                            <Icon name="cog" size={20} style={{color:focused?"#e32f45":"#ffffff" }} />
                            <Text style={{color:focused?"#e32f45":"#ffffff"}}>SETTINGS</Text>
                        </View>
                    )
                }}
            />
           
        </Tab.Navigator>
        </Provider>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
export default Tabs
