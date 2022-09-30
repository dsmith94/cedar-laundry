import React, {useState, useEffect} from 'react';

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Audio } from 'expo-av';


let tmr: any = null;

function YesCard(props: {citation: string, verse: string, specialMsg: boolean, pointsAdded: number, currentTotal: number}) {

    const [finalTotal, setFinalTotal] = useState(props.currentTotal - props.pointsAdded);
    const [points, setPoints] = useState(props.pointsAdded);

    async function playAudio() {
      const { sound } = await Audio.Sound.createAsync(require('../assets/correct.wav'));
      await sound.playAsync();
    }

    useEffect(() => {
      let pt = props.pointsAdded;
      playAudio();
      setTimeout(() => {
        tmr = setInterval(() => {
          if (pt > 0) {
            pt -= 1;
            setFinalTotal(props.currentTotal - pt);
            setPoints(pt);
          } else {
            clearInterval(tmr);
          }
        }, 25);
      }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.yesText}>
                you're right!
            </Text>
            {(props.specialMsg === true) &&
            <Text style={styles.specialText}>
                x2 points awarded!
            </Text>
            }
            <View style={styles.backGround}>
              <Text style={styles.subText}>
                  {props.citation}
              </Text>
            <Text style={styles.text}>
                {props.verse}
            </Text>
            </View>
            <View style={styles.bottomBar}>
            <Text style={styles.scoreText}>
                {(points > 0) && <Text style={styles.bigScoreText}>{points}</Text>} Score: {finalTotal}
            </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomBar: {
    width: Dimensions.get('screen').width * 0.7,
    height: 128,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: 'auto'
  },
  backGround: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#EFEFEF'
  },
  yesText: {
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
  bigScoreText: {
    fontSize: 64,
    fontFamily: 'Taviraj_600SemiBold_Italic'
  },
  specialText: {
    fontSize: 80,
    textAlign: 'center',
    fontFamily: 'BungeeShade_400Regular'
  },
  text: {
    fontSize: 25,
    fontFamily: 'Taviraj_400Regular'
  },
});

export default YesCard;