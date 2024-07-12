import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { View, Text, SafeAreaView } from 'react-native'
import { useState } from 'react'

export default function AI () {
  const today = toDateId(new Date());
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <SafeAreaView className="bg-primary h-full">
      
      <Text>Selected date: {selectedDate}</Text>
      <Calendar
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        calendarMonthId={today}
        onCalendarDayPress={setSelectedDate}
      />
      
    </SafeAreaView>
  )
}