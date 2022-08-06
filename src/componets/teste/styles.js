import { StyleSheet } from "react-native";

const styles = StyleSheet.create( {
    container : {
        height: 150,
        backgroundColor: '#001374',
        padding: 10,
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

export default styles