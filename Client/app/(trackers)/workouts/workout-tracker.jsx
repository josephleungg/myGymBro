import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, Touchable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import React, { useState, useEffect } from 'react';
import { IP_ADDRESS } from '@env';
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import CustomButton from "../../../components/custombutton.jsx"
import icons from "../../../helper/icons.js"
import images from "../../../helper/images.js"

export default function WorkoutTracker() {
    const { user, properties, setProperties, workoutStarted, setWorkoutStarted, savedWorkoutDetails, setSavedWorkoutDetails } = useGlobalContext();
    const { exerciseID, name, equipment } = useLocalSearchParams();
    // workoutName: String
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

    // keep workout details persisted whenever user leaves the page
    useEffect(() => {
        setSavedWorkoutDetails(workoutDetails)
    }, [workoutDetails])

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
        
        setWorkoutDetails(savedWorkoutDetails)

        if(exerciseID){
            setWorkoutDetails([... workoutDetails, {"id": exerciseID, "name": name, "equipment": equipment, "sets": [0], "weight": [0], "date": [new Date()]}])
        }
        // NEED TO APPEND THIS TO THE WORKOUT DETAILS ARRAY AS A NEW EXERCISE AND THEN FIGURE OUT A WAY TO INDEX THEM INDIVIDUALLY
 
    }, [workoutStarted, exerciseID])

    // functions for mapping exercises
    // function for deleting a set
    function deleteSet(exerciseIndex, setIndex){
        if(workoutDetails[exerciseIndex].sets.length === 1){
            setWorkoutDetails([...workoutDetails.slice(0, exerciseIndex), ...workoutDetails.slice(exerciseIndex+1)])
        }else{
            setWorkoutDetails([...workoutDetails.slice(0, exerciseIndex), {...workoutDetails[exerciseIndex], sets: workoutDetails[exerciseIndex].sets.filter((set, index) => index !== setIndex), weight: workoutDetails[exerciseIndex].weight.filter((weight, index) => index !== setIndex), date: workoutDetails[exerciseIndex].date.filter((date, index) => index !== setIndex)}, ...workoutDetails.slice(exerciseIndex+1)])
        }
    }

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
                        <TouchableOpacity onPress={() => console.log(workoutDetails)}>
                            <Text className="text-white">Show Button</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.navigate("/home")}>
                            <Image 
                                className="h-4 w-6"
                                source={images.backArrow}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* header */}
                    <View className="items-center mb-8">
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

                    {/* exercise details */}
                    <View className="h-full">
                        {workoutDetails.slice(4).map((exercise, index) => (
                            <React.Fragment key={`exercise-${index}`}>
                                {/* equipment and exercise name */}
                                <View className="flex-row items-center mb-4">
                                    <Image 
                                        className="h-12 w-12 rounded-full bg-white"
                                        source={icons[exercise.equipment]}
                                    />
                                    <Text className="text-white font-psemibold ml-4">{exercise.name}</Text>
                                </View>

                                <View className="items-center">
                                    {/* Looping through the sets and displaying to the user */}
                                    {exercise.sets.map((set, i) => (
                                        <View key={`set-${index}-${i}`} className="flex-row w-full space-x-10 mb-6">
                                            {/* sets */}
                                            <View className="flex-col items-center flex-1">
                                                <Text className="text-white font-psemibold text-base mb-2">Set</Text>
                                                <Text className="text-white font-regular text-base">{i+1}</Text>
                                            </View>

                                            {/* weight */}
                                            <View className="flex-col items-center flex-1">
                                                <Text className="text-white font-psemibold text-base mb-2">LBS</Text>
                                                <TextInput 
                                                    style={{
                                                        borderBottomColor: 'gray',
                                                        borderBottomWidth: 1,
                                                        color: 'white',
                                                        width: 30,
                                                    }}
                                                    keyboardType="numeric"
                                                    className="font-pregular"
                                                    placeholder="0"
                                                    placeholderTextColor="gray"
                                                    onChangeText={e => {const numericValue = parseInt(e, 10); setWorkoutDetails([...workoutDetails.slice(0, index+4), {...exercise, weight: [...exercise.weight.slice(0, i), numericValue, ...exercise.weight.slice(i+1)]}, ...workoutDetails.slice(index+5)])}}
                                                />
                                            </View>

                                            {/* reps */}
                                            <View className="flex-col items-center flex-1">
                                                <Text className="text-white font-psemibold text-base mb-2">Reps</Text>
                                                <TextInput 
                                                    style={{
                                                        borderBottomColor: 'gray',
                                                        borderBottomWidth: 1,
                                                        color: 'white',
                                                        width: 30,
                                                    }}
                                                    keyboardType="numeric"
                                                    className="font-pregular"
                                                    placeholder="0"
                                                    placeholderTextColor="gray"
                                                    onChangeText={e => {const numericValue = parseInt(e, 10); setWorkoutDetails([...workoutDetails.slice(0, index+4), {...exercise, sets: [...exercise.sets.slice(0, i), numericValue, ...exercise.sets.slice(i+1)]}, ...workoutDetails.slice(index+5)])}}
                                                />
                                            </View>

                                            {/* delete button */}
                                            <View className="justify-center">
                                                <TouchableOpacity
                                                    className="bg-red-500 px-2 py-3 rounded-3xl"
                                                    onPress={() => deleteSet(index+4, i)}
                                                >
                                                    <Text className="text-black font-psemibold">Delete</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                {/* add set button */}
                                <View className="items-center pb-4">
                                    <TouchableOpacity
                                        onPress={() => setWorkoutDetails([...workoutDetails.slice(0, index+4), {...exercise, sets: [...exercise.sets, 0], weight: [...exercise.weight, 0], date: [...exercise.date, new Date()]}])}
                                        className="bg-secondary px-12 py-2 rounded-3xl"
                                    >
                                        <Text className="font-psemibold text-base">Add Set</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                
                <View className="mb-10"></View>
                </ScrollView>
            )}
        </SafeAreaView>
    )
}