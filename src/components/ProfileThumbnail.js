import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default ProfileThumbnail = (props) => {

    const {
        name = 'Đức Anh',
        phone = '0326393540',
        avatar = "https://ui-avatars.com/api/?name="+name+"&size=128",
        textColor = 'black',
        onPress = null
    } = props;

    const colorStyle = {
        color: textColor,
    };
    const ImageComponent = onPress ? TouchableOpacity : View;

    return (
        <View style={styles.container}>
            <ImageComponent onPress={onPress}>
                <Image
                    source={{ uri: avatar, }}
                    style={styles.avatar}
                />
            </ImageComponent>

            {
                name !== '' && <Text style={[styles.name, colorStyle]}>{name}</Text>
            }
            {
                phone !== '' && (
                    <View style={styles.phoneSection}>
                        <Icon name="phone" size={16} style={{ color: textColor }} />
                        <Text style={[styles.phone, colorStyle]}>
                            {phone}
                        </Text>
                    </View>
                )
            }



        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    phone: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },

    phoneSection: {
        flexDirection: 'row',
        marginTop: 3,
        alignItems: "center",
        justifyContent: "center",
    },
});

