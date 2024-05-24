import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

export default Slides = () => {
    const images = [
        require('../assets/background1.jpg'),
        require('../assets/background2.jpg'),
        require('../assets/background4.jpg'),
    ];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <ImageBackground
            source={images[currentImageIndex]}
            resizeMode="cover"
            style={styles.background}
        />
    );
}
const styles = StyleSheet.create({
    background: {
      width: '100%',
      height: 150,
      borderRadius: 20,
    },
})
