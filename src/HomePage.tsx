import React, { useEffect, useState } from 'react';

import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RootStackParamList from './RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';
import { Audio } from 'expo-av';
import NameSlot from './NameSlot';
import Player from './Player';
import { useIsFocused } from '@react-navigation/native';


const image = { uri: require('../assets/bg.jpg') };


type Props = StackScreenProps<RootStackParamList, 'Home'>;
function HomePage({ route, navigation }: Props) {
  
    const [players, setPlayers] = useState([new Player()]);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    async function playAudio() {
      const { sound } = await Audio.Sound.createAsync(require('../assets/title.ogg'));
      setSound(sound);  
      await sound.playAsync();
    }


    async function playSoftAudio() {
      const { sound } = await Audio.Sound.createAsync(require('../assets/soft.wav'));
      await sound.playAsync();
    }


    async function playDrumAudio() {
      const { sound } = await Audio.Sound.createAsync(require('../assets/drum.wav'));
      await sound.playAsync();
    }

    if (useIsFocused()) {
      if (!sound) {
        playAudio();
      }
    }
    
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.roundedContainer}>
                    <Text style={styles.text}>
                        select contestants
                    </Text>
                    {players.map((v, index) => <NameSlot 
                        
                        name={v.name}

                        onChangeName={n => {
                            v.name = n;
                            setPlayers([...players]);
                        }}
                        image={v.image}
                        onChangeImage={n => {
                          v.image = n;
                          setPlayers([...players]);
                        }}
                        deleteIndex={() => {
                            playDrumAudio();
                            players.splice(index, 1);
                            setPlayers([...players]);
                        }}

                    />)}
                    {(players.length > 1) &&
                    <TouchableOpacity style={styles.bottomButton} onPress={() => {
                      if (sound) {
                        sound.stopAsync();
                        setSound(null);
                      }
                        navigation.navigate('Play', {players: players});
                    }}>
                        <Text style={styles.text}>
                            Start
                        </Text>
                    </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.endButton} onPress={() => {
                        const p = new Player();
                        p.image = Math.floor(Math.random() * 10);
                        playSoftAudio();
                        players.push(p);
                        setPlayers([...players]);
                    }}>
                        <Text style={styles.endButtonText}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundedContainer: {
    width: Dimensions.get('screen').width * 0.7,
    marginVertical: Dimensions.get('screen').height * 0.1,
    borderRadius: 20,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  bottomButton: {
    width: 128,
    height: 64,
    borderRadius: 20,
    marginHorizontal: (Dimensions.get('screen').width * 0.35) - 64,
    backgroundColor: '#F6E1D3'
  },
  endButtonText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  endButton: {
    width: 64,
    height: 64,
    borderRadius: 10,
    left: (Dimensions.get('screen').width * 0.7) - 64,
    backgroundColor: '#44D7A8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;