import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import CustomCalendar from '../../components/customcalendar.jsx'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import { IP_ADDRESS } from '@env';
import pfp from '../../assets/icon.png'

export default function Profile() {
  const { user, username, email, properties, dateCreated, isLoggedIn, setIsLoggedIn, isUpdated, setIsUpdated, resetTimer, setWorkoutStarted, setSavedWorkoutDetails } = useGlobalContext();

  // function to logout the user on profile tab
  const logout = async () => {
    try {
      // Ensure IP_ADDRESS is correctly formatted
      const res = await fetch(IP_ADDRESS + 'clear_cookies', { method: 'GET' }); // Assuming it's a POST request
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Reset global context
      resetTimer()
      setWorkoutStarted(false)
      setSavedWorkoutDetails(["", "", 0, new Date()])
      setIsLoggedIn(false);
      router.replace('/sign-in');
    } catch (e) {
      console.log('Error:', e);
    }
  };

  // function to edit profile
  const editSubmit = async () => {
    router.push('/editprofile')
  }

  // function to get user id from the server for testing
  const getuid = async () => {
    console.log(user)
  }

  const getUserInfo = async () => {
    console.log(username)
    console.log(email)
    console.log(properties)
    console.log(dateCreated)
    setIsUpdated(!isUpdated)
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const getMonthName = (monthNumber) => {
    // Subtract 1 to convert month number (1-12) to array index (0-11)
    return monthNames[monthNumber - 1];
  }

  function bttnTest() {
    const test = ["test", "April 20 2024", {"id": "350983452", "sets": [6,8,10], "weight": [100, 120, 140]}, {"id": "350983452", "sets": [6,8,10], "weight": [190, 100, 160]}]

    console.log(test[2]["sets"])
  }

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full">

        <View className='items-center pt-20 pb-8'>
          
          <Image 
            source={pfp}
            className="w-[100px] h-[100px] rounded-full self-center"
          />

          <Text className='text-white font-psemibold pb-2 pt-2'>{username}</Text>
          <Text className='text-white font-pregular pb-10'>Joined in {getMonthName(dateCreated.month)} {dateCreated.year}</Text>
          
          {/* profile buttons */}
          <View className='pb-3'>
            <TouchableOpacity className="bg-secondary px-4 py-2 rounded-2xl" onPress={editSubmit}>
              <Text className="text-black font-pmedium">Edit Profile</Text>
            </TouchableOpacity>
          </View>
          
          {/* button for logout */}
          <View>
            <TouchableOpacity className="bg-red-500 px-7 py-2 rounded-2xl" onPress={logout}>
              <Text className="text-black font-pmedium">Logout</Text>
            </TouchableOpacity>
          </View>
          
          {/* BUTTONS USED FOR DEBUGGING, UNCOMMENT TO CONSOLE LOG USER INFO */}
          {/* <Button onPress={getuid} title="get uid"/>
          <Button onPress={getUserInfo} title="get userinfo"/> */}
        </View>

        {/* Main Section View */}
        <View>

          {/* List Buttons */}
          <View className="flex-row w-full space-x-4 justify-between">
              <TouchableOpacity className="flex-1 bg-[#2e2e48] py-5 ml-4 rounded-3xl items-center" onPress={() => router.push("/exercises/exercise-list")}>
                <Text className="text-white text-md font-psemibold">Exercise List</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 bg-[#2e2e48] py-5 mr-4 rounded-3xl items-center" onPress={() => router.push("/meals/meal-list")}>
                <Text className="text-white text-md font-psemibold">Meals List</Text>
              </TouchableOpacity>
          </View>
          
          {/* Calendar */}
          <View className="w-full my-10 px-4">
            {/* <Text className="text-white text-lg font-psemibold text-center">Calendar Coming Soon...</Text> */}
            <CustomCalendar />
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}