import { View, Text, SafeAreaView, TouchableOpacity, Touchable } from 'react-native'
import { useState } from 'react'
import CustomChart from '../../components/customchart.jsx'

export default function AI () {
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

    </SafeAreaView>
  )
}