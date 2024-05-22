import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/logo123.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    marginBottom: 8,
  },
})
