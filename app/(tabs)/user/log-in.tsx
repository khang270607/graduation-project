import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

import LoginScreen from './components/Log-in'

export default function LoginPage() {
    const router = useRouter()

    return (
        <>
            <LoginScreen />
        </>
    )
}

