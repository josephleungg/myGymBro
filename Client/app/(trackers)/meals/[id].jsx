import { View, Text, Alert, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { IP_ADDRESS } from '@env';
import { useGlobalContext } from '../../../context/GlobalProvider.js';
import icons from "../../../helper/icons.js"
import images from "../../../helper/images.js"
import {useState, useEffect} from 'react'

export default function MealPage() {
    const { id } = useLocalSearchParams()
    const [mealData, setMealData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(IP_ADDRESS + 'get_meal/?id='+id)
                const data = await response.json()

                // limiting characters to 256
                if(data.description.length > 256){
                    data.shortDescription = data.description.slice(0, 256) + "..."
                }else{
                    data.shortDescription = ""
                }

                setMealData(data)
            }catch(e){
                console.log(e)
                Alert.alert("Error", "Failed to fetch meal")
            }
        }

        fetchData();
    })

    return (
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
                    <Text className="text-secondary font-psemibold text-lg">{mealData.name}</Text>
                    <Text className="text-gray-100 font-pregular">{mealData.creatorName}</Text>
                </View>
            
                {/* description section */}
                <View className="pt-4">
                    <Text className="text-gray-100 font-pregular">
                        {mealData.shortDescription === "" ? mealData.description : 
                        mealData.shortDescription
                        }
                    </Text>
                </View>

                
            </ScrollView>
        </SafeAreaView>
    )
}