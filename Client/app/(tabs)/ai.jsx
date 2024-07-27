import { View, Text, SafeAreaView, TouchableOpacity, Touchable } from 'react-native'
import { useState } from 'react'
import CustomChart from '../../components/customchart.jsx'
import { useGlobalContext } from '../../context/GlobalProvider.js';

export default function AI () {
  const { user, properties, setProperties, workoutStarted, setWorkoutStarted, timerStarted, setTimerStarted, startTime, setStartTime, elapsedTime, setElapsedTime, startTimer, stopTimer, resetTimer } = useGlobalContext();
  const test = ["testname", "testDescription", 60, "April 20 2024", {"id": "1234", "sets": [0,1,2]}]
  const [count, setCount] = useState(0)

  return (
    <SafeAreaView className="bg-primary h-full">
      
      {/* <CustomChart /> */}
      {/* <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text className="text-white">Count Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log(count)}>
        <Text className="text-white">{count}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log(properties)}>
        <Text className="text-white">test properties</Text>
      </TouchableOpacity>

      <Text className="text-white text-lg font-pregular">{test[4].id}</Text> */}

      <TouchableOpacity onPress={startTimer}>
        <Text className="text-white">Start Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={stopTimer}>
        <Text className="text-white">Stop Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resetTimer}>
        <Text className="text-white">Reset Timer</Text>
      </TouchableOpacity>

      <Text className="text-white text-lg font-pregular">{Math.floor(elapsedTime / 1000)}</Text>

    </SafeAreaView>
  )
}