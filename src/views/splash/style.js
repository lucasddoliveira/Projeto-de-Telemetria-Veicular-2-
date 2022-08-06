import { StyleSheet } from 'react-native'

const h = 65
const w = h * (2854 / 731)  //Logo da tela de carregamento possui 2854 × 731, razão de comprimento

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    splash: {
        width: w,
        height: h,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    animation: {
        flexDirection: 'column',
        alignItems: 'center',
        top: 85,
    }
})

export default styles