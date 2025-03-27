import React from 'react'
import { Colors } from '~/constants/Colors'
import { Link, Stack } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Lỗi 404' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Không tìm thấy trang này.</Text>
        <Link href="/" style={[styles.link, styles.title]}>
          Về trang chủ!
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: Colors.light.textLink,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
