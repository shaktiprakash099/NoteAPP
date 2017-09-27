import * as firebase from "firebase";
import React from 'react';
let config = {
    apiKey: "AIzaSyD2CSTz414DiVd6_Hkfct9tymA_ahx5uk4",
    authDomain: "myreactdatabase.firebaseapp.com",
    databaseURL: "https://myreactdatabase.firebaseio.com/",

};

export default class Firebaseref extends React.Component {
    static  shareinstance = null;

    static getInstance() {
        if (this.shareinstance == null) {
            this.shareinstance = new Firebaseref();
        }
        return this.shareinstance;

    }

    static firebaseApp = null;

    //firebase instance creation it should be created once for the whole app
    _createFirebase = () => {
        if (this.firebaseApp == null) {
            this.firebaseApp = firebase.initializeApp(config);
        }
        return this.firebaseApp;
    }

    constructor(props) {
        super(props);
        this.state = {
            dataArray: [],
            i:0,
            Notes:"",
            Description:"",
        }

    }
    loginAction= async (userEmail, password) => {

        console.log("user email is ", userEmail);
        console.log("user password  is ", password);

        try {
            await this._createFirebase().auth()
                .signInWithEmailAndPassword(userEmail, password);
            var newDict = {
                code : 200,
                message : "Success" ,

            }
            return(newDict);

        }  catch (error) {
            console.log(error.toString())
            var errormessage =  error.toString();
            var newDict = {
                code : 400,
                message : errormessage ,

            }
            return(newDict);
        }
    }


    logoutAction = async () =>{
          try {
          await this._createFirebase().auth().signOut();
            console.log('log out successful');
             this.state.dataArray = [];
              var newDict = {
                  code : 200,
                  message : "Success" ,

              }
              return(newDict);
             } catch (error) {
                console.log(error);

              var newDict = {
                  code : 400,
                  message : errormessage ,

              }
              return(newDict);

           }



}


    signupAction= async (userEmail, password) => {

        console.log("user email is ", userEmail);
        console.log("user password  is ", password);

        try {
            await this._createFirebase().auth()
                .createUserWithEmailAndPassword(userEmail, password);
            var newDict = {
                code : 200,
                message : "Success" ,

            }
                return(newDict);

        }  catch (error) {
              console.log(error.toString())
            var errormessage =  error.toString();
            var newDict = {
                code : 400,
                message : errormessage ,

            }
             return(newDict);
        }
    }

    _returnDataArray=()=>{
        return this.state.dataArray;
    }

    insertElement = (notetitle,content) =>{

        if(this.state.dataArray.length!=0){
            this.state.i = this.state.dataArray[this.state.dataArray.length-1].index;
            this.state.i = this.state.i+1;
        }

        this.state.Notes =notetitle;
        this.state.Description = content;
        this.state.dataArray.push({NoteTitle: this.state.Notes,Description:this.state.Description,index:this.state.i})

       this.storeinfirebasereference();
    }

    storeinfirebasereference = () =>{

        let path = "/users/"+this._createFirebase().auth().currentUser.uid;
        this._createFirebase().database().ref(path).set({
            NotesArray:this.state.dataArray
        });

    }

    deleteElement = (row)=>{
        for (var i = 0; i < this.state.dataArray.length; i++) {
            if (this.state.dataArray[i].index==row) {
                this.state.dataArray.splice(i,1);
            }
        }

        this.storeinfirebasereference();

    }

    updateElement = (row,noteTitle,noteContent)=>{

         this.state.dataArray[row].NoteTitle = noteTitle;
         this.state.dataArray[row].Description = noteContent;
         this.storeinfirebasereference();

    }

    updatedatashowarray=(homePointer)=>{
        let self = this;
        let path = "/users/"+this._createFirebase().auth().currentUser.uid;
        var starCountRef = firebase.database().ref(path);
        starCountRef.on('value', function(snapshot) {
            if(snapshot.val()!=null){
                self.state.dataArray = snapshot.val().NotesArray,
                    homePointer.updatestate();
            }else{
                self.state.dataArray = [],
                    homePointer.updatestate();
            }
        });


    }

}