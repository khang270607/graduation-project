import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import RegisterScreen from './components/Register'

export default function RegisterPage() {
    const router = useRouter()

    return (
        <>
            <RegisterScreen />
        </>
    )
}
