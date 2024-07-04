import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native'
import { Link, router } from 'expo-router'
import React, { useState } from 'react'

export default function EditProfile() {

  const saveSubmit = () => {
    router.replace('/profile')
  }

  const cancelSubmit = () => {
    router.replace('/profile')
  }

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full p-6">

        {/* Header */}
        <View className='items-center'>
          <Text className="text-white font-pmedium text-base">Edit Profile</Text>
        </View>

        {/* Change Profile Fields */}
        <View className='py-8'>
          <Text className="text-white">testing</Text>
        </View>

        {/* Buttons Section */}
        <View className="justify-center space-x-6 flex-row">

          {/* save button */}
          <TouchableOpacity className="bg-green-400 px-4 py-2 rounded-xl" onPress={saveSubmit}>
            <Text className="text-black font-pmedium">Save</Text>
          </TouchableOpacity>

          {/* cancel button */}
          <TouchableOpacity className="bg-red-400 px-2 py-2 rounded-xl" onPress={cancelSubmit}>
            <Text className="text-black font-pmedium">Cancel</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}