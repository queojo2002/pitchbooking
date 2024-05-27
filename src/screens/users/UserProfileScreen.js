import React, { Fragment, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableHighlight, View, Image } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { appColor } from '../../constants/appColor';
import { subscribeToUser } from '../../api/user-api';
import { logout, updateUsers } from '../../redux/actions/authAction';
import { TableDocument, ArrowRight2, Logout, SecuritySafe, InfoCircle, MessageQuestion } from 'iconsax-react-native';

const UserProfileScreen = ({ navigation }) => {
    const user = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        // Thiết lập các tùy chọn điều hướng cho màn hình
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
            headerTitle: () => (
                <Text style={styles.headerTitle}>
                    Thông tin cá nhân
                </Text>
            ),
        });

        // Đăng ký cập nhật dữ liệu người dùng
        const unsubscribe = subscribeToUser((res) => {
            if (res.error) {
                console.error("Error1", res.error);
            } else {
                dispatch(updateUsers({
                    ...res.data,
                    emailVerified: res.emailVerified,
                }));
            }
        });
        return () => unsubscribe();
    }, [dispatch, navigation]);

    // Chuyển đổi số điện thoại sang định dạng quốc tế
    const convertToInternationalFormat = (phoneNumber) => {
        if (!phoneNumber) return '';
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        if (cleaned.startsWith('0')) {
            return '+84' + cleaned.slice(1);
        }
        return '+84' + cleaned;
    };

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
                                    source={{ uri: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&size=128` }}
                                    style={styles.avatar}
                                />
                                <View style={styles.detailName}>
                                    <Text style={styles.titleName}>{user.name}</Text>
                                    <Text style={styles.title}>{convertToInternationalFormat(user.phone)}</Text>
                                </View>
                                <ArrowRight2 size={20} style={styles.arrowIcon} />
                            </View>
                        </TouchableHighlight>

                        {/* Tùy chọn Mật khẩu và bảo mật */}
                        <TouchableHighlight 
                            underlayColor="#f2f2f2"
                            onPress={() => navigation.navigate('')}
                        >
                            <View style={styles.containerList}>
                                <SecuritySafe size={24} variant="Bulk" style={{ color: "#cc66ff", marginRight: 20 }} />
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
                                <TableDocument size={24} variant="Bulk" style={{ color: appColor.lightBlue, marginRight: 20 }} />
                                <View style={styles.details}>
                                    <Text style={styles.title}>Điều khoản và Quy định</Text>
                                </View>
                                <ArrowRight2 size={20} style={styles.arrowIcon} />
                            </View>
                        </TouchableHighlight>

                        {/* Tùy chọn Giới thiệu */}
                        <TouchableHighlight 
                            underlayColor="#f2f2f2"
                            onPress={() => navigation.navigate('')}
                        >
                            <View style={styles.containerList}>
                                <InfoCircle size={24} variant="Bulk" style={{ color: "#70db70", marginRight: 20 }} />
                                <View style={styles.details}>
                                    <Text style={styles.title}>Giới thiệu</Text>
                                </View>
                                <ArrowRight2 size={20} style={styles.arrowIcon} />
                            </View>
                        </TouchableHighlight>

                        {/* Tùy chọn Câu hỏi thường gặp */}
                        <TouchableHighlight 
                            underlayColor="#f2f2f2"
                            onPress={() => navigation.navigate('')}
                        >
                            <View style={styles.containerList}>
                                <MessageQuestion size={24} variant="Bulk" style={{ color: "#29a3a3", marginRight: 20 }} />
                                <View style={styles.details}>
                                    <Text style={styles.title}>Câu hỏi thường gặp</Text>
                                </View>
                                <ArrowRight2 size={20} style={styles.arrowIcon} />
                            </View>
                        </TouchableHighlight>

                        {/* Tùy chọn Đăng xuất */}
                        <TouchableHighlight 
                            underlayColor="#f2f2f2"
                            onPress={async () => { await dispatch(logout()) }}
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
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 5,
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
        color: "#666666",
    },
    logoutIcon: {
        color: "#666666",
        marginRight: 20,
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
