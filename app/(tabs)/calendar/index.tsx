import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useRouter } from 'expo-router'

export default function Index() {
  const router = useRouter()

  return <Text style={styles.title}>TRANG LỊCH</Text>
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: '#fff',
    color: '#000',
  },
  appbarContent: {
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
