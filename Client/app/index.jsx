import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Text className="text-xl color-gray-100 font-plight">myGymBro</Text>
      <StatusBar style="auto" />
      <Link href="/home" className="color-blue-300 font-plight">Home</Link>
    </View>
  );
}