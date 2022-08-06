import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    contanier: {
        justifyContent: 'center',
        backgroundColor: '#001374',
        marginTop: 5,
        alignItems: 'center',
        padding: 20,
        borderRadius: 15,
        borderColor: '#001374',
        width: "100%",
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },

    container2: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 2,
        borderColor: '#d8d8d8',
        width: '100%',
    },

    title: {
        fontSize: 32,
        color: '#fff',
    },

    avatar: {
        backgroundColor: "#fff",
        width: 40,
        height: 40,
    },

    areaButtons: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    butttonsFiltro: {
        borderRadius: 10,
        borderColor: '#e8e8e8',
        paddingHorizontal: 10,
        margin: 5,

    },
    textButtons: {
        fontSize: 18,
        color: '#001374',
        fontWeight: 'bold',

    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
})

export default styles