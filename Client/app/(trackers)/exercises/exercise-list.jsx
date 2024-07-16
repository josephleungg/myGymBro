import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { useState, useEffect } from 'react';
import { IP_ADDRESS } from '@env';


export default function ExerciseList() {
  const [errorMessage, setErrorMessage] = useState('');
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);

  // fetching exercises data on load
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
        console.log(Object.values(data))
        setIsLoading(false)
      }catch(e){
        console.log('Error:', e);
        setErrorMessage('Error fetching data');
      }
    }
    fetchedData();
  }, [])

  useEffect(() => {
    // Filter exercises whenever the search query changes
    const filtered = exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [searchQuery, exercises]);

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full">

      {/* search section */}
      <View className="mt-4 px-6 items-center">
        <Text className="mb-4 text-white text-lg font-pregular">Exercise List</Text>

        {/* search bar */}
        <TextInput
          className="w-full h-12 px-4 bg-black-100 rounded-2xl text-white font-psemibold"
          placeholder="Search exercises..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* filter buttons */}
      <View className="flex-row w-full space-x-4 justify-between">
        
        {/* <TouchableOpacity className="flex-1 bg-[#2e2e48] py-5 ml-4 rounded-3xl items-center" onPress={() => console.log("works")}>
          <Text className="text-white text-md font-psemibold">Equipment</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 bg-[#2e2e48] py-5 mr-4 rounded-3xl items-center" onPress={() => console.log("works 2")}>
          <Text className="text-white text-md font-psemibold">Meals List</Text>
        </TouchableOpacity> */}
      </View>

      {/* main section showing all exercises */}
      <View className="px-6">
        {isLoading ? (<Text className="text-white">Loading List</Text>) : errorMessage ? 
        (<Text className="text-white">{errorMessage}</Text>) : 
        (filteredExercises.map((exercise, index) => (
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