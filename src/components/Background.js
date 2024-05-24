import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, KeyboardAvoidingView,Text } from 'react-native';
import Slides from './Slides';
import { appColor } from '../constants/appColor';

export default function Background({ children }) {
  
  return (

    <View style={styles.wrapper}>
      <Text style={{backgroundColor: appColor.blackblue,height: '100%'}}></Text>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: 80,
    bottom: 0,
    backgroundColor: "#ffff",
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 35,
    borderTopStartRadius: 35,
  },
});
