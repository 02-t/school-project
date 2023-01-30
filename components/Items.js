import { View, Text, Button, Alert, Image, TouchableNativeFeedback, ImageBackground, Touchable } from 'react-native'

import styles from '../styles.js'
import images from '../assets/index.js'
import LanguageSettings from './LanguageSettings.js'

import { Audio } from 'expo-av'
import { useState, useEffect } from 'react'
import { setStatusBarBackgroundColor } from 'expo-status-bar'


export const MenuItem = function MenuItem(props) {

    const id = props.id
    const data = LanguageSettings[id]

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={[styles.container_white, styles.main_items_container]}>
                <Image
                    style={styles.main_items_thumbnail}
                    source={images.thumbnails[id]}
                />
                <View style={styles.resultDetailsContainer}>
                    <Text style={styles.header2}> {data.title[props.lang]} </Text>
                    <Text style={{marginStart: 5}} >{data.text[props.lang]}</Text>
                </View>
            </View> 
        </TouchableNativeFeedback>
    )
}

export const AudioItem = function AudioItem(props) {

    const audio = props.audio
    const id = props.id

    const [firstTime, setFirstTime] = useState(true)
    
    const [restart, setRestart] = useState(true)
    const [sound, setSound] = useState()

    useEffect(()=>{
        if (!restart) updateBar()
    }, [restart])

    useEffect(()=>{
        if (props.kill) kill()
    }, [props.kill])


    const [state, setState] = useState("play")
    const [pos, updatePos] = useState(0)

    async function playSound() {
        console.log("sunt LA 1", restart, state, firstTime)
        if (state == "pause" && restart == false) {
            pauseSound()
            return
        }

        if (firstTime){
            setFirstTime (false)
            const { sound } = await Audio.Sound.createAsync(audio)
            setSound(sound)
            setState("pause")
            setRestart(false)
            await sound.playAsync()
            await sound.setIsLoopingAsync(true)
            return
        }

        if (restart) {
            setState("pause")
            setRestart(false)
            await sound.playAsync()
            await sound.setIsLoopingAsync(true)

            return
        }

        setState("pause")
        console.log("yyyyy")
        sound.playAsync()
    }

    async function pauseSound() {
        setState("play")
        setRestart(false)
        sound.pauseAsync()
    }

    async function stopSound() {
        setState("play")
        setRestart(true)
        sound.stopAsync()
        updatePos(0)
    }

    async function next() {
        if (restart) return
        const data = await sound.getStatusAsync()
        sound.setPositionAsync(data.positionMillis + 5*1000)
        setBar()
    }

    async function prev() {
        if (restart) return
        const data = await sound.getStatusAsync()
        sound.setPositionAsync(data.positionMillis - 5*1000)
        setBar()
    }

    async function setBar() {
        const data = await sound.getStatusAsync()
        const max = data.durationMillis
        const now = data.positionMillis
        
        updatePos((now/max) * 100)
    }
    
    function updateBar() {
        setBar()
        setTimeout(updateBar, 500)
    }

    function kill() {
        console.log("kill is on")
        if (sound)
            sound.unloadAsync()
        setRestart(true)
    }


    return (
        <View style={[styles.container_white, styles.main_items_container, {alignItems: 'center', justifyContent: 'space-between', height: 100}]}>
            <Image
                style={styles.main_items_thumbnail}
                source={images.thumbnails[id]}
            />
            <View style={{flex: 1}}>
                <Text style={styles.header3}> {props.title} </Text>
                <Text style={styles.italic}> {props.autor} </Text>
                
                <View style={{height: '40%', marginTop:5, marginBottom:5, flexDirection: 'row',  justifyContent: 'center'}}>
                    <TouchableNativeFeedback onPress={prev}>
                        <Image
                            source={images.audio.prev}
                            style={styles.audio_button}
                        />
                    </TouchableNativeFeedback>
                    
                    <TouchableNativeFeedback onPress={playSound}>
                        <Image
                            source={images.audio[state]}
                            style={styles.audio_button}
                        />
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={stopSound}>
                        <Image
                            source={images.audio.stop}
                            style={styles.audio_button}
                        />
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={next}>
                        <Image
                            source={images.audio.next}
                            style={styles.audio_button}
                        />
                    </TouchableNativeFeedback>
                </View>

                <View style={{ alignSelf:'center', borderRadius:4, backgroundColor: '#9A9A9A', height: 4, width: '90%'}}>
                    <View style={{height:'100%', width:pos+'%', borderRadius: 4, backgroundColor: 'red'}}/>
                </View>
            </View>
        </View> 
    )
}