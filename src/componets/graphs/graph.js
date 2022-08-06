import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import { LineChart } from "react-native-chart-kit";
import { YAxis } from "react-native-svg-charts";

import api from '../../services/api'

import styles from "./styles";

const dimensions = Dimensions.get("window").width

export default class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            graphName: 'Velocidade',
            graphName2: '',

            graphTitle: '',
            graphTitle2: '',
            graphM: '',
            graphM2: '',

            dados: [0],
            dados2: [0],
            yAxis: [],
            yAxis2: [],

            time: '',
        }
    }

    componentDidMount() {
        let mounted = true
        if (mounted) {
            this.interval = setInterval(this.dataRefresh, 500);
        }
        return () => mounted = false;
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    dataRefresh = async () => {
        //console.log(this.state.dados + 'aaas')
        //console.log('b')        
        try {
            await api.get('/realtime').then((response) => {
                console.log(response.data)

                if (response.data !== 'Nada' && typeof (Number(response.data[this.state.graphName])) == 'number') {
                    this.state.dados.push(Number(response.data[this.state.graphName]))

                    if (this.state.graphName2 != '') {
                        //console.log(this.state.yAxis2[this.state.yAxis2.length-1] + typeof(this.state.yAxis2[this.state.yAxis2-1]))
                        let map = this.convertRange(Number(response.data[this.state.graphName2]), [0, this.state.yAxis2[this.state.yAxis2.length - 1]], [0, this.state.yAxis[0]])
                        //console.log(map)
                        this.state.dados2.push(map)
                    }
                    //this.state.dados3.push(Number(response.data[this.state.graphName3]))
                    //this.state.times.push(`${Number(this.state.times[this.state.times.length-1])+1}`)
                }

                if (this.state.dados.length > 20) {
                    //this.state.dados.shift()
                    this.state.dados.splice(0, 1)
                }
                if (this.state.dados2.length > 20) {
                    //this.state.dados.shift()
                    this.state.dados2.splice(0, 1)
                }

            }).catch(err => {
                Alert.alert('Servidor fora do ar: ' + err)
                return
            })
        } catch (error) {
            return
        }
        this.setState({ time: Date.now() })
    }

    changeGraphs = (graphName) => {

        if (this.state.graphName == graphName && this.state.graphName2 == '') {
            //console.log(this.state.graphName2 + this.state.graphName3 + this.state.graphName)
            return

        } else if (this.state.graphName != graphName && this.state.graphName2 == '') {
            this.setState({
                graphName2: graphName,
                dados: [0],
                dados2: [0],
            })
            //console.log(this.state.graphName2 + this.state.graphName3 + this.state.graphName)
            return

        } else if (this.state.graphName != graphName && this.state.graphName2 == graphName) {
            this.setState({
                graphName2: '',
                dados: [0],
                dados2: [0],
            })
            return

        } else if (this.state.graphName != graphName && this.state.graphName2 != graphName) {
            this.setState({
                graphName: this.state.graphName2,
                graphName2: graphName,
                dados: [0],
                dados2: [0],
            })
            //console.log(this.state.graphName2 + this.state.graphName3 + this.state.graphName)
            return
        }

    }

    convertRange = (value, r1, r2) => {
        return (Math.ceil(Number(value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0]))
    }

    render() {

        switch (this.state.graphName) {
            case 'Velocidade':
                this.state.yAxis = [100]
                this.state.graphTitle = 'Velocidade'
                this.state.graphM = '(em Km/h)'
                break
            case 'RPM':
                this.state.yAxis = [3000]
                this.state.graphTitle = 'RPM'
                this.state.graphM = '(em rotações/min)'
                break
            case 'Gasolina':
                this.state.yAxis = [100]
                this.state.graphTitle = 'Gasolina'
                this.state.graphM = '(em litros)'
                break
            case 'Pressao_de_Freio':
                this.state.yAxis = [200]
                this.state.graphTitle = 'Pressão de Freio'
                this.state.graphM = '(em MPa)'
                break
            case 'Temperatura_da_CVT':
                this.state.yAxis = [200]
                this.state.graphTitle = 'Temperatura da CVT'
                this.state.graphM = '(em °C)'
                break
            case 'Temperatura_do_Motor':
                this.state.yAxis = [200]
                this.state.graphTitle = 'Temperatura do Motor'
                this.state.graphM = '(em °C)'
                break
            case 'Acelerometro':
                this.state.yAxis = [100]
                this.state.graphTitle = 'Acelerometro'
                this.state.graphM = '(em m/s^2)'
                break
        }

        switch (this.state.graphName2) {
            case '':
                this.state.yAxis2 = []
                this.state.graphTitle2 = ''
                this.state.graphM2 = ''
                break
            case 'Velocidade':
                this.state.yAxis2 = [0, 20, 40, 60, 80, 100]
                this.state.graphTitle2 = ' e Velocidade'
                this.state.graphM2 = ', (em Km/h)'
                break
            case 'RPM':
                this.state.yAxis2 = [0, 600, 1200, 1800, 2400, 3000]
                this.state.graphTitle2 = ' e RPM'
                this.state.graphM2 = ', (em rotações/min)'
                break
            case 'Gasolina':
                this.state.yAxis2 = [0, 20, 40, 60, 80, 100]
                this.state.graphTitle2 = ' e Gasolina'
                this.state.graphM2 = ', (em litros)'
                break
            case 'Pressao_de_Freio':
                this.state.yAxis2 = [0, 40, 80, 120, 160, 200]
                this.state.graphTitle2 = ' e Pres. de Freio'
                this.state.graphM2 = ', (em MPa)'
                break
            case 'Temperatura_da_CVT':
                this.state.yAxis2 = [0, 40, 80, 120, 160, 200]
                this.state.graphTitle2 = ' e Temp. da CVT'
                this.state.graphM2 = ', (em °C)'
                break
            case 'Temperatura_do_Motor':
                this.state.yAxis2 = [0, 40, 80, 120, 160, 200]
                this.state.graphTitle2 = ' e Temp. do Motor'
                this.state.graphM2 = ', (em °C)'
                break
            case 'Acelerometro':
                this.state.yAxis2 = [0, 20, 40, 60, 80, 100]
                this.state.graphTitle2 = ' e Acelerômetro'
                this.state.graphM2 = ', (em m/s^2)'
                break
        }

        return (
            <View style={styles.viewsup}>

                <View>
                    <Text style={styles.title1}>
                        {this.state.graphTitle}
                        <Text style={styles.title3}>
                            {this.state.graphTitle2}
                        </Text>
                        {' '}X Tempo
                    </Text>

                    <Text style={styles.title2}>
                        {this.state.graphM}
                        <Text style={styles.title4}>
                            {this.state.graphM2}
                        </Text>
                        {' '}X (em 500ms)
                    </Text>
                </View>

                <View style={styles.chartView}>

                    <LineChart
                        data={{
                            datasets: [
                                {
                                    data: this.state.dados,
                                },
                                {
                                    data: this.state.dados2,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
                                },
                                {
                                    data: [0] // min
                                },
                                {
                                    data: [this.state.yAxis[this.state.yAxis.length - 1]] // max
                                },
                            ]
                        }}
                        width={dimensions * 0.9} // from react-native
                        height={300}
                        segments={5}
                        yAxisInterval={2}
                        yMax={100000}
                        fromZero={true}
                        withVerticalLabels={false}
                        chartConfig={{
                            backgroundColor: "#1b277a",
                            backgroundGradientFrom: "#1b277a",
                            backgroundGradientTo: "#1b277a",
                            //margin: 15,
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "3",
                                strokeWidth: "1",
                                stroke: "#1b277a"
                            },
                        }}
                        bezier
                        style={{
                            marginLeft: -40,
                            marginTop: 30,
                            //borderRadius: 15,
                        }} />
                    <YAxis
                        data={this.state.yAxis2}
                        contentInset={{ top: 40, bottom: 56 }}
                        svg={{
                            fill: 'lightgrey',
                            fontSize: 12,
                        }}
                        numberOfTicks={6}
                        formatLabel={(value) => `   ${value}`}
                    />
                </View>

                <View style={styles.line}>

                    <View style={styles.line3}>
                        <Text style={styles.titleGraph}>
                            Gráficos
                        </Text>
                    </View>

                    <View style={styles.line2}>

                    </View>
                </View>

                <View style={styles.buttomContainer}>

                    <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.graphName == 'Velocidade' ? '#333' : this.state.graphName2 == 'Velocidade' ? '#333' : '#e8e8e8' }]}
                        onPress={() => this.changeGraphs('Velocidade')}>
                        <Text style={styles.textButtons}> Velocidade</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.graphName == 'RPM' ? '#333' : this.state.graphName2 == 'RPM' ? '#333' : '#e8e8e8' }]}
                        onPress={() => this.changeGraphs('RPM')}>
                        <Text style={styles.textButtons}> RPM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.graphName == 'Gasolina' ? '#333' : this.state.graphName2 == 'Gasolina' ? '#333' : '#e8e8e8' }]}
                        onPress={() => this.changeGraphs('Gasolina')}>
                        <Text style={styles.textButtons}> Gasolina</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.graphName == 'Pressao_de_Freio' ? '#333' : this.state.graphName2 == 'Pressao_de_Freio' ? '#333' : '#e8e8e8' }]}
                        onPress={() => this.changeGraphs('Pressao_de_Freio')}>
                        <Text style={styles.textButtons}> Pressão de Freio</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.graphName == 'Temperatura_do_Motor' ? '#333' : this.state.graphName2 == 'Temperatura_do_Motor' ? '#333' : '#e8e8e8' }]}
                        onPress={() => this.changeGraphs('Temperatura_do_Motor')}>
                        <Text style={styles.textButtons}> Temperatura do Motor</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.graphName == 'Temperatura_da_CVT' ? '#333' : this.state.graphName2 == 'Temperatura_da_CVT' ? '#333' : '#e8e8e8' }]}
                        onPress={() => this.changeGraphs('Temperatura_da_CVT')}>
                        <Text style={styles.textButtons}> Temperatura da CVT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.butttonsFiltro, { backgroundColor: this.state.graphName == 'Acelerometro' ? '#333' : this.state.graphName2 == 'Acelerometro' ? '#333' : '#e8e8e8' }]}
                        onPress={() => this.changeGraphs('Acelerometro')}>
                        <Text style={styles.textButtons}> Acelerômetro</Text>
                    </TouchableOpacity>

                </View>

            </View>
        )
    }
}
