import { View, Text, SafeAreaView, TouchableOpacity, Touchable } from 'react-native'
import { useState } from 'react'
import CustomChart from '../../components/customchart.jsx'
import { useGlobalContext } from '../../context/GlobalProvider.js';

export default function AI () {
  const { user, properties, setProperties, workoutStarted, setWorkoutStarted } = useGlobalContext();
  const [count, setCount] = useState(0)

  return (
    <SafeAreaView className="bg-primary h-full">
      
      {/* <CustomChart /> */}
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text className="text-white">Count Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log(count)}>
        <Text className="text-white">{count}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log(properties)}>
        <Text className="text-white">test properties</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}