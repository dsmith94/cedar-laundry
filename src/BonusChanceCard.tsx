import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

import Player from './Player';
import PlayerTile from './PlayerTile';


let tmr: any = null;

function BonusChanceCard(props: { player: Player, setBonusChance: (v: boolean) => void, keyboard: boolean }) {

  const [input, setInput] = useState('');

  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/bonus.wav'));
    await sound.playAsync();
  }

  function AcceptInput() {
    return (props.keyboard) ?
      <View>
        <Text style={styles.subText}>
          Type 1 to accept bonus chance, or 2 to refuse.
        </Text>
        <TextInput
          autoFocus
          blurOnSubmit
          placeholder='Please type 1 or 2'
          placeholderTextColor='gray'
          autoCapitalize='characters'
          value={input}
          onChangeText={setInput}
          style={styles.textInput}
          onSubmitEditing={exitKeyboardForm}
        />
        <TouchableOpacity style={styles.button} onPress={exitKeyboardForm}>
          <Text style={styles.buttonText}>
            let's go
          </Text>
        </TouchableOpacity>
      </View> :
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.choiceButton} onPress={() => props.setBonusChance(true)}>
          <Text style={styles.buttonText}>
            yes!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choiceButton} onPress={() => props.setBonusChance(false)}>
          <Text style={styles.buttonText}>
            no...
          </Text>
        </TouchableOpacity>
      </View>
  }

  useEffect(() => {
    playAudio();
  }, []);

  const exitKeyboardForm = () => {
    const result = (input.toUpperCase().trim() === 'Y' || input.trim() === '1');
    props.setBonusChance(result);
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
        <AcceptInput />
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
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly'
  },
  buttonText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  choiceButton: {
    backgroundColor: '#44D7A8',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 128,
    paddingVertical: 10,
    borderRadius: 20
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
  chanceText: {
    fontSize: Dimensions.get('window').width * 0.05,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  subText: {
    fontSize: Dimensions.get('window').width * 0.02,
    fontFamily: 'Taviraj_600SemiBold_Italic',
    textAlign: 'center',
  },
});

export default BonusChanceCard;