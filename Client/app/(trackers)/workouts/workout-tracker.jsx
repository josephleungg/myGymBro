import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import React, { useState, useEffect } from 'react';
import { IP_ADDRESS } from '@env';
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import CustomButton from "../../../components/custombutton.jsx"
import icons from "../../../helper/icons.js"
import images from "../../../helper/images.js"

export default function WorkoutTracker() {
    const { properties, 
            setProperties, 
            workoutStarted, 
            setWorkoutStarted, 
            savedWorkoutDetails, 
            setSavedWorkoutDetails, 
            timerStarted, 
            setTimerStarted, 
            startTime, 
            setStartTime, 
            elapsedTime, 
            setElapsedTime, 
            startTimer, 
            stopTimer, 
            resetTimer} = useGlobalContext();
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

    // keep workout details persisted whenever user leaves the page because the page remounts components when user navigates back
    // **don't have to do this if i just remove workoutDetails but too lazy to remove it
    useEffect(() => {
        setSavedWorkoutDetails(workoutDetails)
    }, [workoutDetails])

    // clear the current workout after coming back from a saved workout
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

    // function for deleting workout session
    function alertDeleteWorkout(){
        Alert.alert(
            "Delete Workout",
            "Are you sure you want to delete this workout?",
            [
                { text: "Cancel", onPress: () => null, style: "cancel" },
                { text: "Confirm", onPress: () => deleteWorkout(), style: "destructive" }
            ]
        )
    }

    function deleteWorkout(){
        setSavedWorkoutDetails(["", "", 0, new Date()])
        setWorkoutStarted(false)
        resetTimer()
        router.navigate("/home")
    }

    // function for finishing workout
    function alertFinishWorkout(){
        Alert.alert(
            "Finish Workout",
            "Are you sure you want to finish this workout?",
            [
                { text: "Cancel", onPress: () => null, style: "cancel" },
                { text: "Confirm", onPress: () => {stopTimer(); finishWorkout()}, style: "destructive" }
            ])
    }

    async function finishWorkout(){
        try{
            const res = await fetch(IP_ADDRESS + 'finish_workout', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({workout: workoutDetails, duration: Math.floor(elapsedTime / 1000)})
            })

            const data = await res.json()

            setProperties({...properties, daysAtGym: [...properties.daysAtGym, workoutDetails]})
            setSavedWorkoutDetails(["", "", 0, new Date()])
            resetTimer()
            router.navigate("/home")
            setWorkoutStarted(false)

            console.log(data.message)
        }catch(e){
            Alert.alert("Error", "There was an error saving the workout")
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
                <ScrollView className="h-full pb-4 px-6">
                    {/* back button */}
                    <View className="flex-row">
                        <TouchableOpacity onPress={() => router.navigate("/home")} className="flex-1 pr-4 py-4">
                            <Image 
                                className="h-4 w-6"
                                source={images.backArrow}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => alertFinishWorkout()} className="pl-4 py-4">
                            <Text className="text-blue-500 font-pbold">Finish</Text>
                        </TouchableOpacity>

                        {/* debug button */}
                        {/* <TouchableOpacity onPress={() => console.log(workoutDetails)}>
                            <Text className="text-white">Show Button</Text>
                        </TouchableOpacity> */}
                    </View>

                    {/* header */}
                    <View className="items-center mb-8">
                        <Text className="text-white font-psemibold text-lg pb-4">Workout Tracker</Text>

                        {/* add a workout name */}
                        <View className="pb-4">
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
                                value={workoutDetails[0]}
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
                                value={workoutDetails[1]}
                                onChangeText={e => setWorkoutDetails([workoutDetails[0], e, ...workoutDetails.slice(2)])}
                            />
                        </View>

                        {/* Timer section */}
                        <View className="flex-row space-x-6">
                            <View className="flex-1">
                                <Text className="text-white font-pregular text-base">Duration: {Math.floor(elapsedTime / 1000)}</Text>
                            </View>
                            
                            <TouchableOpacity onPress={startTimer}>
                                <Image
                                    className="h-4 w-4"
                                    source={icons.play}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={stopTimer}>
                                <Image
                                    className="h-4 w-4"
                                    source={icons.pause}
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="pb-6"></View>

                        {/* top buttons */}
                        <View className="flex-row justify-between space-x-6">
                            {/* add exercise button */}
                            <TouchableOpacity
                                onPress={() => router.push({pathname: "/exercises/exercise-list", params: { addWorkout: true }})}
                                className="bg-secondary py-3 rounded-3xl flex-1 items-center"
                            >
                                <Text className="font-psemibold text-base">Add Exercise</Text>
                            </TouchableOpacity>

                            {/* delete workout button */}
                            <TouchableOpacity
                                onPress={() => alertDeleteWorkout()}
                                className="bg-red-500 py-3 rounded-3xl flex-1 items-center"
                            >
                                <Text className="font-psemibold text-base">Delete Workout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* exercise details */}
                    <View className="h-full mb-10">
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

                                            {/* delete button, last set deleted will delete whole exercise from the list */}
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
                                        onPress={() => setWorkoutDetails([...workoutDetails.slice(0, index+4), {...exercise, sets: [...exercise.sets, 0], weight: [...exercise.weight, 0], date: [...exercise.date, new Date()]}, ...workoutDetails.slice(index+5)])}
                                        className="bg-secondary px-12 py-2 rounded-3xl"
                                    >
                                        <Text className="font-psemibold text-base">Add Set</Text>
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    )
}