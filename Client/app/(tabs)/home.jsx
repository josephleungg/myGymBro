import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import { router } from 'expo-router'
import { IP_ADDRESS } from '@env';
import React from 'react'

export default function Home () {
  const { user, username, email, properties, dateCreated, isLoggedIn, setIsLoggedIn, isUpdated, setIsUpdated } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full">

        {/* Welcome text */}
        <View className='mx-6 mt-12 mb-8'>
          <Text className='text-white font-pregular text-md'>Welcome {properties.name}</Text>
        </View>

        {/* buttons at the top */}
        <View className="flex-row w-full space-x-4 justify-between mb-20">
          <TouchableOpacity className="flex-1 bg-secondary py-5 ml-4 rounded-3xl items-center" onPress={() => console.log("Exercise List Works")}>
            <Text className="text-primary text-md font-psemibold">Workout Tracker</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-secondary py-5 mr-4 rounded-3xl items-center" onPress={() => console.log("Meals List Works")}>
            <Text className="text-primar text-md font-psemibold">Food Tracker</Text>
          </TouchableOpacity>
        </View>

        <View className='mx-6'>
          <Text className='text-white'>test</Text>
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}