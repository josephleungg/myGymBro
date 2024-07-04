import { View, Text, Button, SafeAreaView } from 'react-native'
import { router } from 'expo-router'
import React from 'react'

export default function Home () {

  return (
    <SafeAreaView className="bg-primary h-full">
      
      <View className='items-center'>
        <Text className='text-white'>home</Text>
      </View>
      
    </SafeAreaView>
  )
}