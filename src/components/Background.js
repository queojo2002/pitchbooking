import React, { useState, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Slides from './Slides'


export default function Background({ children }) {
  
  return (
    <View style={styles.wrapper}>
      <Slides />
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
  background: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  container: {
    position: 'absolute',
    top: 150,
    bottom: 0,
    backgroundColor: '#090021',
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
