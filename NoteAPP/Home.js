import React from 'react';
import  {

    Dimensions,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import firebaseclass from './Firebase'
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
var self;


export  default class HomeScreen extends React.Component {

    static navigationOptions = {
        header: null,
        // title: 'Welcome',
    };


    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    loginButtonAction (){
        console.log(this.state.email)
        console.log(this.state.password)
        var emailtext = this.state.email
        var passwordtext = this.state.password


        if (!emailtext){
            Alert.alert('Please provide your email')
            return

        }


        if (!passwordtext){
            Alert.alert('Please provide your password')
            return
        }


        if (!this.validateEmail(this.state.email)) {

            Alert.alert('Please provide a valid email ')
        }
        else {
            firebaseclass.getInstance().loginAction(emailtext,passwordtext).then(function (data) {
                console.log( "data is ",data);

                if (data.code == 400){

                    Alert.alert(data.message);

                }
                else if (data.code == 200){

                    // Alert.alert("Successfuly Signed up ");
                    console.log('-login - Successful -',self);
                    self.props.navigation.navigate('Mynote')

                }

            });

        }

    }
    signupButtonAction () {

        console.log(this.state.email)
        console.log(this.state.password)
        var emailtext = this.state.email
        var passwordtext = this.state.password


        if (!emailtext){
            Alert.alert('Please provide your email')
            return

        }


        if (!passwordtext){
            Alert.alert('Please provide your password')
            return
        }


        if (!this.validateEmail(this.state.email)) {

            Alert.alert('Please provide a valid email ')
        }


             else {

       firebaseclass.getInstance().signupAction(emailtext,passwordtext).then(function (data) {
          console.log( "data is ",data);

          if (data.code == 400){

              Alert.alert(data.message);

          }
      else if (data.code == 200){

              // Alert.alert("Successfuly Signed up ");
              console.log('-==-=-=-=-=-',self);
              self.props.navigation.navigate('Mynote')

          }

         });


        }


    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

    }


    render() {
       self=this;
        return (
            <View style={ styles.container }>
                <ImageBackground source={require('./Images/bg.jpg')} style={styles.backgroundImage}   >
                    {/*<ImageBackground source={require('./Images/bg.jpg')} style={styles.backgroundImage}  blurRadius={5} >*/}
                    <KeyboardAvoidingView behavior='padding'>
                        <View style = {styles.mainviewstyle}>
                            <TextInput
                                style={styles.textViewStyle}
                                onChangeText = {(email) => this.setState({
                                    email: email,
                                })}
                                placeholder= "Type your email"
                                value={this.state.email}

                            />
                            <TextInput
                                style={styles.textViewStyle}
                                onChangeText={(password) => this.setState({
                                    password: password,
                                })}
                                placeholder= "Type your password"
                                secureTextEntry={true}
                                value={this.state.password}
                            />

                            <View style = {styles.buttonViewStyle}>

                                <TouchableOpacity onPress={this.loginButtonAction.bind(this)}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Log In</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.signupButtonAction.bind(this)}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>Sign up</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>




            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainviewstyle:{
        // position: 'absolute',
        width: Dimensions.get('window').width,
    },
    button: {
        borderRadius: 5,
        width:150,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },
    buttonViewStyle :{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    textViewStyle :{
        height: 40,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor:'black',
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'center',
    },
    buttonText: {
        padding: 20,
        color: 'white'
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
})