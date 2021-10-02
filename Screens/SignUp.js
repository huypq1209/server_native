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

    const { navigation } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setPassword_confirm] = useState('')
    const [phone, setPhone] = useState('')
    const [fullname, setFullname] = useState('')
    const [err, setErr] = useState(null)
    const [errMsg, setErrMsg] = useState(null)
    const [isSelected, setSelection] = useState(false);
    const [name,setName]=useState(null)
    const [secure,setSecure]=useState(true)
    const[eye,setEye]=useState(false)
    const[status,setStatus]=useState(null)
    const[key,setKey]=useState('')
    
  
    const showPass=()=>{
        setSecure(!secure)
        setEye(!eye)
    }
    const onSingup = () => {
        const option = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username:username,
                password:password,
                password_confirm:password_confirm,
                phone:phone,
                fullname:fullname
                
            })
        }

        const url = 'http://192.168.31.155:3000/api/signup'

       
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
          <StatusBar backgroundColor='#60bff1' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <Icon
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={username}
                    onChangeText={setUsername}
                />
                
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={true }
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                   
                >
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={true }
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={password_confirm}
                    onChangeText={setPassword_confirm}
                />
                <TouchableOpacity
                    
                >
                    
                </TouchableOpacity>
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Phone Number</Text>
            <View style={styles.action}>
                <Icon
                    name="phone"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Phone Number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={phone}
                    keyboardType="number-pad"
                    onChangeText={setPhone}
                />
                
            </View>
            <Text style={[styles.text_footer,{marginTop:35}]}>Fullname</Text>
            <View style={styles.action}>
                <Icon
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Fullname"
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={fullname}
                    onChangeText={setFullname}
                />
                
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={onSingup}
                >
                <LinearGradient
                    colors={['#08d4c4', '#60bff1']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.replace('Login')}
                    style={[styles.signIn, {
                        borderColor: '#60bff1',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
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