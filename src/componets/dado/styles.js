import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        width: "45%",
        height: "90%",
        backgroundColor: "white",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#b6bec8',
        padding: 20,
        marginHorizontal: 10,
        elevation: 5,
        flex: 1,
    },

    textContainer: {
        fontSize: 16,
        color: '#333',
        marginTop: -5,
    },

    textContainer2: {
        fontSize: 10,
        color: '#636363',
        //marginTop: 0,
    },

    dataTextContainer: {
        fontSize: 20,
        textAlign: 'center',
    },

    circles: {
        width: 20,
        height: 20,
        marginBottom: -30,
        marginRight: -12,
        alignSelf: 'flex-end',
    },

    graphs: {
        width: 18,
        height: 18,
        marginBottom: -15,
        marginLeft: 0,
        //alignSelf: 'flex-start',
    },

})

export default styles
