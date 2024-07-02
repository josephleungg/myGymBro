import { View, Text, Button, SafeAreaView } from 'react-native'
import { router } from 'expo-router'
import React, { useContext, useState, useEffect } from 'react'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import CustomButton from '../../components/custombutton.jsx'
import Config from 'react-native-config';

export default function Profile() {
  const { user, username, email, properties, dateCreated } = useGlobalContext();

  // function to logout the user on profile tab
  const logout = async () => {
    try{
      const res = await fetch(Config.IP_ADDRESS + 'clear_cookies')
      const data = await res.json()
      console.log(data)
      router.replace('/sign-in')
    }catch(e){
      console.log('Error:', e)
    }
  }

  // function to get user id from the server for testing
  const getuid = async () => {
    console.log(user)
  }

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const getMonthName = (monthNumber) => {
    // Subtract 1 to convert month number (1-12) to array index (0-11)
    return monthNames[monthNumber - 1];
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      
      <View className='items-center'>
        <Text className='text-white'>{username}</Text>
        <Text className='text-white'>Joined in {getMonthName(dateCreated.month)} {dateCreated.year}</Text>
        {/* button for logout */}
        <Button onPress={logout} title="Logout"/>
        <Button onPress={getuid} title="get uid"/>


      </View>
    </SafeAreaView>
  )
}