// components/Counter.js
import React from 'react'
import { View, Text, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { incremented, decremented } from '~/redux/counterSlice'

export default function Counter() {
  const count = useSelector(
    (state: { counter: { value: number } }) => state.counter.value,
  )
  const dispatch = useDispatch()

  return (
    <View>
      <Button title="+" onPress={() => dispatch(incremented())} />
      <Text>{count}</Text>
      <Button title="-" onPress={() => dispatch(decremented())} />
    </View>
  )
}
