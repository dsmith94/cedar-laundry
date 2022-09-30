import React from 'react';

import { Dimensions, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';


const image = [
    { uri: require('../assets/head1.png') }
];


function AvatarSelect(props: {avatar: string, onChangeAvatar: (s: string) => void}) {

    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => props.onChangeAvatar('')}>
                <Image resizeMode='stretch' source={image[0]} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 128,
    height: 128,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 126,
    height: 126,
    borderWidth: 3,
    borderColor: 'brown'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'cursive',
  },
  button: {
    flex: 1,
  }
});

export default AvatarSelect;