import { View, Text, SafeAreaView } from 'react-native'
import { useState } from 'react'

export default function AI () {
  const [selected, setSelected] = useState('');

  return (
    <SafeAreaView className="bg-primary h-full">
      
      <Text className='text-white'>AI</Text>

    </SafeAreaView>
  )
}