import { StatusBar } from 'react-native'

import MainScreen from './screens/MainScreen.js'
import AudioPlayer from './screens/AudioPlayer.js'

import styles from './styles.js'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator()


export default function App() {
  return (
        <NavigationContainer>
            <StatusBar
                backgroundColor="transparent"
                translucent={true}
            />
            
            <Stack.Navigator>
                <Stack.Screen
                    name="main_screen"
                    component={MainScreen}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="audio_player"
                    component={AudioPlayer}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
  )
}


