import React, { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import Player from './Player';
import PlayerTile from './PlayerTile';
import { Audio } from 'expo-av';


function LayupCard(props: {player: Player, currentTotal: number, turn: number}) {

  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/turn.wav'));
    await sound.playAsync();
  }

  useEffect(() => {
    playAudio();
  }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                pass the keyboard to
            </Text>
            <PlayerTile player={props.player} />
            <Text style={styles.text}>
              Score: {props.currentTotal}
            </Text>
            <Text style={styles.text}>
              Turn: {props.turn + 1} of 6
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 30,
    fontFamily: 'Taviraj_600SemiBold_Italic',
    textAlign: 'center',
  },
});

export default LayupCard;