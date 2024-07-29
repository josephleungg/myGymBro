import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Button, Alert, Image } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import FormField from '../../../components/formfield.jsx'
import { IP_ADDRESS } from '@env';
import { router } from 'expo-router'
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import icons from '../../../helper/icons.js'
import images from "../../../helper/images.js"
import { useState } from 'react'

export default function CreateMeal() {
  const [properties, setProperties] = useState({isVisible: false})
  const {mealsRefresh, setMealsRefresh} = useGlobalContext();

  const createSubmit = async () => {
    try{
        const res = await fetch(IP_ADDRESS + 'create_meal',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(properties)
            }
        )

        if(res.status !== 200){
            const errorMessage = await res.json()
            throw new Error(errorMessage.message);
        }
        setMealsRefresh(!mealsRefresh)
        router.back()
    }catch(e){
        Alert.alert('Error ',e.message)
    }
  }

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView className="h-full p-6">
        <View>
            <TouchableOpacity onPress={() => router.back()}>
                <Image 
                    className="h-4 w-6"
                    source={images.backArrow}
                />
            </TouchableOpacity>
        </View>

        <View className="items-center">
            <Text className="text-white text-lg font-pregular">Create a meal</Text>
        </View>

        <FormField 
        title="Meal Name"
        placeholder={"Enter meal name"}
        value={properties.name}
        handleChangeText={(e) => setProperties({...properties, name: e})}
        otherStyles="mt-7"
        />

        <FormField
        title="Description"
        placeholder={"Enter meal description"}
        value={properties.description}
        handleChangeText={(e) => setProperties({...properties, description: e})}
        otherStyles="mt-7"
        />

        <FormField
        title="Calories"
        placeholder={"Enter calories"}
        value={properties.calories}
        handleChangeText={(e) => setProperties({...properties, calories: e})}
        otherStyles="mt-7"
        keyboardType="numeric"
        />

        <FormField
        title="Protein (g)"
        placeholder={"Enter protein"}
        value={properties.protein}
        handleChangeText={(e) => setProperties({...properties, protein: e})}
        otherStyles="mt-7"
        keyboardType="numeric"
        />

        <FormField
        title="Carbs (g)"
        placeholder={"Enter carbs"}
        value={properties.carbs}
        handleChangeText={(e) => setProperties({...properties, carbs: e})}
        otherStyles="mt-7"
        keyboardType="numeric"
        />

        <FormField
        title="Fats (g)"
        placeholder={"Enter fats"}
        value={properties.fats}
        handleChangeText={(e) => setProperties({...properties, fats: e})}
        otherStyles="mt-7"
        keyboardType="numeric"
        />

        <Text className="text-base text-gray-100 font-pmedium text-sm mt-10">Public Visibility</Text>

        <Picker
            selectedValue={properties.isVisible}
            onValueChange={(itemValue, itemIndex) =>
                setProperties({...properties, isVisible: itemValue})
            }
            itemStyle={{ color: 'white', fontSize: 20 }}
            >
            <Picker.Item label="Private" value={false} />
            <Picker.Item label="Public" value={true} />
        </Picker>

        <View className="pb-20">
            <TouchableOpacity className="bg-green-400 py-4 rounded-3xl items-center" onPress={createSubmit}>
                <Text className="text-black font-pmedium">Create Meal</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}