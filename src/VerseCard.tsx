import React, { useState, useEffect } from 'react';

import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';

const oneSecondTick = 1000;
const timeInSeconds = 30;
const waitToStart = 3 * oneSecondTick;
let timeOut: any = null;


function TimerBar(props: {timeLeftInSeconds: number}) {
  let color = 'green';
  if (props.timeLeftInSeconds < 10) {
    color = 'red';
  } else if (props.timeLeftInSeconds < 20) {
    color = 'yellow';
  }
  const ratio = props.timeLeftInSeconds * 0.04;
  return <View style={{
    width: (Dimensions.get('screen').width * 0.5) * ratio,
    height: 48,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 20,
    backgroundColor: color
  }} />
}


function getFormattedPossibleChapters(chapters: number[]) {
  const arr = [...chapters];
  const last = arr.pop();
  return [arr.map(n => <Text key={`kch-${n}`}><b>{n}</b>, </Text>), <Text key={`kch-${last}`}>or <b>{last}</b></Text>]
}


function VerseCard(props: {verse: string, possibleChapters: number[], finishTurn: (chapter: string, timeLeft: number) => void}) {

    const [chapter, setChapter] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(timeInSeconds);

    async function playAudio() {
      const { sound } = await Audio.Sound.createAsync(require('../assets/high.wav'));
      await sound.playAsync();
    }
  
    useEffect(() => {
      let rm = timeRemaining;
      playAudio();
      timeOut = null;
      setTimeout(() => {
        timeOut = setInterval(() => {
          if (rm > 0) {
            rm -= 1;
            setTimeRemaining(rm);
          }
        }, oneSecondTick);
      }, waitToStart);
    }, []);

    const exitForm = () => {
      if (timeOut) {
        clearInterval(timeOut);
      }
      props.finishTurn(chapter, timeRemaining);
    }


    return (
        <View style={styles.container}>
            <View style={styles.backGround}>
              <Text style={styles.text}>
                  {props.verse}
              </Text>
            </View>
            <Text style={styles.subText}>
                Which chapter is this Scripture in?
            </Text>
              <Text style={styles.possibleChaptersText}>
                Is it in {getFormattedPossibleChapters(props.possibleChapters)}?
              </Text>
            <TextInput
              autoFocus
              blurOnSubmit
              value={chapter}
              onChangeText={setChapter}
              style={styles.textInput}
              onSubmitEditing={exitForm}
            />
            <TouchableOpacity style={styles.button} onPress={exitForm}>
                <Text style={styles.buttonText}>
                    Enter
                </Text>
            </TouchableOpacity>
            <TimerBar timeLeftInSeconds={timeRemaining} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  backGround: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#EFEFEF'
  },
  button: {
    backgroundColor: '#44D7A8',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: (Dimensions.get('screen').width * 0.5),
    paddingVertical: 10,
    borderRadius: 20
  },
  textInput: {
    fontSize: 42,
    borderWidth: 0,
    overlayColor: 'white',
    borderColor: 'white',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  possibleChaptersText: {
    fontSize: 36,
    margin: 5,
    textAlign: 'center'
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  subText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    fontFamily: 'Taviraj_400Regular'
  },
});

export default VerseCard;