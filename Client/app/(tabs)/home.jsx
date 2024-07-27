import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Touchable } from 'react-native'
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
        <View className="flex-row w-full space-x-4 justify-between mb-16">
          <TouchableOpacity className="flex-1 bg-secondary py-5 ml-4 rounded-3xl items-center" onPress={() => startWorkout()}>
            <Text className="text-primary text-base font-psemibold">Start Workout</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-secondary py-5 mr-4 rounded-3xl items-center" onPress={() => console.log("Meals List Works")}>
            <Text className="text-primar text-base font-psemibold">Food Tracker</Text>
          </TouchableOpacity>

        </View>

        {/* Displaying workouts that the user has saved */}
        <View className="px-6">
        {properties.daysAtGym.length === 0 
        ? 
          <View>
            <Text className="text-white font-psemibold text-base">Start Your First Workout!</Text>
          </View>
        :
        properties.daysAtGym.slice(0,4).map((workout, index) => {
          // constants for displaying workout info
          const workoutDate = new Date(workout[3]);
          const hours = Math.floor(workout[2] / 3600)
          const minutes = Math.floor((workout[2] % 3600) / 60).toString().padStart(2, '0');
          const remainingSeconds = (workout[2] % 60).toString().padStart(2, '0');

          return (
            <View key={index} className="flex-col pb-16">
              {/* 1st row */}
              <View className="flex-row">
                <Text className="text-white font-psemibold text-lg flex-1">{workout[0] === "" ? "No Name Workout" : workout[0]}</Text>
                
              </View>

              {/* 2nd row */}
              <View className="flex-row">
                <Text className="text-gray-100 font-pregular text-sm flex-1">{workoutDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                <Text className="text-gray-100 font-pregular text-sm">{hours}:{minutes}:{remainingSeconds}</Text>
              </View>
              
              {/* more details */}
              <TouchableOpacity className="items-center pt-6" onPress={() => console.log("More details works")}>
                <Text className="text-white font-psemibold">More Details</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {properties.daysAtGym.length > 0 && (
          <TouchableOpacity className="self-center bg-[#e2e2f7] py-3 px-4 rounded-3xl" onPress={() => router.push('/trackers')}>
            <Text className="text-black font-psemibold text-base">View More</Text>
          </TouchableOpacity>
        )}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}