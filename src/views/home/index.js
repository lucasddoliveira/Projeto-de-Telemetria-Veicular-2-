import React, { Component } from 'react'
import {
        ImageBackground,
        Image,
        Text,
        View,
        TouchableOpacity,
        ScrollView,
        StatusBar,
        LogBox
} from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'

import styles from './style'

import home from '../../assets/home/home.png'
import logotipo_ from '../../assets/logo/logo_splash.png'
import logotipo from '../../assets/logo/logo.png'
import questionMark from '../../assets/questionIcon/questionMarkIcon_1.png'

export default class Home extends Component {

        render() {
                LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application."]);
                return (

                        <View style={styles.container}>

                                <ImageBackground source={home} style={styles.home}>
                                        <StatusBar backgroundColor="#1b277a" barStyle="light-content" />

                                        <TouchableOpacity style={styles.buttons}
                                                onPress={() => this.props.navigation.navigate('realtime')}>
                                                <Text style={styles.buttonText}> Tempo Real</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.buttons}
                                                onPress={() => this.props.navigation.navigate('datas')}>
                                                <Text style={styles.buttonText}> Dados </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.buttonConection}
                                                onPress={() => this.props.navigation.navigate('netInfo')}>
                                                <Text style={styles.buttonTextCon}>  Conexão</Text>
                                        </TouchableOpacity>

                                        <View style={styles.footerContainer}>

                                                <TouchableOpacity
                                                        onPress={() => this._panel.show()}>
                                                        <Image source={questionMark} style={styles.questionMarkIcon} />
                                                </TouchableOpacity>

                                                <Image source={logotipo} style={styles.logo} />

                                        </View>
                                </ImageBackground>

                                <SlidingUpPanel ref={c => this._panel = c}>
                                        <ScrollView style={styles.postContainer}>

                                                <Text style={styles.textTitle}>
                                                        Sobre o Aplicativo
                                                </Text>
                                                <Text style={styles.textDescription1}>
                                                        Uma aplicação desenvolvida em React-Native e NodeJS para o sistema
                                                        de telemetria de um veículo do tipo Baja, permitindo o
                                                        monitoramento simultâneo dos dados sensoriados.{'\n\n'}
                                                        A partir de um endereço de IP fornecido, o aplicativo buscará uma comunicação
                                                        com uma Raspberry que captará e interpretará os dados
                                                        enviados e recebidos pelos módulos LoRa, tais como,
                                                        velocidade, RPM, temperatura do motor e etc.
                                                </Text>
                                                <Text style={styles.textTitle}>
                                                        Informações de Uso
                                                </Text>
                                                <Text style={styles.textDescription2}>
                                                        Ao iniciar, prossiga para a página "Conectar" e
                                                        se certifique de estar sob a mesma rede Wifi de sua Raspberry.{'\n\n'}

                                                        Em sequência, se a comunicação tiver sido estabelecida
                                                        de forma correta, os dados coletados serão mostrados de
                                                        forma simultânea na página de "Tempo Real".{'\n\n'}

                                                        Logo após esse processo, a inicialização dos testes pode
                                                        ser realizada. Pressione no botão "Começar" e intitule o seu teste,
                                                        para finalizar, pressione em "Limpar".{'\n\n'}

                                                        Na página de "Dados", o seu teste estará disponível para download.
                                                        Clique em seu nome e pressione o atalho de "Download".
                                                </Text>

                                                <Image source={logotipo_} style={styles.image} />
                                                <Text style={styles.textCredits}>
                                                        Desenvolvido pela equipe UFPBaja{'\n'}
                                                        Subsistema de Elétrica e Eletrônica{'\n\n'}
                                                        V1.0     2021
                                                </Text>
                                        </ScrollView>
                                </SlidingUpPanel>
                        </View>
                )
        }
}