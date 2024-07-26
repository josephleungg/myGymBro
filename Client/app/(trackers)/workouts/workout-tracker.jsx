import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useState, useEffect } from 'react';
import { IP_ADDRESS } from '@env';
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import CustomButton from "../../../components/custombutton.jsx"
import icons from "../../../helper/icons.js"
import images from "../../../helper/images.js"

export default function WorkoutTracker() {
    const { user, properties, setProperties, workoutStarted, setWorkoutStarted } = useGlobalContext();
    const { exerciseID, name, equipment } = useLocalSearchParams();
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
        if(workoutStarted && properties.currentWorkout.length > 0){
            setWorkoutDetails(properties.currentWorkout)
            clearCurrentWorkout()
            setProperties({...properties, currentWorkout: []})
        }

        console.log(exerciseID)
        console.log(name)
        console.log(equipment)
        // NEED TO APPEND THIS TO THE WORKOUT DETAILS ARRAY AS A NEW EXERCISE AND THEN FIGURE OUT A WAY TO INDEX THEM INDIVIDUALLY

    })

    return (
        <SafeAreaView className="bg-primary">
            {/* basic checks incase the user accesses the route for this page */}
            {!workoutStarted ? (
                <View className="items-center justify-center h-full">
                    <Text className="text-white text-lg font-pregular">Workout is not started!</Text>
                </View>
            ) : (
                <ScrollView className="h-full py-4 px-6">
                    {/* back button */}
                    <View>
                        {/* <TouchableOpacity onPress={() => console.log(workoutDetails)}>
                            <Text className="text-white">Show Button</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => router.navigate("/home")}>
                            <Image 
                                className="h-4 w-6"
                                source={images.backArrow}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* header */}
                    <View className="items-center">
                        <Text className="text-white font-psemibold text-base pb-4">Workout Tracker</Text>


                        {/* add a workout name */}
                        <TextInput 
                            style={{
                                height: 40,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 1,
                                color: 'white',
                                paddingHorizontal: 10
                            }}
                            className="font-pregular"
                            placeholder="Add Workout Name"
                            placeholderTextColor="gray"
                            onChangeText={e => setWorkoutDetails([e, ...workoutDetails.slice(1)])}
                        />

                        {/* add a description text */}
                        <TextInput 
                            style={{
                                height: 40,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 1,
                                color: 'white',
                                paddingHorizontal: 10
                            }}
                            className="font-pregular"
                            placeholder="Add Workout Notes"
                            placeholderTextColor="gray"
                            onChangeText={e => setWorkoutDetails([workoutDetails[0], e, ...workoutDetails.slice(2)])}
                        />

                        <View className="pb-6"></View>

                        {/* add execise button */}
                        <TouchableOpacity
                            onPress={() => router.push({pathname: "/exercises/exercise-list", params: { addWorkout: true }})}
                            className="bg-secondary px-6 py-2 rounded-3xl"
                        >
                            <Text className="font-psemibold text-base">Add Exercise</Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            )}
        </SafeAreaView>
    )
}