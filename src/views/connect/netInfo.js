import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

import styles from './styles'

import backIcon from '../../assets/backIcon/backIcon.png'

export default class netInfo extends Component {

  NetInfoSubscription = null;

  constructor(props) {
    super(props);
    this.state = {
      connection_status: false,
      connection_type: null,
      connection_net_reachable: false,
      connection_wifi_enabled: false,
      connection_details: null,
    }
  }

  componentDidMount() {
    this.NetInfoSubscription = NetInfo.addEventListener(
      this._handleConnectivityChange,
    )
  }

  componentWillUnmount() {
    this.NetInfoSubscription && this.NetInfoSubscription()
  }

  _handleConnectivityChange = (state) => {
    this.setState({
      connection_status: state.isConnected,
      connection_type: state.type,
      connection_net_reachable: state.isInternetReachable,
      connection_wifi_enabled: state.isWifiEnabled,
      connection_details: state.details,
    })
  }

  render() {
    return (

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor="#1b277a" barStyle="light-content" />

          <View style={styles.headerContainer}>
            <TouchableOpacity styles={styles.backIconContainer}
              onPress={() => this.props.navigation.navigate('home')}>
              <Image source={backIcon} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              Conexão
            </Text>
          </View>

          <Text style={styles.ipTitle0}>
            Para o correto funcionamento do aplicativo, é necessário que o aparelho celular esteja conectado a mesma rede Wifi do módulo Raspberry PI. Nesse sentido, seguem alguns dados da rede atual.
          </Text>

          <Text style={styles.ipTitle}>
            Status de conexão
          </Text>
          <View style={styles.netInfoContainer}>

            <Text style={styles.postDescription}>
              {this.state.connection_status ? 'Conectado' : 'Desconectado'}
            </Text>
          </View>

          <Text style={styles.ipTitle}>
            Tipo de conexão
          </Text>
          <View style={styles.netInfoContainer}>

            <Text style={styles.postDescription}>
              {this.state.connection_type == 'wifi' ? 'Wifi'
                : this.state.connection_type == 'cellular' ? 'Dados Móveis' : '---'}
            </Text>
          </View>

          <Text style={styles.ipTitle}>
            Conectado a Internet
          </Text>
          <View style={styles.netInfoContainer}>

            <Text style={styles.postDescription}>
              {this.state.connection_net_reachable ? 'Sim' : 'Não'}
            </Text>
          </View>

          <Text style={styles.ipTitle}>
            Wifi Ativado
          </Text>
          <View style={styles.netInfoContainer}>

            <Text style={styles.postDescription}>
              {this.state.connection_wifi_enabled ? 'Sim' : 'Não'}
            </Text>
          </View>

          <Text style={styles.ipTitle}>
            Detalhes da conexão
          </Text>
          <View style={styles.netInfoContainer}>

            <Text style={styles.postDescription}>
              {this.state.connection_type == 'wifi' ?
                (this.state.connection_details.isConnectionExpensive ? 'Conexão Cara: Sim' : 'Conexão Cara: Não')
                + '\n'
                + 'Força: ' + this.state.connection_details.strength
                + '\n'
                + 'Endereço de IP: ' + this.state.connection_details.ipAddress
                + '\n'
                + 'Subnet: ' + this.state.connection_details.subnet
                + '\n'
                + 'Frequência: ' + this.state.connection_details.frequency
                :
                this.state.connection_type == 'cellular' ?
                  (this.state.connection_details.isConnectionExpensive ? 'Conexão Cara: Sim' : 'Conexão Cara: Não')
                  + '\n'
                  + 'Rede de Dados Móveis: ' + this.state.connection_details.cellularGeneration
                  + '\n'
                  + 'Operadora de Telefonia Móvel: ' + this.state.connection_details.carrier
                  :
                  '---'
              }
            </Text>
          </View>
          <Text style={styles.lastNetInfoPage}>
            .
          </Text>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
