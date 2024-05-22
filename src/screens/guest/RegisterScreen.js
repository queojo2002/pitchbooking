import { useState } from "react";
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { theme } from "../../core/theme";
import { ActivityIndicator, Text } from 'react-native-paper'
import { BackButton, Background, Header, Logo, TextInput, Button } from "../../components";
import { emailValidator, nameValidator } from "../../helpers";
import { signUpUser } from "../../api/auth-api";


export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUpPressed = async () => {
    setLoading(true);
    setError('');

    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setLoading(false)
      return
    }



    try {
      const result = await signUpUser({
        name: name.value,
        email: email.value,
        password: password.value
      })
      if (result.user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);


  }

  return (
    <Background>
      <BackButton goBack={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })
      }} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
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
        secureTextEntry
      />

      {error ? <Text>{error}</Text> : null}



      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24 }}
        >
          Sign Up
        </Button>
      )}


      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})