import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import home from '../views/home'
import realtime from '../views/realTime'
import datas from '../views/datas'
import splash from '../views/splash'
import netInfo from '../views/connect/netInfo'

const Stack = createStackNavigator()

export default props => {
    return(
        <Stack.Navigator 
        initialRouteName = 'splash'
        screenOptions= {{headerShown: false}}>
            <Stack.Screen name = 'splash' component = {splash}/>
            <Stack.Screen name = 'home' component = {home}/>
            <Stack.Screen name = 'netInfo' component = {netInfo}/>
            <Stack.Screen name = 'realtime' component= {realtime}/>
            <Stack.Screen name = 'datas' component = {datas}/>  
        </Stack.Navigator>
    )
}