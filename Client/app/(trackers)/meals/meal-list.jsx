import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { router } from 'expo-router'
import { useState, useEffect } from 'react';
import { IP_ADDRESS } from '@env';
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import icons from "../../../helper/icons.js"

export default function MealList() {
  const [errorMessage, setErrorMessage] = useState('');
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMeals, setFilteredMeals] = useState([]);
  const {mealRefresh, setMealRefresh} = useGlobalContext();

  // fetching meals data on load
  useEffect(() => {
    // Fetch data from the API
    const fetchedData = async () => {
      try {
        const res = await fetch(IP_ADDRESS + 'meals_list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json()
        setMeals(Object.values(data))
        setIsLoading(false)
      }catch(e){
        console.log('Error:', e);
        setErrorMessage('Error fetching data');
      }
    }
    fetchedData();
  }, [mealRefresh])

  // Filter meals whenever the search query changes
  useEffect(() => {
    // Filter meals whenever the search query changes
    const filtered = meals.filter(meal =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMeals(filtered);
  }, [searchQuery, meals]);

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full">

      {/* header with plus button */}
      <View className="mt-4 px-6 items-center">
      <View className="flex-row justify-between items-center w-full mb-4">
        {/* left spacer */}
        <View className="flex-1" /> 

        <Text className="text-white text-lg font-pregular flex-1">Meal List</Text>

        <TouchableOpacity className="flex-1 items-end" onPress={() => router.push('/meals/create-meal')}>
          <Text className="text-white text-xl">+</Text>
        </TouchableOpacity>
      </View>
        
        {/* search bar */}
        <TextInput
          className="w-full h-12 px-4 mb-4 bg-black-100 rounded-2xl text-white font-psemibold"
          placeholder="Search meals..."
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

      {/* main section showing all meals */}
      <View className="px-6">
        {isLoading ? (<Text className="text-white">Loading List</Text>) : errorMessage ? 
        (<Text className="text-white">{errorMessage}</Text>) : 
        (filteredMeals.map((meal, index) => (
            <TouchableOpacity key={index} className="my-2 flex-1 flex-row" onPress={() => router.push({pathname: "/meals/[id]", params: { id: meal._id}})}>
              <Image
                className="h-12 w-12 rounded-full self-center bg-white"
                source={icons[meal.equipment]}
              />
              <View className="h-full ml-4 justify-center">
                <Text className="text-white text-lg">{meal.name}</Text>
                <Text className="text-[#999]">{meal.primaryMuscle}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}