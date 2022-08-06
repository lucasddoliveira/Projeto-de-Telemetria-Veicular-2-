import React, { Component } from 'react'
import { TouchableOpacity, Text, View, Modal, TouchableWithoutFeedback } from 'react-native'

import { Avatar } from 'react-native-paper'
import baja from '../../assets/baja/baja.png'

import styles from './styles'

export default class filter extends Component {

    state = {
        Velocidade: true,
        RPM: true,
        Gasolina: true,
        Pressao_de_Freio: true,
        Temperatura_da_CVT: true,
        Temperatura_do_Motor: true,
        Acelerometro: true,
    }

    exportSelection = () => {
        var selection = Object.keys(Object.fromEntries(
            Object.entries(this.state).filter(([key, value]) => value == true)))

        this.props.updateSelection(selection);
    }

    render() {
        getFiltro = () => {
            return (
                <View style={styles.background}>
                    <View style={styles.contanier}>
                        <View style={styles.container2}>
                            <Text style={styles.title}>
                                Filtro
                            </Text>

                            <TouchableOpacity onPressOut={() => {
                                this.setState({
                                    Velocidade: true,
                                    RPM: true,
                                    Gasolina: true,
                                    Pressao_de_Freio: true,
                                    Temperatura_da_CVT: true,
                                    Temperatura_do_Motor: true,
                                    Acelerometro: true,
                                })
                            }}>
                                <Avatar.Icon size={56} icon={baja} color='#001374' style={styles.avatar} />
                            </TouchableOpacity>

                        </View >

                        <View style={styles.areaButtons}>

                            <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.Velocidade ? '#d8d8d8' : '#333333' }]}
                                onPress={() => { this.setState({ Velocidade: !this.state.Velocidade }) }}>
                                <Text style={styles.textButtons}> Velocidade</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.RPM ? '#d8d8d8' : '#333333' }]}
                                onPress={() => { this.setState({ RPM: !this.state.RPM }) }}>
                                <Text style={styles.textButtons}> RPM</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.Gasolina ? '#d8d8d8' : '#333333' }]}
                                onPress={() => { this.setState({ Gasolina: !this.state.Gasolina }) }}>
                                <Text style={styles.textButtons}> Gasolina</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.Pressao_de_Freio ? '#d8d8d8' : '#333333' }]}
                                onPress={() => { this.setState({ Pressao_de_Freio: !this.state.Pressao_de_Freio }) }}>
                                <Text style={styles.textButtons}> Pressão de Freio</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.Temperatura_da_CVT ? '#d8d8d8' : '#333333' }]}
                                onPress={() => { this.setState({ Temperatura_da_CVT: !this.state.Temperatura_da_CVT }) }}>
                                <Text style={styles.textButtons}> Temperatura CVT</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.Temperatura_do_Motor ? '#d8d8d8' : '#333333' }]}
                                onPress={() => { this.setState({ Temperatura_do_Motor: !this.state.Temperatura_do_Motor }) }}>
                                <Text style={styles.textButtons}> Temperatura do Motor</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.Acelerometro ? '#d8d8d8' : '#333333' }]}
                                onPress={() => { this.setState({ Acelerometro: !this.state.Acelerometro }) }}>
                                <Text style={styles.textButtons}> Acelerômetro</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            )
        }

        return (
            <Modal transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='fade'>
                {getFiltro()}
                <TouchableWithoutFeedback onPress={this.props.onCancel} onPressOut={this.exportSelection}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}
