import 'react-native-gesture-handler';
import { StyleSheet, Platform, Modal, Image, Text, View, Pressable, FlatList, ActivityIndicator, TextInput, Alert, RefreshControl, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './Screens/Home'
// import Loading from './Screens/Loading'
import Login from './Screens/Login'
import SignUp from './Screens/SignUp'
import Details from './Screens/Details'
import Cart from './Screens/Cart'
import Tabs from './Screens/Tabs'
import SplashScreen from './Screens/SplashScreen'
import ChangePass from './Screens/ChangePass'
import Bill from './Screens/Bill'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ShoppingCartIcon  from './components/ShoppingCartIcon'
import { Provider } from 'react-redux';

// import store from '../store';
const Stack = createStackNavigator(
)

const App = () => {
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{

        headerRight: () => (
          <View style={{ backgroundColor: 'none' }}>
            {/* <Image 
              style={{width:40,height:40,resizeMode:'contain',alignSelf:'center',margin:10}}
              source= {require('./images/twitter.png')}/> */}
          </View>
        ),
      }} >
        <Stack.Screen name="Home" component={Home}
          
            
          options={{headerRight:()=>{<ShoppingCartIcon/>}}}
        />
        {/* <Stack.Screen name="Loading" component={Loading} 
        options={{
          
          title:'',
          headerTransparent:'false',
          }} /> */}
        <Stack.Screen name="Login" component={Login}
          options={{
            headerTransparent: 'false',
            title: '',

          }}
        />
        <Stack.Screen name="ChangePass" component={ChangePass}
          options={{
            headerTransparent: 'false',
            title: '',

          }}
        />
        <Stack.Screen name="SignUp" component={SignUp}
          options={{
            headerTransparent: 'false',
            title: '',

          }}
        />
        <Stack.Screen name="Details" component={Details}
          options={{
            headerTransparent: 'false',
            title: '',

          }}
        />
        <Stack.Screen name="Bill" component={Bill}
          options={{
            headerTransparent: 'false',
            title: '',

          }}
        />
        <Stack.Screen name="Cart" component={Cart}
        />

        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerTransparent: 'false',
            title: '',


          }}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen}
          options={{
            headerTransparent: 'false',
            title: '',

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  )
}

export default App;
