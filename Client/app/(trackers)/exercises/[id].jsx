import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { IP_ADDRESS } from '@env';
import { useState, useEffect } from 'react'

export default function ExercisePage() {
    const { id } = useLocalSearchParams()
    const [exerciseData, setExerciseData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(IP_ADDRESS + 'get_exercise/?id='+id)
                const data = await response.json()
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
            <ScrollView className="h-full">
                <Text className="text-white">{exerciseData.name}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}