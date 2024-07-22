import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { IP_ADDRESS } from '@env';
import icons from "../../../helper/icons.js"
import { useState, useEffect } from 'react'

export default function ExercisePage() {
    const { id } = useLocalSearchParams()
    const [exerciseData, setExerciseData] = useState({})

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

                console.log(data)
                setExerciseData(data)
            }catch(e){
                console.log(e)
            }
        }

        fetchData()
    }, [])

    return (
        <SafeAreaView className="bg-primary">
            <ScrollView className="h-full py-4 px-6">

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
                <View className="">
                        
                </View>

                {/* previous workout data */}
                

            </ScrollView>
        </SafeAreaView>
    )
}