import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'
import React from 'react'

export default function Profile() {

  // function to logout the user on profile tab
  const logout = async () => {
    try{
      const res = await fetch('http://192.168.2.32:5000/clear_cookies')
      const data = await res.json()
      console.log(data)
      router.replace('/sign-in')
    }catch(e){
      console.log('Error:', e)
    }
  }

  // function to get cookies from the server for testing
  const getcookie = async () => {
    try{
      const res = await fetch('http://192.168.2.32:5000/get_cookies')
      const data = await res.json()
      console.log(data)
    }catch(e){
      console.log('Error:', e)
    }
  }

  return (
    <View className="items-center justify-center h-full">
      <Text>home</Text>
      <Button onPress={logout} title="Log Out"/>
      <Button onPress={getcookie} title="get cookies"/>
    </View>
  )
}