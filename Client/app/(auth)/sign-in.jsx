import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import images from '../../helper/images.js'
import React from 'react'

export default function SignIn() {
  return (

    <SafeAreaView className="bg-primary h-full">

        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="color-white">Sign In</Text>
        </View>

    </SafeAreaView>

  )
}