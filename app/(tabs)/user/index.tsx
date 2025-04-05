import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Link } from 'expo-router';
import { useRouter } from 'expo-router'


export default function TabTwoScreen() {
  const router = useRouter()

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Chào mừng đến với ứng dụng</Text>
        {/*đăng nhập*/}
        <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/user/log-in')} // This will work after moving files
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/user/register')} // This will work after moving files
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Link href="/user/create-business" style={styles.buttonText}>
            Tạo doanh nghiệp
          </Link>
        </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});