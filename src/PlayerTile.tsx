import React from 'react';

import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import Player from './Player';

import ImageBank from './ImageBank';


function PreviewCard(props: {player: Player}) {

    
    return (
        <View style={styles.container}>
            <Image style={styles.contain} source={ImageBank[props.player.image]} />
            <Text style={styles.text}>
                {props.player.name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contain: {
    width: Dimensions.get('window').width * 0.23,
    aspectRatio: 1,
    borderWidth: 4,
    borderColor: 'brown',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 1,
    resizeMode: 'contain',
  },
  text: {
    fontSize: Dimensions.get('window').width * 0.04,
    marginTop: 1,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
});

export default PreviewCard;