import React, { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';


function PreviewCard(props: {book: string}) {

  async function playAudio() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/drum.wav'));
    await sound.playAsync();
  }

  useEffect(() => {
    playAudio();
  }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                next Scripture is in
            </Text>
            <Text style={styles.bookText}>
                {props.book.toUpperCase()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bookText: {
    fontSize: 64,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    fontFamily: 'Taviraj_600SemiBold_Italic',
    textAlign: 'center',
  },
});

export default PreviewCard;