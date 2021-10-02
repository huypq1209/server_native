import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import React, { useState, useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SignUp = props => {

    const { navigation, route: { params: { id } } } = props
    const [itemId, setItemId] = useState(id)
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPassword_confirm] = useState('')
    const [data, setData] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [isSelected, setSelection] = useState(false);
    const [name, setName] = useState(null)
    const [secure, setSecure] = useState(true)
    const [eye, setEye] = useState(false)
    const [status, setStatus] = useState(null)
    const [key, setKey] = useState('')
    const [pwerr,setPwerr]=useState(null)
    const showPass=()=>{
        setSecure(!secure)
        setEye(!eye)
    }
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
    const onChangePass = () => {
        setPwerr(null)
        if(password_confirm!=password){
            setPwerr('Mật khẩu không trùng khớp')
        }

        const option = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({   
                current_password:currentPassword ,           
                password: password,
                password_confirm:password_confirm

            })
        }

        const url = 'http://192.168.31.155:3000/api/changepass/'+itemId


        fetch(url, option)
            .then((res) => res.json())
            .then((res) => {
                if (res.status) {
                    
                    navigation.replace('Login')
                } else {
                    setErrMsg('Error: ')
                }
            }
            )
            .catch((err) => console.log("loi:" + err))

    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#60bff1' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Change Password</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <Text style={styles.text_footer}>Mật khẩu hiện tại</Text>
                    <View style={styles.action}>
                        <Icon
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry={secure}
                        />
                       <TouchableOpacity
                        onPress={showPass}
                        >
                            <Icon name={eye?'eye-slash':'eye'} size={20} color="#102751" 
                         />
                        </TouchableOpacity>
                    </View>
                    {
                errMsg && <Animatable.View 
                animation="fadeInLeft" duration={500}>
                <Text style={{margin:10,color: 'red', fontSize: 18,fontStyle:'italic'}}>{errMsg}Mật khẩu không đúng</Text>
                </Animatable.View>
            }
                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Mật khẩu mới</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your New Password"
                            secureTextEntry={secure}
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                        onPress={showPass}
                        >
                            <Icon name={eye?'eye-slash':'eye'} size={20} color="#102751" 
                         />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text_footer, {
                        marginTop: 35
                    }]}>Xác nhậng mật khẩu</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your New Password"
                            secureTextEntry={secure}
                            style={styles.textInput}
                            autoCapitalize="none"
                            value={password_confirm}
                            onChangeText={setPassword_confirm}
                        />
                        <TouchableOpacity
                        onPress={showPass}
                        >
                            <Icon name={eye?'eye-slash':'eye'} size={20} color="#102751" 
                         />
                        </TouchableOpacity>

                       
                    </View>
                    {
                pwerr && <Animatable.View 
                animation="fadeInLeft" duration={500}>
                <Text style={{margin:10,color: 'red', fontSize: 18,fontStyle:'italic'}}>{pwerr}</Text>
                </Animatable.View>
            }
                    {/* <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View> */}
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={onChangePass}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#60bff1']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Change Password</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#60bff1',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    )

}
const styles = StyleSheet.create({
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
        flex: Platform.OS === 'ios' ? 3 : 5,
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
})
export default SignUp