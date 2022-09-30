import React, { useEffect } from 'react';

import { StyleSheet, Text, Dimensions, View, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';

import ImageBank from './ImageBank';
import Player from './Player';


function ScoreCard(props: {players: Player[], scores: Map<number, number>, finishCard: () => void}) {
    
  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/endgame.wav'));
    await sound.playAsync();
  }

  useEffect(() => {
    playAudio();
  }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.finalText}>
                Well Played!
            </Text>
            {props.players.map((p, i) => <View style={styles.scoreRow} key={`pl-${i}`}>
                <View style={styles.playerStack}>
                  <Image source={ImageBank[p.image]} style={styles.imageContain} />
                  <Text style={styles.leftText}>
                      {p.name}
                  </Text>
                </View>
                <Text style={styles.rightText}>
                    {props.scores.get(i) ?? 0}
                </Text>
            </View>)}
            <TouchableOpacity onPress={props.finishCard}>
                <Text style={styles.buttonText}>
                    Exit
                </Text>    
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  finalText: {
    fontSize: 64,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  playerStack: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  imageContain: {
    width: 64,
    height: 64,
    marginRight: 4,
    borderColor: 'brown',
    borderWidth: 2,
    resizeMode: 'contain'
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.67,
    height: 64
  },
  leftText: {
    fontSize: 30,
    fontFamily: 'Taviraj_600SemiBold_Italic',
    textAlign: 'left',
  },
  rightText: {
    fontSize: 30,
    fontFamily: 'Taviraj_600SemiBold_Italic',
    textAlign: 'right',
  },
});

export default ScoreCard;