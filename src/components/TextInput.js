import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';

export default function TextInput({ errorText = '', description = '', secureTextEntryProp = false, ...props }) {
  const [secureTextEntry, setSecureTextEntry] = useState(secureTextEntryProp);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          secureTextEntry={secureTextEntry}
          {...props}
        />
        {secureTextEntryProp && (
          <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.iconContainer}>
            <Text>{secureTextEntry ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  iconContainer: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
