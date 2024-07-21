import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { View, Text } from 'react-native'
import { useState } from 'react'

export default function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState(today);

  const today = toDateId(new Date());

  const linearTheme = {
    rowMonth: {
      content: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "700",
      },
    },
    rowWeek: {
      container: {
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255, 255, 255, 0.1)",
        borderStyle: "solid",
      },
    },
    itemWeekName: { content: { color: "rgba(255, 255, 255, 0.5)" } },
    itemDayContainer: {
      activeDayFiller: {
        backgroundColor: "#FF9C01",
      },
    },
    itemDay: {
      idle: ({ isPressed, isWeekend }) => ({
        container: {
          backgroundColor: isPressed ? "#FF9C01" : "transparent",
          borderRadius: 4,
        },
        content: {
          color: '#ffffff',
        },
      }),
      today: ({ isPressed }) => ({
        container: {
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: isPressed ? 4 : 30,
          backgroundColor: isPressed ? "#FF9C01" : "transparent",
        },
        content: {
          color: isPressed ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
        },
      }),
      active: ({ isEndOfRange, isStartOfRange }) => ({
        container: {
          backgroundColor: "#FF9C01",
          borderTopLeftRadius: isStartOfRange ? 4 : 0,
          borderBottomLeftRadius: isStartOfRange ? 4 : 0,
          borderTopRightRadius: isEndOfRange ? 4 : 0,
          borderBottomRightRadius: isEndOfRange ? 4 : 0,
        },
        content: {
          color: "#ffffff",
        },
      }),
    },
  };

  return (
    <View>
      <Calendar
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        calendarMonthId={today}
        onCalendarDayPress={setSelectedDate}
        theme={linearTheme}
      />
    </View>
  )
}
