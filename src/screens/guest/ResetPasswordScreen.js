import { useState } from "react";
import { Alert, Text } from 'react-native';
import { BackButton, Background, Button, Header, Logo, TextInput } from "../../components";
import { emailValidator } from "../../helpers";
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from "react-native-paper";

export default ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const sendResetPasswordEmail = async () => {
    setError('')
    setLoading(true)
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      setLoading(false)
      return
    }
    try {
      await auth().sendPasswordResetEmail(email.value);
      Alert.alert(
        "Reset Password Email Sent",
        "Chúng tôi đã gửi một đường dẫn đến email của bạn. Vui lòng nhấn vào đó để có thể đặt lại mật khẩu.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('LoginScreen')
          }
        ]
      );
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Failed to send password reset email: ', error);
    }
    setLoading(false)
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button
          mode="contained"
          onPress={sendResetPasswordEmail}
          style={{ marginTop: 16 }}
        >
          Send Instructions
        </Button>
      )}


    </Background>
  )
}