import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { router } from 'expo-router'
import { useState, useEffect } from 'react';
import { IP_ADDRESS } from '@env';
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import icons from "../../../helper/icons.js"

export default function WorkoutTracker() {
    const { user, properties, setProperties, workoutStarted, setWorkoutStarted } = useGlobalContext();
    // workoutNotes: String
    // duration: Number of minutes
    // date: Date String
    //////////////
    // OBJECTS //
    // Exercise Object ID: Arrays of Object ID
    // sets: Array of number of reps per set
    // weight: Array of weight per set
    // ["testWorkout", "test", 60, "April 20 2024", 
    // {"id": "350983452", "sets": [6,8,10], "weight": [100, 120, 140], "date": [April 20 2024, April 20 2024, April 20 2024]}, 
    // {"id": "350983452", "sets": [6,8,10], "weight": [190, 100, 160], "date": [April 20 2024, April 20 2024, April 20 2024]}]
    const [ workoutDetails, setWorkoutDetails ] = useState(["", "", 0, new Date()]);

    // clear the current workout
    async function clearCurrentWorkout(){
        try{
            const res = await fetch(IP_ADDRESS + 'clear_current_workout', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        // if the user has a current workout and returns to the workout tracker page then set the workout details
        if(properties.currentWorkout.length > 0){
            setWorkoutDetails(properties.currentWorkout)
            clearCurrentWorkout()
            setProperties({...properties, currentWorkout: []})
        }

    })

    return (
        <SafeAreaView className="bg-primary">
            {/* basic checks incase the user accesses the route for this page */}
            {!workoutStarted ? (
                <View className="items-center justify-center h-full">
                    <Text className="text-white text-lg font-pregular">Workout is not started!</Text>
                </View>
            ) : (
                <ScrollView className="h-full">
                    <View>
                        <TouchableOpacity onPress={() => console.log(workoutStarted)}>
                            <Text className="text-white">Show Workout</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    )
}