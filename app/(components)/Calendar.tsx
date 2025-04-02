import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip'
import moment from 'moment'
import 'moment/locale/vi'

import { Typography } from '~/constants/Typography'
import { Colors } from '~/constants/Colors'
import { UI } from '~/constants/UI'

// Thiết lập locale tiếng Việt react-native-calendar-strip
moment.locale('vi')

export default function Header() {
  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        calendarHeaderFormat="MMM YYYY"
        style={styles.calendarStrip}
        selectedDate={moment()} // Active mặc định ngày hiện tại
        calendarColor={'#fff'}
        calendarHeaderStyle={{ color: '#000', fontSize: 14 }}
        dateNumberStyle={{ color: 'black', fontSize: 12 }} // Mặc định: màu đen
        dateNameStyle={{ color: 'black', fontSize: 12 }} // Mặc định: màu đen
        highlightDateNumberStyle={{
          color: Colors.light.primary,
          fontSize: 16,
          fontWeight: 'bold',
        }} // Khi active: màu green
        highlightDateNameStyle={{
          color: Colors.light.primary,
          fontSize: 16,
          fontWeight: 'bold',
        }} // Khi active: màu green
        iconContainer={{ flex: 0.1 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  calendarStrip: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: UI.borderRadius.large,
  },
  title: {
    fontSize: Typography.fontSize.large,
    fontWeight: 'bold',
    marginBottom: 5,
  },
})
