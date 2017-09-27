
import React from 'react';
import  {

    View,
    Alert,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,


} from 'react-native';
import  Styles from './Styles';
import Firebaseclass from './Firebase'
var self;


export  default class ChatScreen extends React.Component {


    onPressLearnMore (){

        if(!self.state.noteTitle){

            Alert.alert('Please provide note title')  ;
            return
        }
        if(!self.state.noteContent){

            Alert.alert('Please provide note content')  ;
            return

        }

        console.log(self.state.noteTitle)
        console.log(self.state.noteContent)

        Firebaseclass.getInstance().insertElement(self.state.noteTitle,self.state.noteContent);
        Firebaseclass.getInstance().updatedatashowarray(this.state.homePointer);
        Alert.alert('Note Saved');
        // Singletone.getInstance()._insertelements(self.state.noteTitle,self.state.noteContent,Singletone.getInstance().loggedInuseremail)
        //
        //
        // var Array =  Singletone.getInstance()._returnDataArray();
        //
        // console.log("============",Array);
        // if (Singletone.getInstance().isInserted == true){
        //     Alert.alert('Data inserted successfuly')
        // }
    }





    static navigationOptions = ({ navigation }) => {
        return ({
            // title: `welcome ${navigation.state.params.user}`,
            titleTextColor: '#000080',


            headerStyle: {
                backgroundColor: '#C1E3BC'
            },

            headerRight: <Button
                onPress={()=>self.onPressLearnMore()}
                title="SAVE"
                color="#841584" />
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            noteTitle: '',
            noteContent: '',
            homePointer:this.props.navigation.state.params.pointer,
        };

    }

    render() {
        self=this;

        const { params } = this.props.navigation.state;
        return (

            <KeyboardAvoidingView behavior='padding'>
                <View style ={styles.container}>
                    <TextInput
                        style={Styles.input}
                        onChangeText = {(noteTitle) => this.setState({
                            noteTitle  : noteTitle,
                        })}
                        placeholder= "Enter your note title"
                        value={self.state.noteTitle}

                    />
                    <TextInput
                        style={Styles.inputforcontent}
                        onChangeText={(noteContent) => this.setState({
                            noteContent: noteContent,
                        })}
                        keyboardType = 'default'
                        autoCapitalize = 'sentences'
                        numberOfLines = {0}
                        multiline = {true}
                        placeholder= "Enter the content"
                        secureTextEntry={true}
                        value={self.state.password}
                    />
                </View>
            </KeyboardAvoidingView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: "#8a9090",
    },
    button: {

        borderRadius: 5,
        width:150,
        alignItems: 'center',
        backgroundColor: '#2196F3'
    },

    textViewStyle :{
        height: 40,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor:'black',
        borderRadius: 5,
        borderWidth: 1,
        top : 10,
        backgroundColor : 'white'

    },
    contentviewstyle:{
        top : 40,
        height: 400,
        height: 400,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderColor:'black',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor : 'white',
        // textAlign: 'center',
    },
    buttonText: {
        padding: 20,
        color: 'white'
    },

})