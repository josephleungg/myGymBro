import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { router } from 'expo-router'
import images from '../../../helper/images.js'
import icons from '../../../helper/icons.js'
import React from 'react'

export default function WorkoutPage() {
    const { workout } = useLocalSearchParams()
    const workoutArray = JSON.parse(workout);

    // formatting workout duration
    const workoutDate = new Date(workoutArray[3]);
    const hours = Math.floor(workoutArray[2] / 3600)
    const minutes = Math.floor((workoutArray[2] % 3600) / 60).toString().padStart(2, '0');
    const remainingSeconds = (workoutArray[2] % 60).toString().padStart(2, '0');

    return (
        <SafeAreaView className="bg-primary">
            <ScrollView className="h-full px-6 py-4">

                {/* back button */}
                <View className="flex-row">
                    <TouchableOpacity onPress={() => router.back()} className="flex-1">
                        <Image 
                            className="h-4 w-6"
                            source={images.backArrow}
                        />
                    </TouchableOpacity>
                </View>

                {/* workout name */}
                <View className="items-center pt-2">
                    <Text className="text-white font-psemibold text-lg">{workoutArray[0] ? workoutArray[0] : "Untitled Workout"}</Text>
                    <Text className="text-gray-100 font-pregular text-sm">{workoutDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                    <Text className="text-gray-100 font-pregular">{hours}:{minutes}:{remainingSeconds}</Text>
                </View>

                {/* workout description */}
                <View className="pt-4 pb-8">
                    <Text className="text-white font-pregular text-base pb-2">{workoutArray[1] ? (workoutArray[1].length > 256 ? (workoutArray[1].slice(0, 256) + "...") : (workoutArray[1])) : ("No description available")}</Text>
                </View>

                <Text className="text-gray-100 font-pregular text-sm">Exercises</Text>

                {/* Showing all exercises in workouts */}
                <View className="mt-2">
                    {workoutArray.slice(4).length === 0 && (
                        <Text className="text-white font-regular text-base">No Exercises In This Workout!</Text>
                    )}
                    {workoutArray.slice(4).map((exercise, index) => {
                        return (
                            <View key={index} className="pb-6">
                                {/* Image and exercise name */}
                                <View className="flex-row pb-4">
                                    <Image 
                                        className="h-12 w-12 rounded-full bg-white"
                                        source={icons[exercise.equipment]}
                                    />

                                    <View className="ml-2 justify-center">
                                        <Text className="text-secondary font-pregular text-base">{exercise["name"]}</Text>
                                        <Text className="text-gray-100 font-pregular text-sm">{exercise["equipment"]}</Text>
                                    </View>
                                </View>

                                {/* Sets + Weight and Reps */}
                                <View className="flex-row pl-2 pb-6">
                                    <Text className="text-gray-100 font-pregular text-base flex-1">Set</Text>
                                    <Text className="text-gray-100 font-pregular text-base">Reps & Weight</Text>
                                </View>

                                {/* Displaying all sets, weight and reps */}
                                {exercise.sets.map((set, i) => {
                                    return (
                                        <View key={i} className="flex-row pl-2 pb-2">
                                            <Text className="text-white font-pregular text-base flex-1">{i + 1}</Text>
                                            <Text className="text-white font-pregular text-base">{set} Reps @ {exercise.weight[i]} LBS</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    })}
                </View>

                {/* Debugging */}
                {/* <TouchableOpacity className="bg-secondary py-5 ml-4 rounded-3xl items-center" onPress={() => console.log(workoutArray)}>
                    <Text className="text-primary text-base font-psemibold">Show workout</Text>
                </TouchableOpacity> */}

            </ScrollView>
        </SafeAreaView>
    )
}