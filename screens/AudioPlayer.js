import styles from './../styles.js'

import { LinearGradient } from 'expo-linear-gradient'
import { Text, View, Button, Image, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'

import LanguageSettings from '../components/LanguageSettings.js'
import { AudioItem } from '../components/Items.js'


export default function MainScreen({navigation, route}) {

    const lang = route.params.lang
    const id = route.params.id
    const data = LanguageSettings[id]
    
    const [kill, setKill] = useState(false)


    function stop() {
        setKill(true)
        navigation.navigate('main_screen')
    }


    return (
        <LinearGradient start={{x: 1, y: 1}} end={{x: 0, y: 0}} colors={['#5C5033', '#FFFFFF' ]} style={styles.container}>
            <View style={{alignItems: 'center', width: '90%'}}>
                <Image
                    source={require("../assets/headh.png")}
                    style={{height: 100, resizeMode: 'contain'}}
                />
                <View style={[styles.container_white, {width: '100%'}]}>
                    <Text style={styles.header}>{data.title[lang]}</Text>
                    <Text>{data.text[lang]}</Text>
                </View>
            </View>

            <ScrollView style={styles.scroll_view}>
                <AudioItem audio={require('../assets/music/among-drip.mp3')} id='among_drip' title='Among Us Drip' autor='Among us the Company' kill={kill} />
                <AudioItem audio={require('../assets/music/jumatate-eu.mp3')} id='jumatate' title='Jumatate eu, jumatate tu' autor='Adrian Ursu' kill={kill} />
                <AudioItem audio={require('../assets/music/tu-esti.mp3')} id='tu-esti' title='Tu esti tot ce mi-am dorit' autor='Adrian Ursu' kill={kill} />
                <AudioItem audio={require('../assets/music/numai-tu.mp3')} id='numai' title='Numai tu' autor='Ion Suruceanu' kill={kill} />
                <AudioItem audio={require('../assets/music/numa-numa.mp3')} id='numa-numa' title='Numa Numa' autor='O-Zone' kill={kill}  />
                <AudioItem audio={require('../assets/music/pahar.mp3')} id='pahar' title='Să Ridicăm Paharul...' autor='Ian Raiburg' kill={kill}  />

            </ScrollView>

            <View style={{marginBottom: 15}} />
                <Button title="Înapoi la meniu!" onPress={() => {
                    setTimeout(stop, 100)
                }}/>
            <View style={{marginBottom: 25}} />
        </LinearGradient>
    )
}


