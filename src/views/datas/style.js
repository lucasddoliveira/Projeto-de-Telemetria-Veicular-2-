import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1f1",
    },

    headerContainer: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#b6bec8',
        padding: 15,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
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
        color: '#000',
        marginRight: 20,
    },

    testListTitle: {
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 15,
        color: '#6d777b',
        fontSize: 20,
    },

    itens: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },

    textItens: {
        fontSize: 18,
        marginVertical: 10,
        color: '#333',
        marginLeft: 20,
    },

    downloadContainer: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderTopColor: '#b6bec8',
        borderBottomColor: '#b6bec8',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 2,
    },

    choosenTestContainer: {
        marginTop: 5,
        marginBottom: 5,
        //height: 40,
        width: 170,
        backgroundColor: '#FFF',
        borderWidth: 0.8,
        borderColor: '#b6bec8',
        justifyContent: 'center',
        borderRadius: 10,
    },

    choosenTestText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        marginTop: 7,
        marginBottom: 7,

    },

    choosenTestTextFalse: {
        fontSize: 20,
        marginTop: 7,
        marginBottom: 7,
        color: '#b8b8b8',
        textAlign: 'center',
    },

    downloadButton: {
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignContent: 'center',
    },

    downloadButtonText: {
        fontSize: 25,
        marginLeft: 20,
        marginRight: 20,
        color: '#0b7df0',
    },

    flatListContainer: {
        height: '55%',
        flexGrow: 0,
        elevation: 5,
    },

    downloadButtonTextFalse: {
        fontSize: 25,
        marginLeft: 20,
        marginRight: 20,
        color: '#6d777b',
    },

    testDate: {
        fontSize: 16,
        color: '#8c8c91',
        marginRight: 20,
    },
    bottomRealTime: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1'
    },
    lasttouchable: {
        marginBottom: 10,
    },
    buttonfilter: {
        borderRadius: 10,
        borderColor: '#e8e8e8',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001374',
        width: 300

    },
    textFiltro: {
        fontSize: 20,
        color: 'white',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,

    },
})

export default styles