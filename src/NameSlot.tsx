import React, { useState } from 'react';

import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal, ScrollView } from 'react-native';
import ImageBank from './ImageBank';


function NameSlot(props: {name: string, onChangeName: (s: string) => void, image: number, onChangeImage: (n: number) => void, deleteIndex: () => void}) {

  const [modal, showModal] = useState(false);
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.imageButtonStyle} onPress={() => {
              showModal(true);
            }}>
              <Image style={styles.contain} source={ImageBank[props.image]} />
            </TouchableOpacity>
            <View style={{width: Dimensions.get('window').width * 0.5}}>
          <TextInput style={styles.textInput} autoCapitalize='words' placeholder='Enter Name' placeholderTextColor='gray' value={props.name} onChangeText={props.onChangeName} />
            </View>
            <TouchableOpacity style={styles.endButton} onPress={props.deleteIndex}>
                <Text style={styles.endButtonText}>
                    -
                </Text>
            </TouchableOpacity>
        <Modal visible={modal}>
          <ScrollView>
            <Text style={styles.modalText}>
                Please Select
              </Text>
            <View style={styles.modalContainer}>
              {ImageBank.map((img, index) => <TouchableOpacity key={`img-${index}`}
                onPress={() => {
                  props.onChangeImage(index);
                  showModal(false);
                }}
              >
                <Image source={img} style={styles.imageContainer}/>
                </TouchableOpacity>)}
            </View>
          </ScrollView>
        </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageButtonStyle: {
    marginLeft: 10
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.15,
    aspectRatio: 1,
    padding: 10,
    margin: 5,
    borderColor: 'brown',
    borderWidth: 2,
    resizeMode: 'contain',
  },
  contain: {
    width: Dimensions.get('window').width * 0.12,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  textInput: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'cursive',
    marginHorizontal: 5,
  },
  endButtonText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  modalText: {
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'CedarvilleCursive_400Regular',
  },
  endButton: {
    width: 64,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#FF7276',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NameSlot;