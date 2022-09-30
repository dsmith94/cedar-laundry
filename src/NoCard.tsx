import React, { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';


function NoCard(props: {citation: string, verse: string, currentTotal: number}) {

  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/wrong.wav'));
    await sound.playAsync();
  }

  useEffect(() => {
    playAudio();
  }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.noText}>
                sorry, not quite
            </Text>
            <View style={styles.backGround}>
              <Text style={styles.subText}>
                  {props.citation}
              </Text>
            <Text style={styles.text}>
                {props.verse}
            </Text>
            </View>
            <Text style={styles.scoreText}>
                 Score: {props.currentTotal}
            </Text>
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
  noText: {
    fontSize: 64,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  subText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 36,
    textAlign: 'center',
  },
  text: {
    fontSize: 25,
    fontFamily: 'Taviraj_400Regular'
  },
});

export default NoCard;