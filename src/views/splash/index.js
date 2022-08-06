import React, { Component } from 'react'
import {
    View,
    StatusBar,
    Image,
} from 'react-native'

import LottieView from 'lottie-react-native'

import logoSplash from '../../assets/logo/logo_splash.png'
import styles from './style'
import animation from '../../assets/lottieAnimation/animation_1.json'

export default class AppStateExample extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={logoSplash} style={styles.splash} />
                <StatusBar backgroundColor="#1b278a"
                    barStyle="light-content" />
                <LottieView style={styles.animation}
                    source={animation}
                    autoPlay
                    loop={false}
                    onAnimationFinish={() =>
                        this.props.navigation.replace('home')
                    } />
            </View>
        )
    }
}