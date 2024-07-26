import { View, Text, SafeAreaView, ScrollView, Image, Alert, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { IP_ADDRESS } from '@env';
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import icons from "../../../helper/icons.js"
import images from "../../../helper/images.js"
import { useState, useEffect } from 'react'

export default function ExercisePage() {
    const { id, addWorkout } = useLocalSearchParams()
    const [exerciseData, setExerciseData] = useState({})
    const [userExerciseStats, setUserExerciseStats] = useState({"pastSetWeight": [], "pastSetReps": [], "pastDates": []})

    // loading states
    const [isLoading, setIsLoading] = useState(true)
    const [isCreator, setIsCreator] = useState(false)
    const { user, exerciseRefresh, setExerciseRefresh } = useGlobalContext();

    // function to delete exercise
    async function deleteExercise() {
        try{
            const res = await fetch(IP_ADDRESS + 'delete_exercise',
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({_id: id})
                }
            )

            if(res.status === 200){
                setExerciseRefresh(!exerciseRefresh)
                router.back()
            }
        }catch(e){
            console.log(e)
            Alert.alert("Error", "Failed to delete exercise")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(IP_ADDRESS + 'get_exercise/?id='+id)
                const data = await response.json()

                // limiting characters to 256
                if(data.description.length > 256){
                    data.shortDescription = data.description.slice(0, 256) + "..."
                }else{
                    data.shortDescription = ""
                }

                // formatting other muscle groups to string
                let otherMuscleGroups = ""

                if(data.otherMuscles.length > 0){
                    for(let i = 0;i<data.otherMuscles.length;i++){
                        if(i === data.otherMuscles.length - 1){
                            otherMuscleGroups += data.otherMuscles[i]
                        }else{
                            otherMuscleGroups += data.otherMuscles[i] + ", "
                        }
                    }
                }
                
                data.otherMuscleGroups = otherMuscleGroups

                // check if user is creator
                if(data.creator === user){
                    setIsCreator(true)
                }

                // grab user exercise data for previous exercise set data
                const res = await fetch(IP_ADDRESS + 'get_userexercise_info/?id='+id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                // checking if the user has done this exercise before
                if(res.status === 204){
                    console.log("User has not done this exercise yet")
                }else if(res.status === 200){
                    const userExerciseData = await res.json()

                    if(userExerciseData.pastSetWeight.length > 4){
                        setUserExerciseStats({"pastSetWeight": userExerciseData.pastSetWeight.slice(0, 4), "pastSetReps": userExerciseData.pastSetReps.slice(0, 4), "pastDates": userExerciseData.pastDates.slice(0, 4)})
                    }
                }

                console.log(data)
                setExerciseData(data)
                setIsLoading(false)
            }catch(e){
                console.log(e)
                Alert.alert("Error", "Failed to fetch data")
            }
        }

        fetchData()
    }, [])

    return (
        isLoading ? (
        <SafeAreaView className="bg-primary w-full h-full">
            <View className="justify-center items-center h-full">
                <Text className="text-gray-100 font-psemibold text-lg">Loading...</Text>
            </View>
        </SafeAreaView>
        ) : (
        <SafeAreaView className="bg-primary">
            <ScrollView className="h-full py-4 px-6">
                <View>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image 
                            className="h-4 w-6"
                            source={images.backArrow}
                        />
                    </TouchableOpacity>
                </View>
                {/* header */}
                <View className="items-center">
                    <Text className="text-white font-psemibold text-lg">{exerciseData.name}</Text>
                    <Text className="text-gray-100 font-pregular">{exerciseData.creatorName}</Text>
                </View>
            
                {/* description section */}
                <View className="pt-4">
                    <Text className="text-gray-100 font-pregular">
                        {exerciseData.shortDescription === "" ? exerciseData.description : 
                        exerciseData.shortDescription
                        }
                    </Text>
                </View>

                {/* muscle groups section */}
                <View className="pt-8">
                    <View className="flex-row">
                        <Image
                            className="h-12 w-12 rounded-full bg-white"
                            source={icons[exerciseData.equipment]}
                        />

                        <View className="ml-2 justify-center">
                            <Text className="font-psemibold text-white text-md">{exerciseData.primaryMuscle}</Text>
                            <Text className="font-pregular text-gray-100 text-sm">{exerciseData.otherMuscleGroups}</Text>
                        </View>
                    </View>
                </View>

                {/* chart section */}
                <View className="pt-8 items-center">
                    <Text className="text-white font-pregular">Chart Coming Soon...</Text>
                </View>

                {/* previous workout data */}
                <View className="pt-8">
                    <Text className="font-psemibold text-white">Previous Workout Sets</Text>

                    {/* Checker for if the  */}
                    {userExerciseStats.pastSetWeight.length === 0 ? (
                        <View className="pt-4 w-full items-center">
                            <Text className="text-white font-pregular">You haven't done this exercise before :c</Text>
                        </View>
                    ) : (
                        userExerciseStats.pastSetWeight.map((weight, i) => {
                            <View className="pt-4 flex-row justify-end">
                                <Text className="text-white font-pregular">{userExerciseStats.pastSetReps[i]} @ {userExerciseStats.pastSetWeight[i]} LBS</Text>
                                <Text className="text-gray-100 font-pregular">{userExerciseStats.pastDates[i]}</Text>
                            </View>
                        })
                    )
                    }
                </View>
                
                <View className="pt-8"></View>

                {/* add workout button for users currently creating a workout */}
                {addWorkout && (
                    <View className="pb-4 items-center w-full">
                        <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-3xl" onPress={() => router.navigate({pathname: "/workouts/workout-tracker", params: { exerciseID: exerciseData._id, name: exerciseData.name, equipment: exerciseData.equipment }})}>
                            <Text className="text-black font-pmedium">Add Exercise</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* delete button if it is the creator */}
                {(isCreator && !addWorkout) && (
                    <View className="items-center w-full">
                        <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-3xl" onPress={() => deleteExercise()}>
                            <Text className="text-black font-pmedium">Delete Exercise</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
        )
    )
}