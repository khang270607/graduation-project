import React from 'react'
import { Stack } from 'expo-router'

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="create-business" />
      <Stack.Screen name="add-region" />
      <Stack.Screen name="add-branch" />
      <Stack.Screen name="add-position" />
      <Stack.Screen name="add-department" />
      <Stack.Screen name="log-in" options={{ title: 'Đăng nhập' }} />
      <Stack.Screen name="register" options={{ title: 'Đăng ký' }} />
    </Stack>
  )
}
