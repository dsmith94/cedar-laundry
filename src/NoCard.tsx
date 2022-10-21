import React, { useEffect } from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';
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
    fontSize: Dimensions.get('window').width * 0.06,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  subText: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scoreText: {
    fontSize: Dimensions.get('window').width * 0.03,
    textAlign: 'center',
  },
  text: {
    fontSize: Dimensions.get('window').width * 0.02,
    fontFamily: 'Taviraj_400Regular'
  },
});

export default NoCard;