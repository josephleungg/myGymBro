import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, Touchable } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useState, useEffect } from 'react';
import { IP_ADDRESS } from '@env';
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import icons from "../../../helper/icons.js"
import images from "../../../helper/images.js"

export default function ExerciseList() {
  const { addWorkout } = useLocalSearchParams();
  const [errorMessage, setErrorMessage] = useState('');
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState([]);
  const {exerciseRefresh, setExerciseRefresh} = useGlobalContext();

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
        setIsLoading(false)
      }catch(e){
        console.log('Error:', e);
        setErrorMessage('Error fetching data');
      }
    }
    fetchedData();
  }, [exerciseRefresh])

  // Filter exercises whenever the search query changes
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

      {/* header with plus button */}
      <View className="mt-4 px-6 items-center">
        <View className="flex-row justify-between items-center w-full mb-4">
          {/* left spacer */}
          <View className="flex-1">
            <TouchableOpacity onPress={() => router.back()}>
              <Image 
                className="h-4 w-6"
                source={images.backArrow}
              />
            </TouchableOpacity>
          </View> 

          <View className="items-center flex-1">
            <Text className="text-white text-lg font-pregular">Exercise List</Text>
          </View>
          
          <TouchableOpacity className="flex-1 items-end" onPress={() => router.push('/exercises/create-exercise')}>
            <Text className="text-white text-xl">+</Text>
          </TouchableOpacity>
        </View>
          
          {/* search bar */}
          <TextInput
            className="w-full h-12 px-4 mb-4 bg-black-100 rounded-2xl text-white font-psemibold"
            placeholder="Search exercises..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          {/* Filter buttons
          <View className="mb-4 w-full flex-row space-x-6">
            <TouchableOpacity className="bg-secondary py-5 rounded-3xl items-center flex-1" onPress={() => console.log("works")}>
              <Text className="text-black text-md font-psemibold">Equipment</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-secondary py-5 rounded-3xl items-center flex-1" onPress={() => console.log("works")}>
              <Text className="text-black text-md font-psemibold">Muscles</Text>
            </TouchableOpacity>
          </View> */}
      </View>

      {/* main section showing all exercises */}
      <View className="px-6">
        {isLoading ? (<Text className="text-white">Loading List</Text>) : errorMessage ? 
        (<Text className="text-white">{errorMessage}</Text>) : 
        (filteredExercises.map((exercise, index) => (
            <TouchableOpacity key={index} className="my-2 flex-1 flex-row" onPress={() => router.push({pathname: "/exercises/[id]", params: { id: exercise._id, addWorkout: addWorkout }})}>
              <Image
                className="h-12 w-12 rounded-full self-center bg-white"
                source={icons[exercise.equipment]}
              />
              <View className="h-full ml-4 justify-center">
                <Text className="text-white text-lg">{exercise.name}</Text>
                <Text className="text-[#999]">{exercise.primaryMuscle}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}