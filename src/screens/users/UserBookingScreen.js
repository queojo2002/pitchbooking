import React, { useEffect } from 'react';
import { Alert, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SharedElement } from 'react-navigation-shared-element';



export default function UserBookingScreen({ navigation, route }) {

    const { item } = route.params;




    return (
        <View style={{ flex: 1 }}>

            <View style={{ flex: 1 }} >
                <ImageBackground
                    source={{ uri: item.imageURL }}
                    style={{
                        alignSelf: 'center',
                        width: '100%',
                        height: 200,
                        resizeMode: "cover"
                    }}
                >
                    <View style={{
                        backgroundColor: 'rgba(193, 193, 193, 0.1)',
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }} />
                </ImageBackground>

                <View style={{
                    position: 'absolute',
                    top: StatusBar.currentHeight + 5,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                }}>
                    <TouchableOpacity
                        style={{
                            left: 10,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'transparent',
                            backgroundColor: 'rgba(193, 193, 193, 0.5)',
                            shadowColor: '#2D2D2D',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 3,
                            elevation: 50,
                        }}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <IconButton icon="arrow-left" size={20} iconColor='white' style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            right: 10,
                            borderRadius: 50,
                            borderWidth: 1,
                            borderColor: 'transparent',
                            backgroundColor: 'rgba(193, 193, 193, 0.5)',
                            shadowColor: '#2D2D2D',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 3,
                            elevation: 50,
                        }}
                        onPress={() => {
                            Alert.alert('Booking', 'Chia sẽ cho tui đi nào!')
                        }}>
                        <IconButton icon="share" size={20} iconColor='white' style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                flex: 1,
                marginTop: StatusBar.currentHeight + 150,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: "white",
                position: 'absolute',
                width: '100%',
                height: '100%',
                padding: 15
            }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text><Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                    <Text>adsasadsadd</Text>
                </ScrollView>
            </View>
        </View>
    );
}