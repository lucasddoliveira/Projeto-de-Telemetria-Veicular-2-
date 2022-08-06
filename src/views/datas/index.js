import React, { Component } from "react"
import {
    PermissionsAndroid,
    SafeAreaView,
    StatusBar,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    LogBox
} from "react-native"

import api from '../../services/api'

import AsyncStrorage from '@react-native-async-storage/async-storage'
import RNFetchBlob from 'rn-fetch-blob'
import AwesomeAlert from 'react-native-awesome-alerts'
import { format } from 'date-fns'

import styles from './style'
import backIcon from '../../assets/backIcon/backIconBlack.png'

export default class Datas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            times: [],
            ipSelected: '',

            showAlert: false,
            showAlertWrong: false,
            showEraseData: false,
            selectedName: null,
            flag: true,
        }
    }

    componentDidMount = async () => {
        this.findStorage()

        await AsyncStrorage.getItem('@save_ip').then((result) => {
            if (result) {
                this.setState({
                    ipSelected: result
                })
            }
        })
        //console.log(this.state.ipSelected + 'a')

        await api.get('/realtime').then(() => {
            this.setState({
                flag: false
            })
        })
    }

    componentWillUnmount = async () => {
        return
    }

    findStorage = async () => {
        const keys = await AsyncStrorage.getAllKeys()
        let array = []

        keys.forEach(async (element) => {
            await AsyncStrorage.getItem(element).then(val => {

                if (val != null && val.includes('"')) {
                    val = JSON.parse(val)
                    array.push(val)
                }
            })
            this.setState({
                times: array
            })

        })
    }

    download = async (testname) => {
        try {

            if (this.state.flag == true) {
                this.setState({
                    showAlertWrong: true
                })
            }

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

            );
            console.log(granted)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Permission granted");


                const { config, fs } = RNFetchBlob;
                const date = new Date();

                const { DownloadDir } = fs.dirs; // You can check the available directories in the wiki.
                const options = {
                    fileCache: true,
                    addAndroidDownloads: {
                        useDownloadManager: true, // true will use native manager and be shown on notification bar.
                        notification: true,
                        path: `${DownloadDir}/Teste_${testname}_${Math.floor(date.getTime() + date.getSeconds() / 2)}.txt`,
                        description: 'Downloading.',
                    },
                };

                await config(options).fetch('GET', `http://172.20.10.5:3000/download/${testname}`).then(() => {
                    setTimeout(() => {
                        this.setState({
                            showAlert: true,
                            flag: false,
                        })

                    }, 500)
                });

            } else {
                this.setState({
                    showAlertWrong: true
                })
            }
        } catch {
            this.setState({
                showAlertWrong: true
            })
        }
    }

    render() {

        LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
        LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application."]);
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#1b277a" barStyle="light-content" />

                <View style={styles.headerContainer}>
                    <TouchableOpacity styles={styles.backIconContainer}
                        onPress={() => this.props.navigation.navigate('home')}>
                        <Image source={backIcon} style={styles.backIcon} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        Dados
                    </Text>
                </View>

                <Text style={styles.testListTitle}>
                    Teste selecionado
                </Text>

                {this.state.selectedName == null ?
                    <View style={styles.downloadContainer}>
                        <View style={styles.choosenTestContainer}>
                            <Text style={styles.choosenTestTextFalse}>
                                Teste
                            </Text>
                        </View>

                        <View style={styles.downloadButton}>
                            <Text style={styles.downloadButtonTextFalse}>
                                Download
                            </Text>
                        </View>

                    </View>
                    :
                    <View style={styles.downloadContainer}>
                        <View style={styles.choosenTestContainer}>
                            <Text style={styles.choosenTestText}>
                                {this.state.selectedName}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.downloadButton}
                            onPress={() => this.download(this.state.selectedName)}>
                            <Text style={styles.downloadButtonText}>
                                Download
                            </Text>
                        </TouchableOpacity>
                    </View>}
                <View>
                    <Text style={styles.testListTitle}>
                        {this.state.times.length == 0 ? 'Nenhum teste disponível no momento' : 'Lista de testes disponíveis'}
                    </Text>
                </View>

                <View>
                    <FlatList
                        style={styles.flatListContainer}
                        ItemSeparatorComponent={() =>
                            <View style={{ borderWidth: 0.5, borderColor: '#b6bec8' }} />}
                        ListHeaderComponent={() => {
                            if (this.state.times.length == 0) {
                                return null
                            } else {
                                return (
                                    <View style={{ borderWidth: 0.5, borderColor: '#b6bec8' }} />
                                )
                            }
                        }}
                        ListFooterComponent={() => {
                            if (this.state.times.length == 0) {
                                return null
                            } else {
                                return (
                                    <View style={{ borderWidth: 0.5, borderColor: '#b6bec8' }} />
                                )
                            }
                        }}
                        data={this.state.times}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={styles.itens}
                                onPress={() => this.setState({
                                    selectedName: item.name
                                })
                                }>
                                <Text style={styles.textItens}>
                                    {item.name}
                                </Text>
                                <Text style={styles.testDate}>
                                    {format(new Date(item.finishMoment), 'kk:mm:ss, dd/MM/yyyy')}
                                </Text>
                            </TouchableOpacity>}
                        keyExtractor={item => Object.values(item).toString()} />
                </View>
                <View style={styles.bottomRealTime}>
                    <TouchableOpacity style={styles.lasttouchable}
                        onPress={() => {
                            this.setState({
                                showEraseData: true,
                            })
                        }}>
                        <View style={styles.buttonfilter}>
                            <Text style={styles.textFiltro}>
                                Limpar Dados
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Download Iniciado"
                    message="Arquivo de texto será armazenado em seu dispositivo em instantes"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    titleStyle={{ color: '#000', fontSize: 22, textAlign: 'center', }}
                    messageStyle={{ fontSize: 16, color: '#6d777b', textAlign: 'center' }}
                    contentContainerStyle={{ backgroundColor: '#FFFF', borderWidth: 1.5, borderColor: '#b6bec8' }}
                    confirmButtonStyle={{ backgroundColor: 'transparent' }}
                    confirmButtonTextStyle={{ color: '#0b7df0', fontSize: 22 }}
                    onCancelPressed={() => {
                        this.setState({
                            showAlert: false,
                        })
                    }}
                    onConfirmPressed={() => {
                        this.setState({
                            showAlert: false,
                        })
                    }} />

                <AwesomeAlert
                    show={this.state.showAlertWrong}
                    showProgress={false}
                    title="Erro de Conexão"
                    message="Antes de inicar o download, confira se sua conexão Wifi é a mesma da Raspberry Pi."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    titleStyle={{ color: '#000', fontSize: 22, textAlign: 'center', }}
                    messageStyle={{ fontSize: 16, color: '#6d777b', textAlign: 'center' }}
                    contentContainerStyle={{ backgroundColor: '#FFFF', borderWidth: 1.5, borderColor: '#b6bec8' }}
                    confirmButtonStyle={{ backgroundColor: 'transparent' }}
                    confirmButtonTextStyle={{ color: '#0b7df0', fontSize: 22 }}
                    onCancelPressed={() => {
                        this.setState({
                            showAlertWrong: false,
                        })
                    }}
                    onConfirmPressed={() => {
                        this.setState({
                            showAlertWrong: false,
                        })
                    }} />

                <AwesomeAlert
                    show={this.state.showEraseData}
                    showProgress={false}
                    title="Apagar Dados?"
                    message="Tem certeza que deseja apagar todos os dados de testes?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    titleStyle={{ color: '#000', fontSize: 22, textAlign: 'center', }}
                    messageStyle={{ fontSize: 16, color: '#6d777b', textAlign: 'center' }}
                    contentContainerStyle={{ backgroundColor: '#FFFF', borderWidth: 1.5, borderColor: '#b6bec8' }}
                    confirmButtonStyle={{ backgroundColor: 'transparent' }}
                    confirmButtonTextStyle={{ color: '#0b7df0', fontSize: 22 }}
                    onCancelPressed={() => {
                        this.setState({
                            showEraseData: false,
                        })
                    }}
                    onConfirmPressed={() => {
                        this.setState({
                            showEraseData: false,
                        })
                        AsyncStrorage.clear()

                    }} />
            </SafeAreaView>
        )
    }
}