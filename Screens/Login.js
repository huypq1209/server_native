import React, { useState, useEffect } from 'react'
import { StyleSheet, TextInput, Platform, Image, Text, View, Pressable, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
const Login = props => {
    const { navigation } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState(null)
    const [secure, setSecure] = useState(true)
    const [eye, setEye] = useState(false)
    const { colors } = useTheme();
    const showPass = () => {
        setSecure(!secure)
        setEye(!eye)
    }

    const onLogin = () => {
        const option = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }

        const url = 'http://192.168.31.155:3000/api/login/'

       
            fetch(url, option)
                .then((res) => res.json())
                .then((res) => {
                    if (res.status) {
                        console.log(res)
                        navigation.replace('Tabs',{id:res.user._id})
                        
                    } else {
                        
                    }
                }
                )
                .catch((err) => console.log("loi:" + err))
   
    }
    return (

        <View style={styles.container}>
            <StatusBar backgroundColor='#60bff1' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Username</Text>
                <View style={styles.action}>
                    <Icon
                        name="user-o"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Username"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        value={username}
                        onChangeText={setUsername}

                    />

                </View>


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={true}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity >

                    </TouchableOpacity>
                </View>



                <TouchableOpacity>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={onLogin}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#60bff1']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.replace('SignUp')}
                        style={[styles.signIn, {
                            borderColor: '#60bff1',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );

}
const styles = StyleSheet.create({
    // input:{
    //     paddingLeft:15,
    //     fontSize:15, 
    //     width:"90%" ,
    //     borderWidth:1,
    //     marginHorizontal:'4%',
    //     borderRadius:50,
    //     alignItems:'center',
    //     flexDirection:'row',

    // },
    // text:{
    //     paddingLeft:30,
    //     paddingVertical:5,
    //     fontStyle:'italic',
    //     color:'black',
    //     fontSize:20
    // },
    // button:{
    //     fontSize:20,
    //     color:'#102751',
    //     textAlign:'center',
    //     width:120,
    //     fontWeight:'bold',
    //     paddingVertical:5, 
    //     borderWidth:1,
    //     borderRadius:20,
    //     borderColor:'darkblue'
    // },
    // button1:{
    //     fontSize:20,
    //     color:'white',
    //     backgroundColor:'#102751',
    //     textAlign:'center',
    //     width:120,
    //     fontWeight:'bold',
    //     paddingVertical:5, 
    //     borderWidth:1,
    //     borderRadius:20,
    //     borderColor:'darkblue'
    // },
    // buttonContainer:{     
    //     margin:10,
    //     marginTop:40,
    //     flexDirection:'row',
    //     justifyContent:"space-around"   
    // },
    container: {
        flex: 1,
        backgroundColor: '#60bff1'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
export default Login