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
            <TouchableOpacity style={styles.bottomButton} onPress={props.finishCard}>
                <Text style={styles.buttonText}>
                    exit
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
    fontSize: Dimensions.get('window').width * 0.06,
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
    width: Dimensions.get('window').width * 0.075,
    aspectRatio: 1,
    marginRight: 4,
    borderColor: 'brown',
    borderWidth: 2,
    resizeMode: 'contain'
  },
  bottomButton: {
    width: 128,
    height: 64,
    borderRadius: 20,
    marginHorizontal: (Dimensions.get('window').width * 0.45) - 64,
    backgroundColor: '#F6E1D3'
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 10,
    height: 64,
    flex: 1,
  },
  leftText: {
    fontSize: Dimensions.get('window').width * 0.06,
    fontFamily: 'Taviraj_600SemiBold_Italic',
    textAlign: 'left',
  },
  rightText: {
    marginRight: 10,
    fontSize: Dimensions.get('window').width * 0.06,
    fontFamily: 'Taviraj_600SemiBold_Italic',
    textAlign: 'right',
  },
});

export default ScoreCard;