import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { appColor } from '../../constants/appColor';

class UserNotificationScreen extends Component {

    render() {
        const data = [
            {
                id:'001',
                title:'@@@@',
                img:'https://reactnative.dev/img/tiny_logo.png',
                username:'David',
                nofitication:'sent a photo, please check your message',
                time: "'1966-07-30' , '08:30:00'",
            },
            {
                id:'002',
                title:'@@@@',
                img:'https://reactnative.dev/img/tiny_logo.png',
                username:'Tom',
                nofitication:'ashud usdh dhasd asdhaj sjd ashdj sj ajsd  adj jnđs djasđ án  nlsdaj',
                time: "'1966-07-30' , '08:30:00'",
            }
        ]
        return (
            <View style={{flex: 1, backgroundColor: appColor.lightBlue}}>
                <FlatList
                    data={data}
                    keyExtractor={(item,index) => index.toString()}
                    renderItem={({item}) => (
                        <View style={styles.container}>
                            <View style={styles.headerleftimgview}>
                                <Image style={styles.headerleftimg} source={{uri: item.img}}/>
                            </View>
                            <View style={{flexDirection: "row"}}>
                            <View style={{flexDirection: "co"}}>
                                <Text style={{color: "#fff", fontSize: 15, fontWeight: 'bold',marginLeft: 10}}>{item.username} </Text>

                                <Text style={{color: "#fff",fontWeight: 'normal', fontSize: 15, marginLeft: 10, marginRight: 40}}>{item.nofitication}</Text>
                            </View>            
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
}

export default UserNotificationScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: appColor.lightBlue,
    },
    headerleftimg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    headerleftimgview: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
    }
});
