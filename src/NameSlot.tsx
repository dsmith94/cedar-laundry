import React, { useState } from 'react';

import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal, ScrollView } from 'react-native';
import ImageBank from './ImageBank';


function NameSlot(props: {name: string, onChangeName: (s: string) => void, image: number, onChangeImage: (n: number) => void, deleteIndex: () => void}) {

  const [modal, showModal] = useState(false);
    
    return (
        <View style={styles.container}>
            <TextInput style={styles.text} autoCapitalize='words' placeholder='Enter Name' placeholderTextColor='gray' value={props.name} onChangeText={props.onChangeName} />
            <TouchableOpacity onPress={() => {
              showModal(true);
            }}>
              <Image style={styles.contain} source={ImageBank[props.image]} />
            </TouchableOpacity>
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
    marginHorizontal: Dimensions.get('screen').width * 0.1,
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
  imageContainer: {
    width: 128,
    height: 128,
    padding: 10,
    margin: 5,
    borderColor: 'brown',
    borderWidth: 2,
    resizeMode: 'contain',
  },
  contain: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'cursive',
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
    height: 64,
    borderRadius: 10,
    backgroundColor: '#FF7276',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NameSlot;