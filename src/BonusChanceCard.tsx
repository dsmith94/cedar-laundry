import React, {useState, useEffect} from 'react';

import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { Audio } from 'expo-av';

import Player from './Player';
import PlayerTile from './PlayerTile';


let tmr: any = null;

function BonusChanceCard(props: {player: Player, setBonusChance: (v: boolean) => void}) {

    const [input, setInput] = useState('');

    async function playAudio() {
      const { sound } = await Audio.Sound.createAsync(require('../assets/bonus.wav'));
      await sound.playAsync();
    }
  
    useEffect(() => {
      playAudio();
    }, []);

    const exitForm = () => {
        props.setBonusChance(input.toUpperCase().trim() === 'Y');
      }

    return (
        <View style={styles.container}>
            <Text style={styles.chanceText}>
                Bonus Chance
            </Text>
            <View style={styles.backGround}>
              <Text style={styles.subText}>
                  You can double the points you get on the next Scripture!
              </Text>
              <Text style={styles.subText}>
                  Or, potentially cut your current score in half.
              </Text>
              <TextInput
                autoFocus
                blurOnSubmit
                placeholder='Please type Y or N'
                placeholderTextColor='gray'
                autoCapitalize='characters'
                value={input}
                onChangeText={setInput}
                style={styles.textInput}
                onSubmitEditing={exitForm}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backGround: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#EFEFEF'
  },
  textInput: {
    fontSize: 42,
    borderWidth: 0,
    overlayColor: 'white',
    borderColor: 'white',
    textAlign: 'center'
  },
  chanceText: {
    fontSize: 80,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  subText: {
    fontSize: 32,
    fontFamily: 'Taviraj_600SemiBold_Italic',
    textAlign: 'center',
  },
});

export default BonusChanceCard;