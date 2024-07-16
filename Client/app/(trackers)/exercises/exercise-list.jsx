import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Touchable } from 'react-native'
import { useState, useEffect } from 'react';
import { IP_ADDRESS } from '@env';


export default function ExerciseList() {
  const [errorMessage, setErrorMessage] = useState('');
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    // Fetch data from the API
    const fetchedData = async () => {
      try {
        const res = await fetch(IP_ADDRESS + 'exercises_list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json()
        
        setExercises(Object.values(data))
        console.log(exercises)
        setIsLoading(false)
      }catch(e){
        console.log('Error:', e);
        setErrorMessage('Error fetching data');
      }
    }

    fetchedData();
  }, [])

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full">

      {/* search section */}
      <View className="mt-4 items-center">
        <Text className="text-white text-lg font-pregular">Exercise List</Text>
      </View>

      {/* main section showing all exercises */}
      <View className="px-6">
        {isLoading ? (<Text className="text-white">Loading List</Text>) : errorMessage ? 
        (<Text className="text-white">{errorMessage}</Text>) : 
        (exercises.map((exercise, index) => (
            <TouchableOpacity key={index} className="my-2">
              <Text key={index} className="text-white">{exercise.name}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
      
      </ScrollView>
    </SafeAreaView>
  )
}