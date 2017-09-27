import React from 'react'
import {
    AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './Home';
import MynotesScreen from './Mynotes';
import AddnotesScreen from './Addnotes';
import EditnotesScreen from './Editnotes';

class NoteApp extends  React.Component{
    render(){
        const {navigation} = this.props.navigation;

        return (
            <NoteAPP navigation={ navigation }/>
        );

    }

}


const  NoteAPP = StackNavigator({

    Home: { screen: HomeScreen},
    Mynote: {screen: MynotesScreen},
    Addnote:{screen:AddnotesScreen},
    Editnote :{screen:EditnotesScreen}


});




AppRegistry.registerComponent('NoteAPP', () => NoteAPP);