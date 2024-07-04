import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="editprofile" options={{ headerShown: false }} />
      </Stack>

      {/* statusbar customization */}
      <StatusBar backgroundColor='#161622' style='light'/>
    </>
  );
}