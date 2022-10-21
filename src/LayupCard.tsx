import React, { useEffect } from 'react';

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Player from './Player';
import PlayerTile from './PlayerTile';
import { Audio } from 'expo-av';


const unit = Dimensions.get('window').width * 0.05;


function LayupCard(props: { player: Player, currentTotal: number, turn: number }) {

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
        pass to
      </Text>
      <PlayerTile player={props.player} />
      <Text style={styles.text}>
        Score: {props.currentTotal}
      </Text>
      <View style={styles.turnIndicatorContainer}>
        <View style={styles.turnIndicatorBackground}>
          <View style={[styles.turnIndicator, { width: (props.turn + 1) * unit }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: Dimensions.get('window').width * 0.02,
    fontFamily: 'Taviraj_600SemiBold_Italic',
    textAlign: 'center',
  },
  turnIndicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  turnIndicator: {
    backgroundColor: '#44D7A8',
    borderRadius: unit / 2,
    height: unit,
  },
  turnIndicatorBackground: {
    backgroundColor: 'lightgray',
    borderRadius: unit / 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: unit * 6,
    height: unit
  }
});

export default LayupCard;