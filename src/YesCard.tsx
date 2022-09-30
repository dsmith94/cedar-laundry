import React, {useState, useEffect} from 'react';

import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Player from './Player';
import PlayerTile from './PlayerTile';


let tmr: any = null;

function YesCard(props: {player: Player, citation: string, verse: string, pointsAdded: number, currentTotal: number}) {

    const [finalTotal, setFinalTotal] = useState(props.currentTotal - props.pointsAdded);
    const [points, setPoints] = useState(props.pointsAdded);

    useEffect(() => {
      let pt = props.pointsAdded;
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
                You're Right!
            </Text>
            <PlayerTile player={props.player} />
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
    width: Dimensions.get('screen').width * 0.7,
    height: Dimensions.get('screen').height * 0.7,
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
  text: {
    fontSize: 25,
    fontFamily: 'Taviraj_400Regular'
  },
});

export default YesCard;