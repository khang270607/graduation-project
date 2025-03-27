import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

import Counter from '~/components/ExampleComponent'

export default function TabTwoScreen() {
  return (
    <>
      <Text style={styles.title}>TRANG LÀM VIỆC</Text>
      <Counter />
      <ActivityIndicator
        size="large"
        animating={true}
        color={MD2Colors.red800}
      />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
