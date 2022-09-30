import React from 'react';

import { StyleSheet, Text, View } from 'react-native';


function NoCard(props: {citation: string, verse: string, currentTotal: number}) {

    return (
        <View style={styles.container}>
            <Text style={styles.noText}>
                Sorry, Not Quite
            </Text>
            <View style={styles.backGround}>
              <Text style={styles.subText}>
                  {props.citation}
              </Text>
            <Text style={styles.text}>
                {props.verse}
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
  text: {
    fontSize: 25,
    fontFamily: 'Taviraj_400Regular'
  },
});

export default NoCard;