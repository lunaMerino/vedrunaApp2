import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
const Button = ({ label, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    )
  
}

const styles = StyleSheet.create({
    button: {
        width: '40%',
        height: 40,
        backgroundColor: theme.colors.blackish,
        borderRadius: 8,
        borderWidth : 2,
        borderColor: theme.colors.green,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      buttonText: {
        color: theme.colors.lightGray,
        fontSize: 12,
        fontWeight: 'bold',
      },
});

export default Button;