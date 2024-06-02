import { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import IconButton from 'react-native-vector-icons/FontAwesome6';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../api/auth-api';
import { loadUser } from '../../api/user-api';
import { BackButton, Background, Button, Header, TextInput } from '../../components';
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../helpers';
import { loginSuccess, setAccessToken } from '../../redux/actions/authAction';

export default LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [loading, setLoading] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');

    const dispatch = useDispatch();

    const onLoginPressed = async () => {
        setLoading(true);

        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setLoading(false);
            return;
        }

        try {
            const login = await loginUser({ email: email.value.toLowerCase(), password: password.value });
            if (login.status === 0) {
                setErrorLogin(login.message);
                return;
            }
            await dispatch(
                setAccessToken({ accessToken: login.data.accessToken, refreshToken: login.data.refreshToken }),
            );
            const user = await loadUser();
            if (user.status === 1) {
                await dispatch(loginSuccess(user.data));
            } else {
                setErrorLogin(user.message);
            }
        } catch (error) {
            setErrorLogin(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        setEmail({ value: 'ducln339@gmail.com', error: '' });
        setPassword({ value: '123456789Duc@@', error: '' });
        /* setEmail({ value: "AnhTu080302@gmail.com", error: '' })
         setPassword({ value: "AnhTu$123", error: '' }) */
        if (errorLogin) {
            setErrorLogin('');
        }
    }, []);

    return (
        <Background>
            <BackButton
                goBack={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'OnboardingScreen' }],
                    });
                }}
            />
            <Header>Welcome back</Header>
            <TextInput
                label="Email"
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
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntryProp
            />
            {errorLogin ? <Text>{errorLogin}</Text> : null}
            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button mode="contained" onPress={onLoginPressed} style={{ backgroundcolor: 'red' }}>
                    Login
                </Button>
            )}
            <View style={styles.row}>
                <Text style={{ padding: 10 }}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <Button
                mode="contained"
                onPress={() => {
                    return Alert.alert('Thông báo', 'Chức năng đang phát triển');
                }}
                icon={() => {
                    return (
                        <IconButton name="google" color="#4285F4" size={20} onPress={() => console.log('Pressed')} />
                    );
                }}
                style={{
                    backgroundColor: '#F3F3F3',
                }}
            >
                <Text style={{ marginLeft: 25 }}>Login with Google</Text>
            </Button>

            <Button
                mode="contained"
                onPress={() => {
                    return Alert.alert('Thông báo', 'Chức năng đang phát triển');
                }}
                icon={() => {
                    return <IconButton name="phone" color="green" size={20} onPress={() => console.log('Pressed')} />;
                }}
                style={{
                    backgroundColor: '#F3F3F3',
                }}
            >
                <Text style={{ marginLeft: 25 }}>Login with Phone</Text>
            </Button>
        </Background>
    );
};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 5,
        color: '#ffff',
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
        padding: 10,
    },
});
