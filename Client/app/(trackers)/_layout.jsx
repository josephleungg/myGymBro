import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function _layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="exercises/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="exercises/exercise-list" options={{ headerShown: false }} />
        <Stack.Screen name="exercises/create-exercise" options={{ headerShown: false }} />
        <Stack.Screen name="meals/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="meals/meal-list" options={{ headerShown: false }} />
        <Stack.Screen name="meals/create-meal" options={{ headerShown: false }} />
        <Stack.Screen name="workouts/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="workouts/past-workouts" options={{ headerShown: false }} />
      </Stack>

      {/* statusbar customization */}
      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  )
}