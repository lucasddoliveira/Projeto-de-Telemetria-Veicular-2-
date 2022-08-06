import { StyleSheet, Dimensions } from 'react-native'
const h = Dimensions.get('window').height
const w = Dimensions.get('window').width

const styles = StyleSheet.create({

    home: {
        width: w,
        height: h,
        resizeMode: 'stretch',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    buttonTextCon: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,
    },

    buttonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,
    },

    buttonConection: {
        marginTop: 15,
        backgroundColor: "#000",
        borderRadius: 5,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#1b277a',
    },

    buttons: {
        marginTop: 15,
        backgroundColor: "#fff",
        borderRadius: 5,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#1b277a',
    },

    logo: {
        alignSelf: 'flex-end',
        marginRight: 25,
        marginBottom: w * 0.05,
        resizeMode: 'contain',
    },

    questionMarkIcon: {
        marginLeft: 15,
        marginTop: w * 0.05,
        width: 30,
        height: 30,
    },

    footerContainer: {
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    postContainer: {
        width: '80%',
        backgroundColor: '#333',
        borderRadius: 10,
        borderColor: '#333',
        marginLeft: '10%',
        marginBottom: '10%',
        flex: 0,
        elevation: 10,
    },

    postApp: {
        width: '80%',
        marginBottom: 20,
        padding: 1,
        flex: 0,
        borderColor: '#000',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#333',
        elevation: 10,

    },

    textTitle: {
        fontSize: 15,
        marginTop: 15,
        marginLeft: 15,
        color: 'white'
    },

    textCredits: {
        fontSize: 13,
        marginTop: 15,
        color: 'black',
        textAlign: 'center',
        marginBottom: 15,
    },

    textDescription1: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        textAlign: 'left',
        color: 'grey'

    },
    textDescription2: {
        fontSize: 14,
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        textAlign: 'left',
        color: 'grey'

    },

    image: {
        height: 40,
        width: 40 * (2854 / 731),
        marginLeft: (w * 0.8 / 2) - (20 * (2854 / 731)),
        marginTop: 15,
    },

    backIcon: {
        width: 25,
        height: 25,
    },

    backIconButtom: {
        marginBottom: 35,
        marginRight: w / 1.15
    }
})

export default styles
