import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#000",
    },

    headerContainer: {
        backgroundColor: '#131312',
        borderBottomWidth: 0.5,
        borderColor: '#39393c',
        padding: 15,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },

    backIconContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },

    backIcon: {
        width: 25,
        height: 25,
        justifyContent: 'center',
    },

    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 25,
        color: '#FFFF',
        marginRight: 20,
    },

    ipTitle: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15,
        color: '#8c8c91',
        fontSize: 20,
    },

    ipTitle0: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: -5,
        color: 'lightgrey',
        fontSize: 20,
        textAlign: 'auto',
    },

    connectContainer: {
        height: 60,
        backgroundColor: '#1c1c1e',
        borderWidth: 1,
        borderTopColor: '#39393c',
        borderBottomColor: '#39393c',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 2,
    },

    networkInfo: {
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 15,
        color: '#0b7df0',
        fontSize: 20,
    },

    netInfoContainer: {
        backgroundColor: '#1c1c1e',
        borderWidth: 1,
        borderTopColor: '#39393c',
        borderBottomColor: '#39393c',
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },

    choosenIpContainer: {
        backgroundColor: '#000',
        borderWidth: 1,
        borderColor: '#39393c',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
        fontSize: 20,
        color: '#FFF',
        padding: 7.5,
    },

    connectButton: {
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },

    connectButtonText: {
        fontSize: 25,
        marginLeft: 20,
        marginRight: 20,
        color: '#0b7df0',
    },

    connectButtomTextFalse: {
        fontSize: 25,
        marginLeft: 20,
        marginRight: 20,
        color: '#8c8c91',
    },

    lastNetInfoPage: {
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 15,
        color: '#000',
        fontSize: 20,
    },

    postDescription: {
        color: 'lightgrey',
        fontSize: 18,
        marginLeft: 10,
    },
})

export default styles