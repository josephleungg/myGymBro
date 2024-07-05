import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { Link, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import FormField from '../../components/formfield.jsx'
import React, { useState } from 'react'

export default function EditProfile() {
  const { user, username, properties, isUpdated, setIsUpdated } = useGlobalContext();
  const [ updatedProperties, setUpdatedProperties] = useState({})

  // button functions
  const saveSubmit = () => {
    router.replace('/profile')
  }

  const cancelSubmit = () => {
    setUpdatedProperties({})
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

        <FormField 
              title="Name"
              placeholder={properties.name !== "" ? properties.name : "Enter your name"}
              value={updatedProperties.name}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, name: e})}
              otherStyles="mt-7"
        />

        <FormField 
              title="Age"
              placeholder={properties.age !== 0 ? properties.age : "Enter your age"}
              value={updatedProperties.age}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, age: e})}
              otherStyles="mt-7"
              keyboardType="numeric"
        />

        <FormField 
              title="Bio"
              placeholder={properties.bio !== "" ? properties.bio : "Enter your bio"}
              value={updatedProperties.bio}
              handleChangeText={(e) => setUpdatedProperties({...updatedProperties, bio: e})}
              otherStyles="mt-7"
        />

        {/* Buttons Section */}
        <View className="justify-center space-x-6 flex-row mt-7">

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