import React, { Component } from 'react'
import { TouchableOpacity, Text, View, FlatList, Alert, Image, LogBox, ScrollView, AppState } from 'react-native'
import AsyncStrorage from '@react-native-async-storage/async-storage'
import AwesomeAlert from 'react-native-awesome-alerts'

import api from '../../services/api'

import styles from './styles'
import backIcon from '../../assets/backIcon/backIconBlack.png'

import Dado from '../../componets/dado/Dado'
import Filter from '../../componets/filter/Filter'
import Teste from '../../componets/teste/Teste'
import Graph from '../../componets/graphs/graph'

import graphIcon from '../../assets/graphIcon/iconGraph.png'

export default class realTime extends Component {

    state = {
        dados: [
            { id: 0, name: "Velocidade", valor: 0, showDetails: false },
            { id: 1, name: "RPM", valor: 0, showDetails: false },
            { id: 2, name: "Gasolina", valor: 0, showDetails: false },
            { id: 3, name: "Pressao_de_Freio", valor: 0, showDetails: false },
            { id: 4, name: "Temperatura_da_CVT", valor: 0, showDetails: false },
            { id: 5, name: "Temperatura_do_Motor", valor: 0, showDetails: false },
            { id: 6, name: "Acelerometro", valor: 0, showDetails: false },
        ],
        teste: {
            name: null,
            begin: null,
            pauser: null,
            finish: null,
            finishMoment: null,
        },

        showFilter: false,
        showTeste: false,

        seconds: 0,
        minutes: 0,
        hours: 0,

        secondsStr: '00',
        minutesStr: '00',
        hoursStr: '00',

        timer: null,
        timerText: 'Começar',

        showAlert: false,
        showAlertWrong: false,
        showAlertWrongFlag: true,
        showAlertName: false,
        showAlertLeave: false,

        volta: 1,

        graphName: false,
        appState: AppState.currentState
    }

    componentDidMount = async () => {
        let mounted = true
        AppState.addEventListener('change', this._handleAppStateChange);

        setInterval(async () => {
            try {
                await api.get('/realtime').then(() => {
                    if (mounted) {
                        this.state.showAlertWrongFlag = false
                    }
                }).catch(err => {
                    Alert.alert('Servidor fora do ar: ' + err)
                    return
                })
            } catch (error) {
                return
            }
        }, 1000)

        return () => mounted = false;
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);

        if (this.state.timerText != 'Começar') {
            this.clearTimer()
        }
    }

    _handleAppStateChange = async (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            await api.get('/clear')
        }
        this.setState({ appState: nextAppState });
    }

    startTimer = async (testName) => {
        try {
            if (this.state.seconds === 0 && this.state.minutes === 0 && this.state.hours === 0) {

                if (this.state.showAlertWrongFlag) {
                    setTimeout(() => {
                        this.setState({
                            showAlertWrong: true
                        })
                    }, 1000)
                }

                await api.post('/storage', { state: 'true' })

                await api.get('/realtime').then((response) => {

                    if (response.data) {
                        this.state.teste.name = testName
                        this.state.teste.begin = response.data.data
                        this.state.showAlertWrong = false
                    }
                    else {
                        console.log('....')
                    }
                }).catch(err => {
                    console.log(err)
                    return
                })

            }
            if (this.state.timer == null) {
                await api.post('/storage', { state: 'true' })

                this.setState({ timerText: 'Pausar' })
                this.state.timer = setInterval(() => {

                    this.setState({ seconds: this.state.seconds + 1 })

                    if (this.state.seconds == 60) {
                        this.setState({ minutes: this.state.minutes + 1 })
                        this.setState({ seconds: 0 })
                    }
                    if (this.state.minutes == 60) {
                        this.setState({ hours: this.state.hours + 1 })
                        this.setState({ minutes: 0 })
                    }

                    function n(n) {
                        return n > 9 ? "" + n : "0" + n;
                    }

                    this.state.secondsStr = n(this.state.seconds)
                    this.state.minutesStr = n(this.state.minutes)
                    this.state.hoursStr = n(this.state.hours)

                }, 1000)
            }
            else {
                clearInterval(this.state.timer)
                this.setState({ timer: null })
                this.setState({ timerText: 'Continuar' })

                await api.post('/storage', { state: 'false' })
            }
        } catch (error) {
            console.log('aloo')
            return
        }

    }

    clearTimer = async () => {
        //console.log('a')
        await api.post('/database', { name: this.state.teste.name + '!' + `\nTempo Total do Teste ${this.state.teste.name} - ${this.state.hours}:${this.state.minutes}:${this.state.seconds}` })
        //console.log('b')
        clearInterval(this.state.timer)
        this.setState({ timer: null })
        this.setState({ timerText: 'Começar' })
        this.state.seconds = 0
        this.state.minutes = 0
        this.state.hours = 0
        this.state.secondsStr = '00'
        this.state.minutesStr = '00'
        this.state.hoursStr = '00'
        this.state.volta = 1
        this.state.teste.finishMoment = new Date()


        await api.get('/realtime').then((response) => {

            this.state.teste.finish = response.data.data

            AsyncStrorage.setItem(JSON.stringify(this.state.teste.name), JSON.stringify(this.state.teste))
                .then(() =>
                    //console.log('Deu certo'),
                    setTimeout(() => {
                        this.setState({
                            showAlert: true
                        })
                    }, 500))
                .catch(err => console.log(err))

        }).catch(err => {
            Alert.alert('Servidor fora do ar: ' + err)
            console.log('errado em dado')
            return
        })
    }

    markTimer = async () => {

        if (this.state.timerText == 'Pausar' || this.state.timerText == 'Continuar') {
            var cronometroMarcar = `Volta ${this.state.volta} - ${this.state.hours}:${this.state.minutes}:${this.state.seconds}`
            console.log(cronometroMarcar)
            this.setState({
                volta: this.state.volta + 1
            })
            await api.post('/markTimer', { timer: cronometroMarcar })
        }
    }

    filterSelection = (selectedItems) => {
        let dados = [
            { id: 0, name: "Velocidade", valor: 0, showDetails: false },
            { id: 1, name: "RPM", valor: 0, showDetails: false },
            { id: 2, name: "Gasolina", valor: 0, showDetails: false },
            { id: 3, name: "Pressao_de_Freio", valor: 0, showDetails: false },
            { id: 4, name: "Temperatura_da_CVT", valor: 0, showDetails: false },
            { id: 5, name: "Temperatura_do_Motor", valor: 0, showDetails: false },
            { id: 6, name: "Acelerometro", valor: 0, showDetails: false },
        ]

        let filter = []

        dados.forEach(element => {
            if (selectedItems.indexOf(element.name) > -1) {
                filter.push(element)
            }
        })

        this.setState({
            dados: filter
        })

    }

    render() {

        LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
        LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application."]);

        return (
            <View style={styles.contanier}>
                <Filter isVisible={this.state.showFilter}
                    updateSelection={(selectedItems) => { this.filterSelection(selectedItems) }}
                    onCancel={() => this.setState({ showFilter: false })}
                    onFilter />

                <Teste isVisible={this.state.showTeste}
                    onCancel={() => this.setState({ showTeste: false })}
                    onStar={async (testName) => {
                        if (await AsyncStrorage.getItem(JSON.stringify(testName))) {
                            setTimeout(() => {
                                this.setState({
                                    showAlertName: true
                                })
                            }, 500)
                        } else {
                            this.startTimer(testName)
                        }
                    }} />

                <View style={styles.headerContainer}>
                    <TouchableOpacity styles={styles.backIconContainer}
                        onPress={() => {
                            if (this.state.timerText == 'Começar' && this.state.graphName == false) {
                                this.props.navigation.navigate('home')
                            }
                            if (this.state.timerText != 'Começar' && this.state.graphName == false) {
                                this.setState({
                                    showAlertLeave: true
                                })
                            }
                            if (this.state.graphName) {
                                this.setState({
                                    graphName: false,
                                })
                            }
                        }}>
                        <Image source={backIcon} style={styles.backIcon} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        {'Tempo Real'}
                    </Text>

                    {this.state.graphName == false ? (
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    graphName: true
                                })
                            }}>
                            <Image source={graphIcon} style={styles.image}></Image>
                        </TouchableOpacity>
                    ) : (<TouchableOpacity
                        onPress={() => { }}
                        style={styles.image}>
                    </TouchableOpacity>)}


                </View>

                <View style={styles.areaCronometro}>
                    <View style={styles.areaButtons}>

                        <TouchableOpacity style={styles.buttonCronometro}
                            onPress={() => {
                                if (this.state.seconds) {
                                    this.startTimer()

                                } else {
                                    this.setState({
                                        showTeste: true
                                    })
                                }
                            }}>
                            <Text style={styles.textButtCronometro}>
                                {this.state.timerText}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonCronometro}
                            onPress={this.markTimer}>
                            <Text style={styles.textButtCronometro}>Marcar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonCronometro}
                            onPress={this.clearTimer}>
                            <Text style={styles.textButtCronometro}>Limpar</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.contaCronometro}>
                        <Text style={styles.textContCronometro}> {`Volta ${(this.state.volta)}  -  ${this.state.hoursStr}:${this.state.minutesStr}:${this.state.secondsStr}`}</Text>
                    </View>
                </View>

                {this.state.graphName == false ? (
                    <View style={styles.areaDado}>
                        <FlatList
                            style={styles.flatlist}
                            data={this.state.dados}
                            numColumns={2}
                            renderItem={({ item }) =>
                                <Dado {...item}
                                />
                            }
                            keyExtractor={item => item.id.toString()} />

                        <View style={styles.bottomRealTime}>
                            <TouchableOpacity style={styles.lasttouchable}
                                onPress={() => this.setState({ showFilter: true })}>
                                <View style={styles.buttonfilter}>
                                    <Text style={styles.textFiltro}>
                                        Filtro de Dados
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <ScrollView style={{ width: '100%' }}>

                        <Graph importSelection={this.state.graphName} />

                    </ScrollView>
                )}

                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title='Teste Finalizado'
                    message="Prossiga para a página de Dados"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    titleStyle={{
                        color: '#000',
                        fontSize: 22,
                        textAlign: 'center',
                    }}
                    messageStyle={{
                        fontSize: 16,
                        color: '#6d777b',
                        textAlign: 'center'
                    }}
                    contentContainerStyle={{
                        backgroundColor: '#FFFF',
                        borderWidth: 1.5,
                        borderColor: '#b6bec8'
                    }}
                    confirmButtonStyle={{ backgroundColor: 'transparent' }}
                    confirmButtonTextStyle={{ color: '#0b7df0', fontSize: 22 }}
                    onCancelPressed={() => {
                        this.setState({
                            showAlert: false
                        })
                    }}
                    onConfirmPressed={() => {
                        this.setState({
                            showAlert: false
                        })
                    }} />

                <AwesomeAlert
                    show={this.state.showAlertName}
                    showProgress={false}
                    title='Nome Inválido'
                    message="Esse título de teste já existe, por favor insira outro"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    titleStyle={{
                        color: '#000',
                        fontSize: 22,
                        textAlign: 'center',
                    }}
                    messageStyle={{
                        fontSize: 16,
                        color: '#6d777b',
                        textAlign: 'center'
                    }}
                    contentContainerStyle={{
                        backgroundColor: '#FFFF',
                        borderWidth: 1.5,
                        borderColor: '#b6bec8'
                    }}
                    confirmButtonStyle={{ backgroundColor: 'transparent' }}
                    confirmButtonTextStyle={{ color: '#0b7df0', fontSize: 22 }}
                    onCancelPressed={() => {
                        this.setState({
                            showAlertName: false
                        })
                    }}
                    onConfirmPressed={() => {
                        this.setState({
                            showAlertName: false
                        })

                    }} />

                <AwesomeAlert
                    show={this.state.showAlertWrong}
                    showProgress={false}
                    title='Erro de Comunicação'
                    message="Verifique se seu aparelho está conectado a mesma rede Wifi da Raspberry Pi."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    titleStyle={{
                        color: '#000',
                        fontSize: 22,
                        textAlign: 'center',
                    }}
                    messageStyle={{
                        fontSize: 16,
                        color: '#6d777b',
                        textAlign: 'center',
                    }}
                    contentContainerStyle={{
                        backgroundColor: '#FFFF',
                        borderWidth: 1.5,
                        borderColor: '#b6bec8',
                    }}
                    confirmButtonStyle={{ backgroundColor: 'transparent' }}
                    confirmButtonTextStyle={{ color: '#0b7df0', fontSize: 22 }}
                    onCancelPressed={() => {
                        this.setState({
                            showAlertWrong: false
                        })
                    }}
                    onConfirmPressed={() => {
                        this.setState({
                            showAlertWrong: false
                        })
                    }} />

                <AwesomeAlert
                    show={this.state.showAlertLeave}
                    showProgress={false}
                    title='Atenção!'
                    message="Ao sair da página de Tempo Real, o teste iniciado será automaticamente finalizado. Deseja prosseguir?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    confirmText="Sair"
                    cancelText="Cancelar"
                    titleStyle={{
                        color: '#000',
                        fontSize: 22,
                        textAlign: 'center',
                    }}
                    messageStyle={{
                        fontSize: 16,
                        color: '#6d777b',
                        textAlign: 'center',
                    }}
                    contentContainerStyle={{
                        backgroundColor: '#FFFF',
                        borderWidth: 1.5,
                        borderColor: '#b6bec8',
                    }}
                    confirmButtonStyle={{ backgroundColor: 'transparent' }}
                    confirmButtonTextStyle={{ color: '#0b7df0', fontSize: 22 }}
                    cancelButtonStyle={{ backgroundColor: 'transparent' }}
                    cancelButtonTextStyle={{ color: '#0b7df0', fontSize: 22 }}
                    onCancelPressed={() => {
                        this.setState({
                            showAlertLeave: false
                        })
                    }}
                    onConfirmPressed={() => {
                        this.setState({
                            showAlertLeave: false
                        })
                        this.clearTimer()
                        this.props.navigation.navigate('home')
                    }}
                    onDismiss={() => {
                        this.setState({
                            showAlertLeave: false
                        })
                    }} />
            </View>
        )
    }
}