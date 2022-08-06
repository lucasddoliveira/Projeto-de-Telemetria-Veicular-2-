import React,{Component}  from 'react'
import {View, Modal, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'

const initialState = {
    testName : '',
}

export default class Test extends Component {
    state = {
        ...initialState
    }

    render(){
        const validform = (this.state.testName && this.state.testName.trim().length >= 3)

        return(
            <Modal transparent = {true}
            visible = {this.props.isVisible}
            animationType= 'fade'>
                
                <TouchableOpacity style = {styles.background}
                 onPress = {this.props.onCancel}/>
                 
                <View style = {styles.container}>
                    <Text style = {styles.textName}>Insira um nome para o teste</Text>
                    <View style = {styles.areaName}>
                        <TextInput style = {styles.textInput}
                        placeholder = ' Nome do teste '
                        placeholderTextColor = '#b8b8b8'
                        autoCorrect={false}
                        maxLength={17}
                        value = {this.state.testName}
                        caretHidden={true}
                        onChangeText = {testName => this.setState({testName: testName})}/>
                        
                        <TouchableOpacity style = {styles.button}
                        disabled ={!validform} 
                        onPress = { () => {
                            this.props.onStar(this.state.testName), 
                            this.props.onCancel(), 
                            this.state.testName = ''}}>
                            <Text style= {[styles.textbutton, validform ? {} : {color:'#b8b8b8'}]}> Iniciar </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <TouchableOpacity style = {styles.background}
                onPress = {this.props.onCancel}/>
            </Modal>
        )
    }
}

const styles = StyleSheet.create( {
    container : {
        height: 150,
        backgroundColor: '#001374',
        padding: 10,
        borderTopWidth: 2.5,
        borderBottomWidth:2.5,
        borderColor: "#FFFF"
    },

    areaName : {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    textName : {
        fontSize: 24,
        color: 'lightgrey',
        marginTop: 15,
        textAlign: 'center',
    },

    textInput: {
        width: 200,
        fontSize:20 ,
        height: 40,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#e8e8e8',
        textAlign: 'center',
    }, 

    textbutton : {
        fontSize: 25,
        color: '#FFF',
    },

    button : {
        padding: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    background : {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    }
})