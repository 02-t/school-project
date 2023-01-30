import styles from '../styles.js'

import { LinearGradient } from 'expo-linear-gradient'
import { Image, ScrollView, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { MenuItem } from '../components/Items.js'
import images from '../assets/index.js'

import LanguageSettings from '../components/LanguageSettings.js'

const max_logos = images.logos.length
let logo_count = 0

const max_lang = LanguageSettings.hellos.length
let lang_count = 0

export default function MainScreen({navigation, route}) {
    const [text, updateText] = useState("🥰🙂 Bine ai venit! 😳😈")
    const [img, updateImg] = useState(0)
    const [lang, updateLang] = useState(0)

    function changeLogo() {
        logo_count++
        if (logo_count >= max_logos) logo_count = 0
        updateImg(logo_count)
    }

    function changeLang() {
        lang_count++
        if (lang_count >= max_lang) lang_count = 0
        updateLang(lang_count)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const emojis = LanguageSettings.emojis[lang_count]
            const hello = LanguageSettings.hellos[lang_count]
            const n1 = Math.ceil(Math.random() * emojis.length-1)
            const n2 = Math.ceil(Math.random() * emojis.length-1)
            const n3 = Math.ceil(Math.random() * emojis.length-1)
            const n4 = Math.ceil(Math.random() * emojis.length-1)
            updateText(emojis[n1] + emojis[n2] + hello + emojis[n3] + emojis[n4])
        }, 100)
    
        return () => clearInterval(interval);
    }, [])

    return (
        <LinearGradient start={{x: 1, y: 1}} end={{x: 0, y: 0}} colors={['#5C5033', '#FFFFFF' ]} style={styles.container}>
            <View style={{alignItems: 'center', width: '90%'}}>
                <Image
                    source={images.logos[img]}
                    style={{height: 140, resizeMode: 'contain'}}
                />
                <View style={[styles.container_white, {width: '100%'}]}>
                    <Text style={styles.header}>{text}</Text>
                    <Text>Realizat de Celcinschi Alexei P-1942</Text>
                </View>
            </View>

            
            <ScrollView style={styles.scroll_view}>
                <MenuItem
                    onPress={() => navigation.navigate('audio_player', {lang: lang, id: "audio_player"})}
                    id={"audio_player"}
                    lang={lang}
                />

                <MenuItem
                    onPress={changeLogo}
                    id={"momo"}
                    lang={lang}
                />
                
                <MenuItem
                    onPress={changeLang}
                    id={"lang"}
                    lang={lang}
                />
            </ScrollView>

            <Image // XI JINPING
                style={{
                    position: 'absolute', 
                    bottom: 0, 
                    left: 10,
                    height: lang == 1 ? 250:0,
                    resizeMode: 'contain'
                }}
                source={require("../assets/xi-jinping.png")}
            />

            <Image // cn hat on top of momo
                style={{
                    position: 'absolute', 
                    top: 70, 
                    height: lang == 1 ? 40:0,
                    resizeMode: 'contain'
                }}
                source={require("../assets/cn_hat.png")}
            />

            <Image // tea
                style={{
                    position: 'absolute', 
                    bottom: 0, 
                    left: -40,
                    height: lang == 2 ? 200:0,
                    resizeMode: 'contain'
                }}
                source={require("../assets/tea.png")}
            />

        </LinearGradient>
    )
}


