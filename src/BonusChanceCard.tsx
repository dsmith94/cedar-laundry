import React, {useState, useEffect} from 'react';

import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import Player from './Player';
import PlayerTile from './PlayerTile';


let tmr: any = null;

function BonusChanceCard(props: {player: Player, setBonusChance: (v: boolean) => void}) {

    const [input, setInput] = useState('');

    const exitForm = () => {
        props.setBonusChance(input.toUpperCase().trim() === 'Y');
      }

    return (
        <View style={styles.container}>
            <Text style={styles.chanceText}>
                Bonus Chance
            </Text>
            <PlayerTile player={props.player} />
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
    width: Dimensions.get('screen').width * 0.7,
    height: Dimensions.get('screen').height * 0.7,
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