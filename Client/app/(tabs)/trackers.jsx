import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import { router } from 'expo-router'
import { IP_ADDRESS } from '@env';

export default function Trackers() {
  const { properties } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="p-4">

        <View className="items-center pb-8">
          <Text className="text-white text-lg font-psemibold">Trackers</Text>
        </View>

        <View className="flex-row space-x-4">
          <TouchableOpacity className="flex-1 bg-secondary py-5 rounded-3xl items-center" onPress={() => console.log("workouts")}>
            <Text className="text-black font-psemibold text-lg">Workouts</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-secondary py-5 rounded-3xl items-center" onPress={() => console.log("meals")}>
            <Text className="text-black font-psemibold text-lg">Meals</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}