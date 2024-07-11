import { View, Text, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import CustomButton from '../../components/custombutton.jsx'
import { IP_ADDRESS } from '@env';

export default function Profile() {
  const { user, username, email, properties, dateCreated, isLoggedIn, setIsLoggedIn, isUpdated, setIsUpdated } = useGlobalContext();

  // function to logout the user on profile tab
  const logout = async () => {
    try {
      // Ensure IP_ADDRESS is correctly formatted
      const res = await fetch(IP_ADDRESS + 'clear_cookies', { method: 'GET' }); // Assuming it's a POST request
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setIsLoggedIn(false);
      router.replace('/sign-in');
    } catch (e) {
      console.log('Error:', e);
    }
  };

  // function to edit profile
  const editSubmit = async () => {
    router.replace('/editprofile')
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

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full">
      
        <View className='items-center pt-20'>
          <Text className='text-white'>{username}</Text>
          <Text className='text-white pb-4'>Joined in {getMonthName(dateCreated.month)} {dateCreated.year}</Text>

          <TouchableOpacity className="bg-gray-700 px-6 py-2 rounded-md" onPress={editSubmit}>
            <Text className="text-slate-100 font-pmedium">Edit Profile</Text>
          </TouchableOpacity>
          
          {/* button for logout */}
          <TouchableOpacity className="bg-red-400 px-2 py-2 rounded-xl" onPress={logout}>
            <Text className="text-black font-pmedium">Logout</Text>
          </TouchableOpacity>

          {/* BUTTONS USED FOR DEBUGGING, UNCOMMENT TO CONSOLE LOG USER INFO */}
          {/* <Button onPress={getuid} title="get uid"/>
          <Button onPress={getUserInfo} title="get userinfo"/> */}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}