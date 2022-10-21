import React, { useEffect, useState } from 'react';

import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RootStackParamList from './RootStackParamList';
import { StackScreenProps } from '@react-navigation/stack';


const image = { uri: require('../assets/bg.jpg') };


type Props = StackScreenProps<RootStackParamList, 'Title'>;
function TitlePage({ route, navigation }: Props) {

    
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.roundedContainer}>
                    <Text style={styles.text}>
                        cedar laundry
                    </Text>
                    <TouchableOpacity style={styles.bottomButton} onPress={() => {
                        navigation.navigate('Home');
                    }}>
                        <Text style={styles.text}>
                            begin
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
    textAlign: 'center',
    fontSize: Dimensions.get('window').width * 0.05,
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  bottomButton: {
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    padding: 50,
    backgroundColor: '#F6E1D3'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TitlePage;