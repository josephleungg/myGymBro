import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import { router } from 'expo-router'
import { IP_ADDRESS } from '@env';

export default function Trackers() {
  const { properties } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary h-full">
      
      <View className='items-center'>
        <Text className='text-white'>trackers</Text>
      </View>
      
    </SafeAreaView>
  )
}