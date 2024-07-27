import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import { router } from 'expo-router'
import { IP_ADDRESS } from '@env';
import React from 'react'

export default function Home () {
  const { properties, workoutStarted, setWorkoutStarted, startTimer } = useGlobalContext();

  // go to workout tracker
  function startWorkout() {
    if(workoutStarted === false){
      startTimer()
      setWorkoutStarted(true)
    }

    router.push('/workouts/workout-tracker')
  }

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full">

        {/* Welcome text */}
        <View className='mx-6 mt-12 mb-8'>
          <Text className='text-white font-pregular text-base'>Welcome <Text className="font-pbold">{properties.name}</Text></Text>
        </View>

        {/* buttons at the top */}
        <View className="flex-row w-full space-x-4 justify-between mb-20">
          <TouchableOpacity className="flex-1 bg-secondary py-5 ml-4 rounded-3xl items-center" onPress={() => startWorkout()}>
            <Text className="text-primary text-base font-psemibold">Start Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-secondary py-5 mr-4 rounded-3xl items-center" onPress={() => console.log("Meals List Works")}>
            <Text className="text-primar text-base font-psemibold">Food Tracker</Text>
          </TouchableOpacity>
          
        </View>

        <View className='mx-6'>
          <Text className='text-white'>test</Text>
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}