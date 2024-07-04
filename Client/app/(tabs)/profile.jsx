import { View, Text, Button, SafeAreaView, ScrollView } from 'react-native'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import CustomButton from '../../components/custombutton.jsx'
import { IP_ADDRESS } from '@env';

export default function Profile() {
  const { user, username, email, properties, dateCreated, isLoggedIn, setIsLoggedIn } = useGlobalContext();

  // function to logout the user on profile tab
  const logout = async () => {
    try{
      const res = await fetch(IP_ADDRESS + 'clear_cookies')
      const data = await res.json()
      setIsLoggedIn(false)
      router.replace('/sign-in')
    }catch(e){
      console.log('Error:', e)
    }
  }

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
          <Text className='text-white'>Joined in {getMonthName(dateCreated.month)} {dateCreated.year}</Text>

          <Button title="Edit Profile" onPress={editSubmit}/>

          {/* button for logout */}
          <Button onPress={logout} title="Logout"/>
          <Button onPress={getuid} title="get uid"/>
          <Button onPress={getUserInfo} title="get userinfo"/>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}