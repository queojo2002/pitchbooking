import { ArrowRight2, InfoCircle, Logout, MessageQuestion, SecuritySafe, TableDocument } from 'iconsax-react-native';
import React, { Fragment, useEffect } from 'react';
import { Alert, Image, ScrollView, StyleSheet, TouchableHighlight, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { appColor } from '../../constants/appColor';
import { logout } from '../../redux/actions/authAction';
import { convertToInternationalFormat } from '../../helpers/convertToInternationalFormat';

const UserProfileScreen = ({ navigation }) => {
    const user = useSelector((state) => state.auth.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: appColor.blackblue,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
            headerTitle: () => <Text style={styles.headerTitle}>Thông tin cá nhân</Text>,
        });
    }, [dispatch, navigation]);

    return (
        <Fragment>
            {!user ? (
                // Hiển thị vòng xoay tải khi dữ liệu người dùng chưa có
                <ActivityIndicator animating={true} color={appColor.blackblue} size="large" style={{ flex: 1 }} />
            ) : (
                // Hiển thị chi tiết hồ sơ người dùng
                <View style={styles.container}>
                    <ScrollView style={styles.detailsSection}>
                        <TouchableHighlight
                            underlayColor="#f2f2f2"
                            onPress={() => navigation.navigate('UserProfileEditScreen')}
                        >
                            <View style={styles.containerInfo}>
                                <Image
                                    source={{
                                        uri:
                                            user.imageURL ||
                                            `https://ui-avatars.com/api/?name=${user.fullname}&size=128`,
                                    }}
                                    style={styles.avatar}
                                />
                                <View style={styles.detailName}>
                                    <Text style={styles.titleName}>{user.fullname}</Text>
                                    <Text style={styles.title}>{convertToInternationalFormat(user.phone)}</Text>
                                </View>
                                <ArrowRight2 size={20} style={styles.arrowIcon} />
                            </View>
                        </TouchableHighlight>

                        {/* Tùy chọn Mật khẩu và bảo mật */}
                        <TouchableHighlight
                            underlayColor="#f2f2f2"
                            onPress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}
                        >
                            <View style={styles.containerList}>
                                <SecuritySafe size={24} variant="Bulk" style={{ color: '#cc66ff', marginRight: 10 }} />
                                <View style={styles.details}>
                                    <Text style={styles.title}>Mật khẩu và bảo mật</Text>
                                </View>
                                <ArrowRight2 size={20} style={styles.arrowIcon} />
                            </View>
                        </TouchableHighlight>

                        {/* Tùy chọn Điều khoản và Quy định */}
                        <TouchableHighlight
                            underlayColor="#f2f2f2"
                            onPress={() => navigation.navigate('UserTermsAndConditionsScreen')}
                        >
                            <View style={styles.containerList}>
                                <TableDocument
                                    size={24}
                                    variant="Bulk"
                                    style={{ color: appColor.lightBlue, marginRight: 10 }}
                                />
                                <View style={styles.details}>
                                    <Text style={styles.title}>Điều khoản và Quy định</Text>
                                </View>
                                <ArrowRight2 size={20} style={styles.arrowIcon} />
                            </View>
                        </TouchableHighlight>

                        {/* Tùy chọn Giới thiệu */}
                        <TouchableHighlight
                            underlayColor="#f2f2f2"
                            onPress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}
                        >
                            <View style={styles.containerList}>
                                <InfoCircle size={24} variant="Bulk" style={{ color: '#70db70', marginRight: 10 }} />
                                <View style={styles.details}>
                                    <Text style={styles.title}>Giới thiệu</Text>
                                </View>
                                <ArrowRight2 size={20} style={styles.arrowIcon} />
                            </View>
                        </TouchableHighlight>

                        {/* Tùy chọn Câu hỏi thường gặp */}
                        <TouchableHighlight
                            underlayColor="#f2f2f2"
                            onPress={() => Alert.alert('Thông báo', 'Tính năng đang phát triển')}
                        >
                            <View style={styles.containerList}>
                                <MessageQuestion
                                    size={24}
                                    variant="Bulk"
                                    style={{ color: '#29a3a3', marginRight: 10 }}
                                />
                                <View style={styles.details}>
                                    <Text style={styles.title}>Câu hỏi thường gặp</Text>
                                </View>
                                <ArrowRight2 size={20} style={styles.arrowIcon} />
                            </View>
                        </TouchableHighlight>

                        {/* Tùy chọn Đăng xuất */}
                        <TouchableHighlight
                            underlayColor="#f2f2f2"
                            onPress={async () => {
                                await dispatch(logout());
                            }}
                        >
                            <View style={styles.containerList}>
                                <Logout variant="Bulk" size={24} style={styles.logoutIcon} />
                                <View style={styles.details}>
                                    <Text style={styles.title}>Đăng xuất</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
            )}
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detailsSection: {
        flex: 1,
        marginBottom: 50,
    },
    headerTitle: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    containerList: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingStart: 20,
        paddingVertical: 10,
        marginRight: 10,
        marginTop: 5,
        paddingBottom: 15,
        borderColor: '#cccccc',
        borderBottomWidth: 1,
    },
    containerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 10,
        marginLeft: 1,
        marginVertical: 5,
        borderColor: '#cccccc',
        borderBottomWidth: 1,
    },
    details: {
        flex: 1,
        justifyContent: 'center',

        paddingRight: 20,
    },
    detailName: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5,
    },
    title: {
        fontSize: 16,
        color: '#555',
    },
    titleName: {
        fontSize: 16,
        color: '#66a3ff',
        fontWeight: 'bold',
    },
    arrowIcon: {
        color: '#666666',
    },
    logoutIcon: {
        color: '#666666',
        marginRight: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 45,
        borderColor: 'white',
        borderWidth: 2,
    },
});

export default UserProfileScreen;
