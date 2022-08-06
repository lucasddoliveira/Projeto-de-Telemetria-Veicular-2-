import React, { useState } from 'react'
import {
    Text,
    View,
    Image,
} from 'react-native'

import api from '../../services/api'

import styles from './styles'

import greenCircle from '../../assets/coloredCircles/icons8-green-circle-48.png'
import yellowCircle from '../../assets/coloredCircles/icons8-yellow-circle-48.png'
import redCircle from '../../assets/coloredCircles/icons8-red-circle-48.png'
import whiteCircle from '../../assets/coloredCircles/icons8-white-circle-48.png'

export default props => {
    const nameDados = props.name
    const [dados, SetDado] = useState([])
    const [flag, SetFlag] = useState(false)

    let showName = ''
    let showScale = ''
    let sinalizer = whiteCircle

    switch (nameDados) {
        case 'Velocidade':
            showName = 'Velocidade'
            showScale = '(em Km/h)'

            if (dados < 60) {
                if (dados < 40) {
                    sinalizer = greenCircle
                    break
                }
                sinalizer = yellowCircle
            } else {
                sinalizer = redCircle
            }

            break
        case 'RPM':
            showName = 'RPM'
            showScale = '(em rot/min)'

            if (dados < 3500) {
                if (dados < 3000) {
                    sinalizer = greenCircle
                    break
                }
                sinalizer = yellowCircle
            } else {
                sinalizer = redCircle
            }

            break
        case 'Gasolina':
            showName = 'Gasolina'
            showScale = '(em litros)'

            if (dados > 15) {
                if (dados > 30) {
                    sinalizer = greenCircle
                    break
                }
                sinalizer = yellowCircle
            } else {
                sinalizer = redCircle
            }

            break
        case 'Pressao_de_Freio':
            showName = 'Pressão de Freio'
            showScale = '(em MPa)'

            if (dados < 80) {
                if (dados < 70) {
                    sinalizer = greenCircle
                    break
                }
                sinalizer = yellowCircle
            } else {
                sinalizer = redCircle
            }

            break
        case 'Temperatura_da_CVT':
            showName = 'Temp. da CVT'
            showScale = '(em °C)'

            if (dados < 120) {
                if (dados < 100) {
                    sinalizer = greenCircle
                    break
                }
                sinalizer = yellowCircle
            } else {
                sinalizer = redCircle
            }

            break
        case 'Temperatura_do_Motor':
            showName = 'Temp. do Motor'
            showScale = '(em °C)'

            if (dados < 40) {
                if (dados < 20) {
                    sinalizer = greenCircle
                    break
                }
                sinalizer = yellowCircle
            } else {
                sinalizer = redCircle
            }

            break
        case 'Acelerometro':
            showName = 'Acelerômetro'
            showScale = '(em m/s^2)'
            break
    }

    React.useEffect(() => {
        let mounted = true

        let interval = setInterval(async () => {
            //console.log('a')
            try {
                await api.get('/realtime').then((response) => {
                    if (mounted) {
                        SetFlag(true)
                        SetDado(response.data[nameDados])
                    }
                }).catch(err => {
                    Alert.alert('Servidor fora do ar: ' + err)
                    return
                })
            } catch (error) {
                return
            }
        }, 500)

        return function cleanup() {
            mounted = false
            clearInterval(interval)
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.textContainer}>
                {showName}
            </Text>

            <Text style={styles.textContainer2}>
                {showScale}
            </Text>

            <Text style={styles.dataTextContainer}>
                {dados}
            </Text>

            {flag == true ?
                (<Image source={sinalizer} style={styles.circles} />) :
                (<View />)}
        </View>
    )
}

