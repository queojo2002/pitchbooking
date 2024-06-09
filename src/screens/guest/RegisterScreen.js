import { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import { theme } from '../../core/theme';
import { ActivityIndicator, Text } from 'react-native-paper';
import { BackButton, Background, Header, Logo, TextInput, Button } from '../../components';
import { emailValidator, nameValidator, passwordValidator } from '../../helpers';
import { signUpUser } from '../../api/auth-api';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSignUpPressed = async () => {
        setLoading(true);
        setError('');

        const nameError = nameValidator(name.value);
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        confirmPasswordError = passwordValidator(confirmPassword.value);
        if (emailError || passwordError || nameError || confirmPasswordError) {
            setName({ ...name, error: nameError });
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
            setLoading(false);
            return;
        } else if (password.value !== confirmPassword.value || confirmPassword.value === '') {
            setConfirmPassword({ ...confirmPassword, error: 'Password and Confirm Password must be the same' });
            setLoading(false);
            return;
        }

        try {
            const result = await signUpUser({
                fullname: name.value,
                email: email.value,
                password: password.value,
            });
            if (result.status === 1) {
                Alert.alert('Thông báo', 'Bạn đã đăng ký thành công. Bây giờ bạn có thể đăng nhập vào hệ thống', [
                    {
                        text: 'OK',
                        onPress: () =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'LoginScreen' }],
                            }),
                    },
                ]);
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError(error.message);
        }

        setLoading(false);
    };

    return (
        <Background>
            <BackButton
                goBack={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }],
                    });
                }}
            />
            <Header>Đăng ký tài khoản</Header>
            <TextInput
                label="Họ và tên"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Email của bạn"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                label="Mật khẩu"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <TextInput
                label="Nhập lại mật khẩu"
                returnKeyType="done"
                value={confirmPassword.value}
                onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                error={!!confirmPassword.error}
                errorText={confirmPassword.error}
                secureTextEntry
            />

            {error ? <Text>{error}</Text> : null}

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button mode="contained" onPress={onSignUpPressed}>
                    Đăng ký
                </Button>
            )}

            <View style={styles.row}>
                <Text>Bạn đã có tài khoản rồi? </Text>
                <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                    <Text style={styles.link}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
        margin: 10,
    },
    link: {
        fontWeight: 'bold',
        color: 'orange',
        marginBottom: 30,
    },
});
