import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
    },

    headerContainer: {
        backgroundColor: 'white',
        padding: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        marginBottom: -17,
    },

    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 25,
        color: '#000',
        marginRight: 0,
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

    textContCronometro: {
        fontSize: 18,
        color: '#000',
    },

    contaCronometro: {
        marginTop: 20,
        height: 30,
        marginTop: 5
    },

    textButtCronometro: {
        fontSize: 18,
        color: '#fff',
    },

    buttonCronometro: {
        borderRadius: 10,
        borderColor: '#e8e8e8',
        width: "30%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001374',
        marginBottom: 2.5,
        marginTop: 2.5,
    },

    returnButtom: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },

    buttonfilter: {
        borderRadius: 10,
        borderColor: '#e8e8e8',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001374',
        width: 300

    },
    areaCronometro: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: "100%",
        backgroundColor: "white",
        padding: 15,
        paddingBottom: 5,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },

    areaDado: {
        marginTop: 20,
        width: "100%",
        backgroundColor: '#f1f1f1',
        flex: 1
    },

    areaButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'

    },
    filterButton: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textFiltro: {
        fontSize: 20,
        color: 'white',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,

    },

    bottomRealTime: {
        flexDirection: 'row',
        //flexWrap: 'wrap',
        justifyContent: 'center',
        //backgroundColor: '#333'
    },

    flatlist: {
        padding: 5,
    },

    lasttouchable: {
        marginBottom: 35,
    },

    image: {
        height: 25,
        width: 25,
    }

})

export default styles