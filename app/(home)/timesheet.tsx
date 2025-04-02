import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { Colors } from '~/constants/Colors'

export default function Timesheet() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Appbar.Header statusBarHeight={0} dark={false} style={styles.appbar}>
        <Appbar.BackAction color="#000" onPress={() => router.back()} />
        <Appbar.Content title="Chấm công" titleStyle={{ color: '#000' }} />
      </Appbar.Header>

      <Text style={styles.title}>TRANG CHẤM CÔNG</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: Colors.light.background,
    color: '#000',
  },
  appbarContent: {
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
})
