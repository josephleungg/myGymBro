import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { router } from 'expo-router'
import { IP_ADDRESS } from '@env';
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import images from "../../../helper/images.js"

export default function TrackMeal() {
  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full px-6">

        {/* header back button */}
        <View className="flex-row">
          <TouchableOpacity onPress={() => router.back()} className="flex-1 pr-4 py-4">
              <Image 
                  className="h-4 w-6"
                  source={images.backArrow}
              />
          </TouchableOpacity>

          {/* debug button */}
          <TouchableOpacity onPress={() => console.log("Test")}>
              <Text className="text-white">Show Button</Text>
          </TouchableOpacity>
        </View>

        

      </ScrollView>
    </SafeAreaView>
  )
}