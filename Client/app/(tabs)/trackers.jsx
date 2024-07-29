import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import { router } from 'expo-router'
import { IP_ADDRESS } from '@env';

export default function Trackers() {
  const { properties } = useGlobalContext();
  const [ showWorkouts, setShowWorkouts ] = useState(null);

  function isSelectedWorkouts() {
    if(showWorkouts === null) {
      setShowWorkouts(true);
    } else if (showWorkouts === false) {
      setShowWorkouts(true);
    }
  }

  function isSelectedMeals() {
    if(showWorkouts === null) {
      setShowWorkouts(true);
    } else if (showWorkouts === true) {
      setShowWorkouts(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="p-6">

        {/* header */}
        <View className="items-center pb-6">
          <Text className="text-white text-lg font-psemibold">Trackers</Text>
          <Text className="text-gray-100 text-base font-pregular">Check your history</Text>
        </View>

        {/* buttons */}
        <View className="flex-row space-x-4">
          <TouchableOpacity className="flex-1 bg-secondary py-5 rounded-3xl items-center" onPress={() => isSelectedWorkouts()}>
            <Text className="text-black font-psemibold text-lg">Workouts</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-secondary py-5 rounded-3xl items-center" onPress={() => isSelectedMeals()}>
            <Text className="text-black font-psemibold text-lg">Meals</Text>
          </TouchableOpacity>
        </View>

        <View className="pt-10">
          {(showWorkouts && properties.daysAtGym.length > 0) && 
            <Text className="text-gray-100 font-psemibold text-base pb-6">{properties.daysAtGym.length} Workouts Completed</Text>}
          {showWorkouts ? 
            (properties.daysAtGym.length === 0 
              ? 
                <View>
                  <Text className="text-white font-psemibold text-base">No Previous Workouts Found!</Text>
                </View>
              :
              // Displaying the last 4 workouts
              properties.daysAtGym.map((workout, index) => {
                // constants for displaying workout info
                const workoutDate = new Date(workout[3]);
                const hours = Math.floor(workout[2] / 3600)
                const minutes = Math.floor((workout[2] % 3600) / 60).toString().padStart(2, '0');
                const remainingSeconds = (workout[2] % 60).toString().padStart(2, '0');
      
                return (
                  <View key={index} className="flex-col pb-16">
                    {/* 1st row */}
                    <View className="flex-row">
                      <Text className="text-white font-psemibold text-lg flex-1">{workout[0] === "" ? "Untitled Workout" : workout[0]}</Text>
                      
                    </View>
      
                    {/* 2nd row */}
                    <View className="flex-row">
                      <Text className="text-gray-100 font-pregular text-sm flex-1">{workoutDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                      <Text className="text-gray-100 font-pregular text-sm">{hours}:{minutes}:{remainingSeconds}</Text>
                    </View>
                    
                    {/* more details */}
                    <TouchableOpacity className="items-center pt-6" onPress={() => router.push({ pathname: "/workouts/[id]", params: { workout: JSON.stringify(workout) }})}>
                      <Text className="text-secondary font-psemibold">More Details</Text>
                    </TouchableOpacity>
                  </View>
                );
            }))
          : 
          showWorkouts === false ?
            <View className="">
              <Text className="text-white font-psemibold text-lg">Meals</Text>
              <Text className="text-gray-100 font-pregular text-base">Your meal history</Text>
            </View>
          :
            <></>
          }
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}