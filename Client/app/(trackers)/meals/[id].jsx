import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

export default function MealPage() {
    const { id } = useLocalSearchParams()
    return (
        <View className="h-full bg-primary items-center justify-center">
            <Text className="text-white">{id}</Text>
        </View>
    )
}